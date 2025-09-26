import { mutationOptions } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "./api";

export const createCategoryMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => createCategory(formData),
  });

export const updateCategoryMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => updateCategory(formData),
  });

export const deleteCategoryMutation = () =>
  mutationOptions({
    mutationFn: (id: number) => deleteCategory(id),
  });