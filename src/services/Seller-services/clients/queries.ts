import { getClients, getShowClient } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getClientsQuery = (page: number) => {
    return createQueryOptions(
        queryKeys.clients.all(page),
        () => getClients(page),
        {
            staleTime: 3 * 60 * 1000, // 3 minutes for client lists
        }
    );
};

export const getShowClientQuery = (id: string) => {
    return createQueryOptions(
        queryKeys.clients.byId(id),
        () => getShowClient(id),
        {
            staleTime: 10 * 60 * 1000, // 10 minutes for individual clients
        }
    );
};
