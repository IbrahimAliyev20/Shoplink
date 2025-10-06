import { get } from "@/lib/api";
import { Subscribe } from "@/types";

export const getSubscribes = async () => {
    const response = await get<{ data: Subscribe[] }>("/user/plans");
    return response.data;
};