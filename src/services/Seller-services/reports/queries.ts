import { queryOptions } from "@tanstack/react-query";
import { getReports } from "./api";

const getReportsQuery = () => {
    return queryOptions({
        queryKey: ["reports"],
        queryFn: getReports,
    });
};

export default getReportsQuery;