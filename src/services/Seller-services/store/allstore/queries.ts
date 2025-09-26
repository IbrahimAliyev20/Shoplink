
import { queryOptions } from "@tanstack/react-query"
import { getAllStore } from "./api"

export const getAllStoreQuery = () => {
    return queryOptions({
        queryKey: ['all-store-options'],
        queryFn: () => getAllStore()
    })
}
