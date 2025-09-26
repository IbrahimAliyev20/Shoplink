import { queryOptions } from "@tanstack/react-query"
import { getAdvantages } from "./api"

export const getAdvantagesOptions = function(){
    return queryOptions({
        queryKey: ['advantages-options'],
        queryFn: () => getAdvantages()
    })
}

