"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

interface QueryProviderProps {
  children: ReactNode;
}

interface ApiError extends Error {
  response?: {
    status?: number;
  };
}

function makeQueryClient(router: AppRouterInstance) {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => {
        const apiError = error as ApiError;
        const status = apiError.response?.status;
        if (status === 403) {
          console.error("403 Forbidden Xətası tutuldu. Yönləndirilir...");
          router.push("/403");
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(router: AppRouterInstance) {
  if (typeof window === "undefined") {
    return makeQueryClient(router);
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(router);
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: QueryProviderProps) {
  const router = useRouter();

  const queryClient = getQueryClient(router);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}
