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

// --- DÜZƏLİŞ EDİLMİŞ FUNKSİYA ---
export const getProductStoreCategory = async (
  slug: string,
  category_name: string,
  search?: string
): Promise<ProductStoreCategory[]> => {
  // Kateqoriya adını slug formatına çeviririk (boşluqları '-' ilə əvəz edib kiçik hərflərə çeviririk)
  const categorySlug = category_name.toLowerCase().replace(/\s+/g, '-');

  // URL-i yeni yaratdığımız "categorySlug" ilə yığırıq
  let apiUrl = `api/products/${slug}/${categorySlug}`;

  if (search && search.trim() !== "") {
    apiUrl += `?search=${encodeURIComponent(search)}`;
  }

  const response = await get<{ data: ProductStoreCategory[] }>(apiUrl);
  return response.data;
};
// --- DÜZƏLİŞİN SONU ---

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