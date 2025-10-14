import { get, post } from "@/lib/api";
import {
  StoreForUsers,
  CategoryStore,
  ProductStoreCategory,
} from "@/types/storeforusers/types";

export const getStore = async (slug: string): Promise<StoreForUsers> => {
  const response = await get<{ data: StoreForUsers }>(`api/store/${slug}`);
  return response.data;
};

export const getCategoryStore = async (
  slug: string
): Promise<CategoryStore[]> => {
  const response = await get<{ data: CategoryStore[] }>(`api/category/${slug}`);
  return response.data;
};

export const getProductStoreCategory = async (
  slug: string,
  category_name: string,
  search?: string
): Promise<ProductStoreCategory[]> => {
  const categorySlug = category_name
    .toLowerCase()
    .replace(/ə/g, 'e')
    .replace(/ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/\s+/g, '-');

  let apiUrl = `api/products/${slug}/${categorySlug}`;

  if (search && search.trim() !== "") {
    apiUrl += `?search=${encodeURIComponent(search)}`;
  }

  const response = await get<{ data: ProductStoreCategory[] }>(apiUrl);
  return response.data;
};


export const getProductSingle = async (
  slug: string
): Promise<ProductStoreCategory> => {
  const response = await get<{ data: ProductStoreCategory }>(
    `api/product/${slug}`
  );
  return response.data;
};

export const getAllProductsStore = async (
  slug: string,
  search?: string
): Promise<ProductStoreCategory[]> => {
  let apiUrl = `api/all-products/${slug}`;
  if (search && search.trim() !== "") {
    apiUrl += `?search=${encodeURIComponent(search)}`;
  }
  const response = await get<{ data: ProductStoreCategory[] }>(apiUrl);
  return response.data;
};

export const FilterProductsStore = async (
  formData: FormData
): Promise<ProductStoreCategory[]> => {
  const response = await post<{ data: ProductStoreCategory[] }>(
    "api/filter",
    formData
  );
  return response.data;
};