import { getHeroBanner } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getHeroBannerOptions = function(){
    return createQueryOptions(
        queryKeys.home.hero(),
        () => getHeroBanner(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for hero banner (rarely changes)
        }
    );
};

