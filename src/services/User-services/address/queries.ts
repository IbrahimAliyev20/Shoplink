import { queryOptions } from "@tanstack/react-query";
import { getAddresses } from "./api";

export const addressQueries = {
    all: () => 
        queryOptions({
            queryKey: ['addresses'],
            queryFn: getAddresses,
        }),
};