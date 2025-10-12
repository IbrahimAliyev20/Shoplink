import { getSosial } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getSosialOptions = function(){
    return createQueryOptions(
        queryKeys.home.social(),
        () => getSosial(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for social links (rarely changes)
        }
    );
};
