import { getFaqs } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getFaqsOptions = function(){
    return createQueryOptions(
        queryKeys.home.faqs(),
        () => getFaqs(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for FAQs (rarely changes)
        }
    );
};

