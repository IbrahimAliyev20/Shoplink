import { getReports, ReportFilterParams } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

const getReportsQuery = (filters: ReportFilterParams) => {
    return createQueryOptions(
        queryKeys.dashboard.reports(filters),
        () => getReports(filters),
        {
            staleTime: 2 * 60 * 1000, // 2 minutes for reports
        }
    );
};

export default getReportsQuery;
