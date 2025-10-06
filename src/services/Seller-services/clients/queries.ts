import { queryOptions } from "@tanstack/react-query";
import { getClients, getShowClient } from "./api";

export const getClientsQuery = (page: number) => {
    return queryOptions({
        queryKey: ["clients", page],
        queryFn: () => getClients(page),
    });
};
export const getShowClientQuery = (id: string) => {
    return queryOptions({
        queryKey: ["clients", id],
        queryFn: () => getShowClient(id),
    });
};
