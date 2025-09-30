import { mutationOptions } from "@tanstack/react-query";
import {
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from "./api";

export const useCreateFeedbackMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => createFeedback(formData),
  });

export const useUpdateFeedbackMutation = () =>
  mutationOptions({
    mutationFn: (data: { id: number; formData: FormData }) => updateFeedback(data),
  });

export const useDeleteFeedbackMutation = () =>
  mutationOptions({
    mutationFn: (id: number) => deleteFeedback(id),
  });