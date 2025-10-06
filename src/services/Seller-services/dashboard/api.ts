import { get } from "@/lib/api";
import { ReportStats, StoreStats } from "@/types";

export const getStoreStats = async () => {
    const response = await get<StoreStats>("/user/store-statistic");
    return response;
};
export const getReportStats = async () => {
    const response = await get<ReportStats>("/user/report-statistic");
    return response;
};
