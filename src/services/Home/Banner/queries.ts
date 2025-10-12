import { getBanner } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getBannerOptions = function(){
    return createQueryOptions(
        queryKeys.home.banner(),
        () => getBanner(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for banner (rarely changes)
        }
    );
};

