import { mutationOptions } from "@tanstack/react-query";
import { createSocialMediaDashboard, updateSocialMediaDashboard } from "./api";

const createSocialMediaDashboardMutation = () => {
  return mutationOptions({
    mutationFn: (formData: FormData) => createSocialMediaDashboard(formData),
  });
};

const updateSocialMediaDashboardMutation = () => {
  return mutationOptions({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => updateSocialMediaDashboard(id, formData),
  });
};

export {
  createSocialMediaDashboardMutation,
  updateSocialMediaDashboardMutation,
};