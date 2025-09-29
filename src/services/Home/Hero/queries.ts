import { queryOptions } from "@tanstack/react-query"
import { getHeroBanner } from "./api"

export const getHeroBannerOptions = function(){
    return queryOptions({
        queryKey: ['hero-banner-options'],
        queryFn: () => getHeroBanner()
    })
}

