import { QueryClientConfig } from "@tanstack/react-query";

export const queryConfig: Partial<QueryClientConfig> = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: (failureCount, error: unknown) => {
        if (error && typeof error === "object" && "response" in error) {
          const response = (error as { response: { status: number } }).response;
          if (response?.status >= 400 && response?.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },

      retryDelay: (attemptIndex) => {
        const baseDelay = Math.min(1000 * 2 ** attemptIndex, 30000);
        const jitter = Math.random() * 1000;
        return baseDelay + jitter;
      },

      refetchOnWindowFocus: false,
      refetchOnReconnect: true,

      refetchOnMount: true,

      networkMode: "online",
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
      networkMode: "online",
    },
  },
};

export const queryKeys = {
  user: {
    current: ["user", "current"] as const,
    all: () => ["user"] as const,
  },

  store: {
    all: () => ["stores"] as const,
    bySlug: (slug: string) => ["store", slug] as const,
    categories: (slug: string) => ["store", slug, "categories"] as const,
  },

  products: {
    all: () => ["products"] as const,
    byId: (id: number) => ["product", id] as const,
    bySlug: (slug: string) => ["product", "slug", slug] as const,
    byStore: (storeSlug: string, search?: string) =>
      ["products", "store", storeSlug, search] as const,
    byCategory: (storeSlug: string, categoryName: string, search?: string) =>
      [
        "products",
        "store",
        storeSlug,
        "category",
        categoryName,
        search,
      ] as const,
    filtered: (filters: Record<string, unknown>) =>
      ["products", "filter", filters] as const,
  },

  dashboard: {
    stats: () => ["dashboard", "stats"] as const,
    reports: (filters?: Record<string, unknown>) =>
      ["dashboard", "reports", filters] as const,
    activities: () => ["dashboard", "activities"] as const,
  },

  categories: {
    all: () => ["categories"] as const,
    byId: (id: number) => ["category", id] as const,
  },

  orders: {
    all: () => ["orders"] as const,
    byId: (id: string) => ["order", id] as const,
    userOrders: () => ["user", "orders"] as const,
    storeOrders: () => ["store", "orders"] as const,
  },

  addresses: {
    all: () => ["addresses"] as const,
  },

  clients: {
    all: (page?: number) => ["clients", page] as const,
    byId: (id: string) => ["client", id] as const,
  },

  home: {
    metaTags: () => ["home", "meta-tags"] as const,
    hero: () => ["home", "hero"] as const,
    about: () => ["home", "about"] as const,
    advantages: () => ["home", "advantages"] as const,
    faqs: () => ["home", "faqs"] as const,
    sellers: () => ["home", "sellers"] as const,
    contact: () => ["home", "contact"] as const,
    setup: () => ["home", "setup"] as const,
    social: () => ["home", "social"] as const,
    banner: () => ["home", "banner"] as const,
  },

  promocodes: () => ["promocodes"] as const,
  subscriptions: () => ["subscriptions"] as const,
  trackNumber: (slug: string) => ["track-number", slug] as const,
  socialMedia: {
    dashboard: () => ["social-media", "dashboard"] as const,
  },
} as const;

export const createQueryOptions = <T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  options?: {
    staleTime?: number;
    enabled?: boolean;
    refetchInterval?: number;
  }
) => ({
  queryKey,
  queryFn,
  staleTime: options?.staleTime ?? 5 * 60 * 1000,
  enabled: options?.enabled ?? true,
  refetchInterval: options?.refetchInterval,
});

export const createMutationOptions = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
  }
) => ({
  mutationFn,
  onSuccess: options?.onSuccess,
  onError: options?.onError,
});
