import { queryOptions } from "@tanstack/react-query";
import { getStoreStats } from "./api";

export const getStoreStatsQuery = () => {   
    return queryOptions({
        queryKey: ["store-stats"],
        queryFn: getStoreStats,
    });
};