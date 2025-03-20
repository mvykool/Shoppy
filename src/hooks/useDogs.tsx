import { useState } from "react";
import { Dog, SearchResults } from "../types";
import api from "../services/fetchApi";

export const useDogs = () => {
  //we need errors, loading, breeds, dogs, and search results
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null,
  );

  const fetchBreeds = async () => {
    setError(false);
    setLoading(true);
    try {
      const breedsData = await api.dogs.breeds();
      setBreeds(breedsData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
};
