import { getAdvantages } from "./api";
import { queryKeys, createQueryOptions, staticContentOptions } from "@/lib/query-config";

export const getAdvantagesOptions = function(){
    return createQueryOptions(
        queryKeys.home.advantages(),
        () => getAdvantages(),
        staticContentOptions // Using optimized config for static content
    );
};

