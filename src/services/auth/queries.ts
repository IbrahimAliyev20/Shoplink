import { getUser } from "./api";
import { getAuthToken } from "@/lib/api/client";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const userQueries = {
  current: () => createQueryOptions(
    queryKeys.user.current,
    () => getUser(getAuthToken() || ''),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      enabled: !!getAuthToken(),
    }
  ),
};

// Legacy export for backwards compatibility - will be removed after migration
export const getUserQuery = userQueries.current;
