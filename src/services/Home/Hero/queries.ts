import { getHeroBanner } from "./api";
import { queryKeys, createQueryOptions, staticContentOptions } from "@/lib/query-config";

export const getHeroBannerOptions = function(){
    return createQueryOptions(
        queryKeys.home.hero(),
        () => getHeroBanner(),
        staticContentOptions // Using optimized config for static content
    );
};

