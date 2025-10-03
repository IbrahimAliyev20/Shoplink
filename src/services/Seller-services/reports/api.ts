import { get } from "@/lib/api";
import { Reports } from "@/types";

export const getReports = async () => {
    const response = await get<{ data: Reports[] }>("/user/reports");
    return response.data;
};