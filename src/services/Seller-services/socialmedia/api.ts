import { get, post } from "@/lib/api";
import { ApiResponse, SocialMediaDashboardApiResponse } from "@/types";

export const getSocialMediaDashboard = async () => {    
    const response = await get<ApiResponse<SocialMediaDashboardApiResponse>>("/user/store-detail");
    return response;
};

export const createSocialMediaDashboard = async (formData: FormData) => {
    const response = await post<ApiResponse<SocialMediaDashboardApiResponse>>("/user/store-detail/create", formData);
    return response;
};

export const updateSocialMediaDashboard = async (id: number, formData: FormData) => {
    const response = await post<ApiResponse<SocialMediaDashboardApiResponse>>(`/user/store-detail/update/${id}`, formData);
    return response;
};