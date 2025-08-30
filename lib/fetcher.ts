import type { Fetcher } from "./types";
export default function fetcher(params: Fetcher) {
  return fetch(`${window.location.origin}/api${params.url}`, {
    method: params.body ? "POST" : "GET",
    body: params.body ? JSON.stringify(params.body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
