import { queryOptions } from "@tanstack/react-query";
import { getReportStats, getStoreStats } from "./api";

export const getStoreStatsQuery = () => {   
    return queryOptions({
        queryKey: ["store-stats"],
        queryFn: getStoreStats,
    });
};

export const getReportStatsQuery = () => {
    return queryOptions({
        queryKey: ["report-stats"],
        queryFn: getReportStats,
    });
};