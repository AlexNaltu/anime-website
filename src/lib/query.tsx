import { QueryClient } from "@tanstack/react-query";

// Function to create a new QueryClient
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data fetched by queries
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // If running on the server, create a new QueryClient instance
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    // If running in the browser, return the existing instance or create a new one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
