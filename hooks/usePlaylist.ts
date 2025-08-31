import useSWR from "swr";
import fetcher from "@libs/fetcher";

const swrFetcher = (url: string) => {
  return fetcher({ url });
};
export const usePlaylist = () => {
  const { data, error, mutate } = useSWR("/playlist", swrFetcher, {
    errorRetryCount: 3,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    dedupingInterval: 5000,
  });

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
