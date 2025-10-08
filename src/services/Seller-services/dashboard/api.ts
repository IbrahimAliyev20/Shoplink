import { get } from "@/lib/api";
import { ReportStats, StoreStats, LastActivities } from "@/types";

export const getStoreStats = async () => {
    const response = await get<StoreStats>("/user/store-statistic");
    return response;
};

export const getReportStats = async () => {
    const response = await get<ReportStats>("/user/report-statistic");
    return response;
};

export const getLastActivities = async () => {
    const response = await get<LastActivities>("/user/last-activities");
    return response;
};
