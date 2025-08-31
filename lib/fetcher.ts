import type { Fetcher } from "./types";

export default async function fetcher(params: Fetcher) {
  const response = await fetch(`${window.location.origin}/api${params.url}`, {
    method: params.body ? "POST" : "GET",
    body: params.body ? JSON.stringify(params.body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
