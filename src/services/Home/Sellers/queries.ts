import { getSellers } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getSellersOptions = function(){
    return createQueryOptions(
        queryKeys.home.sellers(),
        () => getSellers(),
        {
            staleTime: 10 * 60 * 1000, // 10 minutes for sellers (may change more frequently)
        }
    );
};

