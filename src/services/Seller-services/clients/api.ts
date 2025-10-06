
import { get } from "@/lib/api";
import { ApiResponse, ClientsResponse } from "@/types";

export const getClients = async (page: number = 1) => {
    const response = await get<ApiResponse<ClientsResponse[]>>(`user/store-users?page=${page}`);
    return response; 
};

export const getShowClient = async (id: string) => {
    const response = await get<{ data: ClientsResponse }>(`user/store-user/show/${id}`);
    return response.data;
};