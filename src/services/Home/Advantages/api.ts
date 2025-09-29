import { get } from "@/lib/api";
import { Advantages } from "@/types/home/hometypes";

const getAdvantages = async () => {
    const response = await get<{ data: Advantages[] }>("api/advantages"); 
    return response.data; 
};

export { getAdvantages };