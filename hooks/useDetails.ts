"use client";
import useSWR from "swr";
import fetcher from "@libs/fetcher";

const swrFetcher = (url: string) => {
  return fetcher({ url });
};

export const useMe = () => {
  const { data, error, mutate } = useSWR("/profile", swrFetcher, {
    errorRetryCount: 3,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    dedupingInterval: 5000,
  });
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
