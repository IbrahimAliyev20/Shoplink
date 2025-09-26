import { mutationOptions } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "./api";

export const createProductMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => createProduct(formData),
  });

export const updateProductMutation = () =>
  mutationOptions({
    mutationFn: (formData: FormData) => updateProduct(formData),
  });

export const deleteProductMutation = () =>
  mutationOptions({
    mutationFn: (id: number) => deleteProduct(id),
  });