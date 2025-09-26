import { get } from "@/lib/api";
import { About } from "@/types";

const getAbout = async () => {
    const response = await get<{ data: About }>("api/about"); 
    return response.data; 
};

export { getAbout };