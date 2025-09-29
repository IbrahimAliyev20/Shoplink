import { queryOptions } from "@tanstack/react-query"
import { getSetup } from "./api"

export const getSetupOptions = function(){
    return queryOptions({
        queryKey: ['setup-options'],
        queryFn: () => getSetup()
    })
}

