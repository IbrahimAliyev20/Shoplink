import { queryOptions } from "@tanstack/react-query";
import { getClients, getShowClient } from "./api";

export const getClientsQuery = () => {
    return queryOptions({
        queryKey: ["clients"],
        queryFn: () => getClients(),
    });
};
export const getShowClientQuery = (id: string) => {
    return queryOptions({
        queryKey: ["clients", id],
        queryFn: () => getShowClient(id),
    });
};
