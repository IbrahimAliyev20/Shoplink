import { get } from "@/lib/api";
import { Sellers } from "@/types/home/hometypes";

const getSellers = async () => {
    const response = await get<{ data: Sellers[] }>("api/sellers"); 
    return response.data; 
};

export { getSellers };