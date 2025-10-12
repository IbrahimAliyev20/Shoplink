import { getSubscribes } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getSubscribesQuery = () => {
    return createQueryOptions(
        queryKeys.subscriptions(),
        getSubscribes,
        {
            staleTime: 5 * 60 * 1000, // 5 minutes for subscriptions
        }
    );
};