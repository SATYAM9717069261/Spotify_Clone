import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@libs/fetcher";
import type { SearchResults } from "./search.type";

const swrFetcher = (url: string) => fetcher({ url });

export const useSearch = (debounceMs: number = 500) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => clearTimeout(handler);
  }, [query, debounceMs]);

  const endpoint = debouncedQuery
    ? `/search?song=${encodeURIComponent(debouncedQuery)}&artist=${encodeURIComponent(debouncedQuery)}`
    : null;

  const { data, error, mutate } = useSWR<SearchResults>(endpoint, swrFetcher, {
    errorRetryCount: 3,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 5000,
  });

  return {
    setQuery,
    results: data?.results,
    isLoading: debouncedQuery && !data && !error,
    isError: error,
    mutate,
  };
};
