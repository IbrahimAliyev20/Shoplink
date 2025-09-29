import { get } from "@/lib/api";
import { Banner } from "@/types/home/hometypes";

const getBanner = async () => {
    const response = await get<{ data: Banner }>("api/banner"); 
    return response.data; 
};
    
export { getBanner };