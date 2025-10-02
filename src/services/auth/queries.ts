import { queryOptions } from "@tanstack/react-query";
import { getUser } from "./api";
import { getAuthToken } from "@/lib/api/client";

export const userQueries = {
  current: () => queryOptions({
    queryKey: ['user', 'current'],
    queryFn: () => getUser(getAuthToken() || ''),
    staleTime: 1000 * 60 * 5,
    enabled: !!getAuthToken(),
  }),
};

// Legacy export for backwards compatibility - will be removed after migration
export const getUserQuery = userQueries.current;
