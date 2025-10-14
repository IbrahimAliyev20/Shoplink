import { get } from "@/lib/api";
import { MetaTagsTypes } from "@/types";

export const getMetaTags = async (): Promise<{ data: MetaTagsTypes[] }> => {
    const response = await get<{ data: MetaTagsTypes[] }>("api/metatags");
    return response;
};