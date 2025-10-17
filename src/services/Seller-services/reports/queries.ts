import { getReports, ReportFilterParams } from "./api";
import { queryKeys, createQueryOptions, dynamicContentOptions } from "@/lib/query-config";

const getReportsQuery = (filters: ReportFilterParams) => {
    return createQueryOptions(
        queryKeys.dashboard.reports(filters),
        () => getReports(filters),
        {
            ...dynamicContentOptions, // Using optimized config for dynamic report data
            staleTime: 2 * 60 * 1000, // Keep 2 minutes for reports to balance freshness and performance
        }
    );
};

export default getReportsQuery;
