import { get } from "@/lib/api";
import { HeroBanner } from "@/types/home/hometypes";   

const getHeroBanner = async () => {
    const response = await get<{ data: HeroBanner }>("api/hero"); 
    return response.data; 
};

export { getHeroBanner };