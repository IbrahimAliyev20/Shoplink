import { post } from "@/lib/api";
import { ApiResponse } from "@/types";
import { FeedbackResponse } from "@/types";

const createFeedback = async (formData: FormData) => {
  const response = await post<ApiResponse<FeedbackResponse>>("/user/userfeedback", formData);
  return response.data;
};

const updateFeedback = async (data: { id: number; formData: FormData }) => {
  const response = await post<ApiResponse<FeedbackResponse>>(
    `/user/userfeedback/update/${data.id}`, 
    data.formData
  );
  return response.data;
};

const deleteFeedback = async (id: number) => {
  const response = await post<ApiResponse<null>>(`/user/userfeedback/delete/${id}`, {});
  return response;
};

export { createFeedback, updateFeedback, deleteFeedback };