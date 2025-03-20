import { useState } from "react";
import { SearchResults } from "../types";

export const useDogs = () => {
  //we need errors, loading, breeds, dogs, and search results
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null,
  );
};
