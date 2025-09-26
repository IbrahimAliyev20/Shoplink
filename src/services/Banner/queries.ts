import { queryOptions } from "@tanstack/react-query"
import { getBanner } from "./api"

export const getBannerOptions = function(){
    return queryOptions({
        queryKey: ['banner-options'],
        queryFn: () => getBanner()
    })
}

