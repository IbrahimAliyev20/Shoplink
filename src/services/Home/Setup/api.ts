import { get } from "@/lib/api";
import { Setup } from "@/types/home/hometypes";

const getSetup = async () => {
    const response = await get<{ data: Setup[] }>("api/setup-steps"); 
    return response.data; 
};

export { getSetup };