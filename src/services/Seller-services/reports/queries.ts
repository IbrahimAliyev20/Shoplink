import { queryOptions } from "@tanstack/react-query";
import { getReports, ReportFilterParams } from "./api";

const getReportsQuery = (filters: ReportFilterParams) => {
    return queryOptions({
        queryKey: ["reports", filters],
        
        queryFn: () => getReports(filters),
    });
};

export default getReportsQuery;
