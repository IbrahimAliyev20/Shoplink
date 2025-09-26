
import { queryOptions } from "@tanstack/react-query"
import { getSosial } from "./api"

export const getSosialOptions = function(){
    return queryOptions({
        queryKey: ['sosial-options'],
        queryFn: () => getSosial()
    })
}
