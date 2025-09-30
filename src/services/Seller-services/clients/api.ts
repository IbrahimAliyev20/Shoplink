// api.ts

import { get } from "@/lib/api";
import { ClientsResponse } from "@/types";

export const getClients = async () => {
    const response = await get<{ data: ClientsResponse[] }>(`user/store-users`);
    return response.data; 
};

export const getShowClient = async (id: string) => {
    const response = await get<{ data: ClientsResponse }>(`user/store-user/show/${id}`);
    return response.data;
};