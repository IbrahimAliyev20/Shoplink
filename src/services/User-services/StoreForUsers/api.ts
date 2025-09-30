import { get } from "@/lib/api";
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
    let apiUrl = `api/products/${slug}/${category_name}`;
  
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

export const getAllProductsStore = async ( slug: string, search?: string):
   Promise<ProductStoreCategory[]> => {let apiUrl = `api/all-products/${slug}`;
  if (search && search.trim() !== "") {
    apiUrl += `?search=${encodeURIComponent(search)}`;
  }
  const response = await get<{ data: ProductStoreCategory[] }>(apiUrl);
  return response.data;
};
