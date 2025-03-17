export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface SearchResults {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
  };
  size?: number;
  from?: number;
}

export interface LocationSearchResults {
  results: Location[];
  total: number;
}

export interface Match {
  match: string;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface FavoritesContextType {
  favorites: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dogId: string) => void;
  isFavorite: (dogId: string) => boolean;
  clearFavorites: () => void;
}

export type SortOrder = "asc" | "desc";
export type SortField = "breed" | "name" | "age";
