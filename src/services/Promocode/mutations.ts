import { mutationOptions } from "@tanstack/react-query";
import { createPromocode, deletePromocode, updatePromocode } from "./api";

export const createPromocodeMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => createPromocode(formData),
  });

export const updatePromocodeMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => updatePromocode(formData),
  });

export const deletePromocodeMutation = () =>
  mutationOptions({
    mutationFn: (id: number) => deletePromocode(id),
  });


