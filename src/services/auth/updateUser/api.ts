import { post } from "@/lib/api";
import { ApiResponse, UserData } from "@/types";

const postUpdateUser = async (data: Partial<UserData> | FormData) => {
  const response = await post<ApiResponse<UserData>>(`user/update`,data);

  return response;
};

export { postUpdateUser };
