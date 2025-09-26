import { get } from "@/lib/api";
import { Banner } from "@/types";

const getBanner = async () => {
    const response = await get<{ data: Banner }>("api/banner"); 
    return response.data; 
};
    
export { getBanner };