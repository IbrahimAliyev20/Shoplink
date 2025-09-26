import { post } from "@/lib/api";
import { ApiResponse, UpdateApiResponse } from "@/types";

const updateStore = async (formData: FormData) => {
  const storeId = formData.get('id');
  if (!storeId) {
      throw new Error("Store ID is missing in FormData for update.");
  }
  const response = await post<ApiResponse<UpdateApiResponse>>(`user/store/update/${storeId}`, formData);
  return response.data;
};

export { updateStore };