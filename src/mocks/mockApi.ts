import { http } from "msw";
import { mockDogApi } from "./mock"; // Ensure this path is correct

const mockDogApiData = [...mockDogApi];

const mockLocationData: Location[] = [
  {
    zip_code: "06519",
    latitude: 41.31,
    longitude: -72.93,
    city: "New Haven",
    state: "CT",
    county: "New Haven",
  },
  {
    zip_code: "34483",
    latitude: 29.19,
    longitude: -82.14,
    city: "Ocala",
    state: "FL",
    county: "Marion",
  },
  {
    zip_code: "90210",
    latitude: 34.1,
    longitude: -118.41,
    city: "Beverly Hills",
    state: "CA",
    county: "Los Angeles",
  },
  {
    zip_code: "10001",
    latitude: 40.75,
    longitude: -73.99,
    city: "New York",
    state: "NY",
    county: "New York",
  },
];

export const handlers = [
  // POST /auth/login
  http.post("/auth/login", async ({ request }) => {
    console.log("Received /auth/login request"); // Debug
    let body;
    try {
      body = await request.json(); // Parse the JSON body
      console.log("Request body:", body); // Debug
    } catch (error) {
      console.error("Failed to parse body:", error);
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email } = body as { name?: string; email?: string };
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ message: "Logged in successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "fetch-access-token=abc123; HttpOnly; Max-Age=3600",
      },
    });
  }),

  // POST /auth/logout
  http.post("/auth/logout", () => {
    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "fetch-access-token=; HttpOnly; Max-Age=0",
        },
      },
    );
  }),

  // GET /dogs/breeds
  http.get("/dogs/breeds", () => {
    const breeds = [...new Set(mockDogApiData.map((dog) => dog.breed))];
    return new Response(JSON.stringify(breeds), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // GET /dogs/search
  http.get("/dogs/search", ({ request }) => {
    const url = new URL(request.url);
    const breeds = url.searchParams.getAll("breeds[]");
    const zipCodes = url.searchParams.getAll("zipCodes[]");
    const ageMin = Number(url.searchParams.get("ageMin") || 0);
    const ageMax = Number(url.searchParams.get("ageMax") || Infinity);
    const size = Number(url.searchParams.get("size") || 25);
    const from = Number(url.searchParams.get("from") || 0);
    const sort = url.searchParams.get("sort") || "name:asc";

    let results = [...mockDogApiData];
    if (breeds.length)
      results = results.filter((dog) => breeds.includes(dog.breed));
    if (zipCodes.length)
      results = results.filter((dog) => zipCodes.includes(dog.zip_code));
    results = results.filter((dog) => dog.age >= ageMin && dog.age <= ageMax);

    const [sortField, sortDir] = sort.split(":") as [
      keyof (typeof mockDogApiData)[0],
      "asc" | "desc",
    ];
    results.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortDir === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
    });

    const total = Math.min(results.length, 10000);
    const paginated = results.slice(from, from + size);
    const next =
      from + size < total
        ? `/dogs/search?size=${size}&from=${from + size}`
        : null;
    const prev =
      from > 0
        ? `/dogs/search?size=${size}&from=${Math.max(0, from - size)}`
        : null;

    return new Response(
      JSON.stringify({
        resultIds: paginated.map((dog) => dog.id),
        total,
        next,
        prev,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }),

  // POST /dogs
  http.post("/dogs", async ({ request }) => {
    const ids = (await request.json()) as string[];
    if (!Array.isArray(ids) || ids.length > 100) {
      return new Response(
        JSON.stringify({ error: "Body must be an array of up to 100 dog IDs" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    const dogs = mockDogApiData.filter((dog) => ids.includes(dog.id));
    return new Response(JSON.stringify(dogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // POST /dogs/match
  http.post("/dogs/match", async ({ request }) => {
    const ids = (await request.json()) as string[];
    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(
        JSON.stringify({ error: "Body must be a non-empty array of dog IDs" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    const match = ids[Math.floor(Math.random() * ids.length)];
    return new Response(JSON.stringify({ match }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // POST /locations
  http.post("/locations", async ({ request }) => {
    const zipCodes = (await request.json()) as string[];
    if (!Array.isArray(zipCodes) || zipCodes.length > 100) {
      return new Response(
        JSON.stringify({
          error: "Body must be an array of up to 100 ZIP codes",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    const locations = mockLocationData.filter((loc) =>
      zipCodes.includes(loc.zip_code),
    );
    return new Response(JSON.stringify(locations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // POST /locations/search
  http.post("/locations/search", async ({ request }) => {
    const {
      city,
      states,
      geoBoundingBox,
      size = 25,
      from = 0,
    } = (await request.json()) as {
      city?: string;
      states?: string[];
      geoBoundingBox?: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
        bottom_left?: { lat: number; lon: number };
        top_right?: { lat: number; lon: number };
      };
      size?: number;
      from?: number;
    };

    let results = [...mockLocationData];
    if (city) {
      const cityLower = city.toLowerCase();
      results = results.filter((loc) =>
        loc.city.toLowerCase().includes(cityLower),
      );
    }
    if (states?.length)
      results = results.filter((loc) => states.includes(loc.state));

    if (geoBoundingBox) {
      let top: number, left: number, bottom: number, right: number;
      if (
        geoBoundingBox.top &&
        geoBoundingBox.left &&
        geoBoundingBox.bottom &&
        geoBoundingBox.right
      ) {
        top = geoBoundingBox.top;
        left = geoBoundingBox.left;
        bottom = geoBoundingBox.bottom;
        right = geoBoundingBox.right;
      } else if (geoBoundingBox.bottom_left && geoBoundingBox.top_right) {
        bottom = geoBoundingBox.bottom_left.lat;
        left = geoBoundingBox.bottom_left.lon;
        top = geoBoundingBox.top_right.lat;
        right = geoBoundingBox.top_right.lon;
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid geoBoundingBox format" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
      results = results.filter(
        (loc) =>
          loc.latitude <= top &&
          loc.latitude >= bottom &&
          loc.longitude >= left &&
          loc.longitude <= right,
      );
    }

    const total = Math.min(results.length, 10000);
    const paginated = results.slice(from, from + size);

    return new Response(JSON.stringify({ results: paginated, total }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];

// Interfaces
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}
