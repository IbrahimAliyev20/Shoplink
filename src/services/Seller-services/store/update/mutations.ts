import { mutationOptions } from "@tanstack/react-query";
import { updateStore } from "./api";

export const updateStoreMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => updateStore (formData),
  });