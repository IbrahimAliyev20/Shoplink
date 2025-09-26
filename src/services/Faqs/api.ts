import { get } from "@/lib/api";
import { Faqs } from "@/types";

const getFaqs = async () => {
    const response = await get<{ data: Faqs[] }>("api/faqs"); 
    return response.data;   
};

export { getFaqs };