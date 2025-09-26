import { queryOptions } from "@tanstack/react-query"
import { getFaqs } from "./api"

export const getFaqsOptions = function(){
    return queryOptions({
        queryKey: ['faqs-options'],
        queryFn: () => getFaqs()
    })
}

