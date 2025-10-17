import { getAbout } from "./api";
import { queryKeys, createQueryOptions, staticContentOptions } from "@/lib/query-config";

export const getAboutOptions = function(){
    return createQueryOptions(
        queryKeys.home.about(),
        () => getAbout(),
        staticContentOptions // Using optimized config for static content
    );
};

