import { get, post } from "@/lib/api";
import { Subscribe } from "@/types";

export const getSubscribes = async () => {
    const response = await get<{ data: Subscribe[] }>("/user/plans");
    return response.data;
};

export const PlanPayment = async (formData: FormData) => {
    const response = await post<{ data: Subscribe[] }>("/user/get-plan", formData);
    return response;
};