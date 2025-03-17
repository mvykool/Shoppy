//we create a fetch api function with many fuctions within
import {
  Dog,
  LocationSearchParams,
  LocationSearchResults,
  Match,
  SearchParams,
  SearchResults,
} from "../types";

//we set the URL which in
const API_URL = "http://localhost:5173/";
//let's set the defailt headers as well
const defaultHeaders = {
  "Content-type": "application/json",
};

//we create an async function, and we use a generic, that way we create a flexible function that will take the passed type, and also we return a promise with such type
//this will be the base function so we can use with other functions for every case
async function fetchApiWithAuth<T>(
  //we pass the parameters necessary to fetch, and work with in this service, endpoint, and options
  endpoint: string,
  //we also set options to type RequestInit, requestinit is an object that contain things like body, methods, headers, and more things
  //the reason we set this as parameters is to allow to modify things like body, headers when this function is invoked
  options: RequestInit = {},
): Promise<T> {
  //let's combine the base URL with the given endpoint
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    // we copy everything from options
    ...options,
    // we only modify the haeders as we need to pass the default headers
    headers: {
      ...defaultHeaders,
      //in case we pass different headers via parameters when function is invoked, this will override the defaultHeaders
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  //now let's go and create some cases with IF statements
  if (!response.ok) {
    //let's wait for the error message and store it in a variable, so we can use it to display it
    const errorText = await response.text();
    //throw a new error and display it in console
    throw new Error(`request failed ${errorText}`);
  }

  //now if our request returns no content AKA status 204, let's just return an empty object
  if (response.status === 204) {
    //we return an empty object, this function expects a result type T, that's why we have to cast it, in order to avoid errors
    return {} as T;
  }

  //now let's actually return the data if it's successful with a trycatch
  try {
    //we wait for the return to be successfil and return it as JSON
    return await response.json();
  } catch (error) {
    //we will also return the error since we have to return something, even if it fails, and of course we cast T, since the promise has that type
    return { error } as T;
  }
}

//now we have to create the functions with every single type of request we need
//we need to fetch dogs, location, and handle auth
//
//
//first let's handle auth, we will create an auth object, and export it, it will contain two methods, login and logout
const auth = {
  //we are going to frist handle the login by creating an async method that uses fetchApiWithAuth,
  //to login we simply need a name and an email, and this is method POST
  //we return a Promise type void
  login: async (name: string, email: string): Promise<void> => {
    await fetchApiWithAuth("/auth/login", {
      method: "POST",
      //we stringify the body
      body: JSON.stringify({ name, email }),
    });
  },
  //and we do the same for a logout function, promise type void, and method POST, we don't need to pass anything to the body
  logout: async (): Promise<void> => {
    await fetchApiWithAuth("/auth/logout", {
      method: "POST",
    });
  },
};

//now we need another object that will have different methods, we will call it dogs, since it will have all the dog-related methods we need
const dogs = {
  //
  //first we need to fetch dogs by breed. We will create a method using fetchApiWithAuth
  //since we are waiting for an array of strings, let's make sure we type this
  breeds: async (): Promise<string[]> => {
    //
    //since this is an async method, we await and do the fetch and we return an array
    return await fetchApiWithAuth<string[]>("/dogs/breeds", {});
  },
  //
  //
  //
  //here we will handle the search method
  //for search we need a query type query Params, which is type searchParams
  search: async (searchParam: SearchParams): Promise<SearchResults> => {
    //first we need to instatiate a new URLsearchParams
    const returnQuery = new URLSearchParams();

    //now URLsearchParams creates an iterable object, that has keys and values
    //we will handle the arrays firsts, we will create an const that appends arrays
    //check values if they are empty, AK if length > 0, we will do a forEach, and append function queryParam, and value
    const appendArray = (
      appendArrayQuery: string,
      appendArrayValue?: string[],
    ) => {
      //we check if appendArrayValue exist, and if has values, in this case because its an array we check its length
      if (appendArrayValue && appendArrayValue.length > 0) {
        //
        //
        //we will loop thru values, and append the appendArrayQuery, and appendArrayValue to returnQuery
        appendArrayValue.forEach((value: string) =>
          returnQuery.append(appendArrayQuery, value),
        );
      }
    };

    //after we create appendArray methods, now we can call it by passing the search param, and value of the param
    appendArray("breeds", searchParam.breeds);
    appendArray("zipCodes", searchParam.zipCodes);

    //
    //now its time to handle searches of things like strings or numbers when they are defined
    //we will create an append for those things, similarly to the one above
    //and we will assign it to returnQueryvoid
    const appendIfDefined = (
      appendIfDefinedQuery: string,
      appendIfDefinedValue?: string | number,
    ) => {
      //since we don't have to loop thru anything, we will simply assign appendIfDefinedQuery, and appendArrayValue to returnQuery
      //let's first make sure the value isn't undefined
      if (appendIfDefinedValue !== undefined) {
        returnQuery.append(
          appendIfDefinedQuery,
          appendIfDefinedValue?.toString(),
        );
      }
    };

    //after creating appendIfDefined method, we can call it and pass the search params, and value
    appendIfDefined("ageMin", searchParam.ageMin);
    appendIfDefined("ageMax", searchParam.ageMax);
    appendIfDefined("size", searchParam.size);
    appendIfDefined("from", searchParam.from);
    appendIfDefined("sort", searchParam.sort);

    //and now finally we return the endpoint, by using fetchApiWithAuth, type searchresult
    return fetchApiWithAuth<SearchResults>(
      `/dogs/search?${returnQuery.toString()}`,
    );
  },
  //
  //
  //now let's create the methods for the /dogs and match endpoints, both are POST
  //we return an array of dogs, we will pass the ids as body
  dogs: async (dogsIds: string[]): Promise<Dog[]> => {
    return fetchApiWithAuth<Dog[]>("/dogs", {
      method: "POST",
      body: JSON.stringify(dogsIds),
    });
  },
  //now we will do something very similar, but instead of returning dogs, it will be type match
  match: async (dogsIds: string[]): Promise<Match> => {
    return fetchApiWithAuth<Match>("/match", {
      method: "POST",
      body: JSON.stringify(dogsIds),
    });
  },
};

//now we will create the object location, in which we will have two methods, both POST, one will be for search param, and the other one for a zip code
const location = {
  //first let's create the zid code method
  //POST method that takes zip code as params, and pass it in the body
  zipCode: async (zipCodes: string[]): Promise<string[]> => {
    return fetchApiWithAuth<string[]>("/locations", {
      method: "POST",
      body: JSON.stringify(zipCodes),
    });
  },
  //now we will create a method for search param, the search param will be passed in the body, it has to be type searchParam, and return type searchParamResult
  search: async (
    param: LocationSearchParams,
  ): Promise<LocationSearchResults> => {
    return fetchApiWithAuth("/locations/search", {
      method: "POST",
      body: JSON.stringify(param),
    });
  },
};

//create variable called api that contains all the objects
const api = {
  auth,
  dogs,
  location,
};

//and now we will export all the objects as a single variable, instead of export them individually
export default api;
