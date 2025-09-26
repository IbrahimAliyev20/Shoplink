import { queryOptions } from "@tanstack/react-query"
import { getAbout } from "./api"

export const getAboutOptions = function(){
    return queryOptions({
        queryKey: ['about-options'],
        queryFn: () => getAbout()
    })
}

