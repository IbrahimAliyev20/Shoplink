import { getLastActivities, getReportStats, getStoreStats } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getStoreStatsQuery = () => {   
    return createQueryOptions(
        queryKeys.dashboard.stats(),
        getStoreStats,
        {
            staleTime: 2 * 60 * 1000, // 2 minutes for stats
        }
    );
};

export const getReportStatsQuery = () => {
    return createQueryOptions(
        queryKeys.dashboard.reports(),
        getReportStats,
        {
            staleTime: 5 * 60 * 1000, // 5 minutes for reports
        }
    );
};

export const getLastActivitiesQuery = () => {
    return createQueryOptions(
        queryKeys.dashboard.activities(),
        getLastActivities,
        {
            staleTime: 1 * 60 * 1000, // 1 minute for activities
        }
    );
};