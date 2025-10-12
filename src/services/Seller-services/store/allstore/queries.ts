import { getAllStore } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getAllStoreQuery = () => {
    return createQueryOptions(
        queryKeys.store.all(),
        () => getAllStore(),
        {
            staleTime: 10 * 60 * 1000, // 10 minutes for store list
        }
    );
};
