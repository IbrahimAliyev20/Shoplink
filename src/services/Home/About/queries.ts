import { getAbout } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getAboutOptions = function(){
    return createQueryOptions(
        queryKeys.home.about(),
        () => getAbout(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for about content (rarely changes)
        }
    );
};

