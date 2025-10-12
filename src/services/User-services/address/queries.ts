import { getAddresses } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const addressQueries = {
    all: () => 
        createQueryOptions(
            queryKeys.addresses.all(),
            getAddresses,
            {
                staleTime: 10 * 60 * 1000, // 10 minutes for addresses
            }
        ),
};