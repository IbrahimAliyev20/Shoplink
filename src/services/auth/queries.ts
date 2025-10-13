import { getUser } from "./api";
import { getAuthToken } from "@/lib/api/client";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const userQueries = {
  current: () => createQueryOptions(
    queryKeys.user.current,
    () => getUser(getAuthToken() || ''),
    {
      staleTime: 5 * 60 * 1000,
      enabled: !!getAuthToken(),
    }
  ),
};

export const getUserQuery = userQueries.current;
