import { queryOptions } from "@tanstack/react-query";
import { getUser } from "./api";
import { getAuthToken } from "@/lib/api/client";

const getUserQuery = () => {
    return queryOptions({
        queryKey: ["user"],
        queryFn: () => getUser(getAuthToken() || ''),
        staleTime: 1000 * 60 * 5,
        enabled: !!getAuthToken(),
    });
};


export { getUserQuery };
