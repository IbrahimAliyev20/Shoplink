import { getFaqs } from "./api";
import { queryKeys, createQueryOptions, staticContentOptions } from "@/lib/query-config";

export const getFaqsOptions = function(){
    return createQueryOptions(
        queryKeys.home.faqs(),
        () => getFaqs(),
        staticContentOptions // Using optimized config for static content
    );
};

