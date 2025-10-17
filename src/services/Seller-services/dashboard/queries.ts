import { getLastActivities, getReportStats, getStoreStats } from "./api";
import { queryKeys, createQueryOptions, realtimeContentOptions, dynamicContentOptions } from "@/lib/query-config";

export const getStoreStatsQuery = () => {   
    return createQueryOptions(
        queryKeys.dashboard.stats(),
        getStoreStats,
        realtimeContentOptions // Using optimized config for real-time data
    );
};

export const getReportStatsQuery = () => {
    return createQueryOptions(
        queryKeys.dashboard.reports(),
        getReportStats,
        dynamicContentOptions // Using optimized config for dynamic data
    );
};

export const getLastActivitiesQuery = () => {
    return createQueryOptions(
        queryKeys.dashboard.activities(),
        getLastActivities,
        realtimeContentOptions // Using optimized config for real-time data
    );
};