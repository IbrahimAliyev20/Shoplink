import { get } from "@/lib/api";
import { AllStore, ApiResponse } from "@/types";

type AllStoreApiResponse = ApiResponse<AllStore>;

const getAllStore = async (): Promise<AllStore> => {
    
    const response = await get<AllStoreApiResponse>("user/stores");
    return response.data;
};

export { getAllStore };