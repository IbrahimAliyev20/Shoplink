
import { queryOptions } from "@tanstack/react-query"
import { getSellers } from "./api"

export const getSellersOptions = function(){
    return queryOptions({
        queryKey: ['sellers-options'],
        queryFn: () => getSellers()
    })
}

