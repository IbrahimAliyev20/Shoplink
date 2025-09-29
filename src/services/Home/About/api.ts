import { get } from "@/lib/api";
import { About } from "@/types/home/hometypes";

const getAbout = async () => {
    const response = await get<{ data: About }>("api/about"); 
    return response.data; 
};

export { getAbout };