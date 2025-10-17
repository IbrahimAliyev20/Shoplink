import { getCategoryStore, getStore, getProductStoreCategory, getProductSingle, getAllProductsStore, FilterProductsStore } from "./api"
import { queryKeys, createQueryOptions } from "@/lib/query-config"

export const getStoreOptions = function(slug: string){
    return createQueryOptions(
        queryKeys.store.bySlug(slug),
        () => getStore(slug),
        {
            staleTime: 10 * 60 * 1000, 
        }
    )
}

export const getCategoryStoreOptions = function(slug: string){
    return createQueryOptions(
        queryKeys.store.categories(slug),
        () => getCategoryStore(slug),
        {
            staleTime: 15 * 60 * 1000, 
        }
    )
}

export const getProductStoreCategoryOptions = function(
    slug: string,
    category_name: string,
    search?: string 
  ) {
    // Normalize empty strings to undefined to prevent duplicate cache keys
    const normalizedSearch = search?.trim() || undefined;
    return createQueryOptions(
      queryKeys.products.byCategory(slug, category_name, normalizedSearch),
      () => getProductStoreCategory(slug, category_name, normalizedSearch),
      {
          staleTime: 3 * 60 * 1000, 
      }
    );
  };

export const getProductSingleOptions = function(slug: string){
    return createQueryOptions(
        queryKeys.products.bySlug(slug),
        () => getProductSingle(slug),
        {
            staleTime: 10 * 60 * 1000,
        }
    )
}

export const getAllProductsStoreOptions = function(slug: string, search?: string) {
    // Normalize empty strings to undefined to prevent duplicate cache keys
    const normalizedSearch = search?.trim() || undefined;
    return createQueryOptions(
      queryKeys.products.byStore(slug, normalizedSearch),
      () => getAllProductsStore(slug, normalizedSearch),
      {
          staleTime: 2 * 60 * 1000, 
      }
    );
  };

interface ProductFilters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  stock?: 0 | 1;
}

export const getFilteredProductsStoreOptions = (filters: ProductFilters) => {
  return createQueryOptions(
    queryKeys.products.filtered(filters as Record<string, unknown>),
    () => {
      const formData = new FormData();
      if (filters.category_id) formData.append('category_id', String(filters.category_id));
      if (filters.min_price) formData.append('min_price', String(filters.min_price));
      if (filters.max_price) formData.append('max_price', String(filters.max_price));
      if (filters.stock !== undefined) formData.append('stock', String(filters.stock));
      
      return FilterProductsStore(formData);
    },
    {
        staleTime: 1 * 60 * 1000,
        // Removed enabled: false - query is controlled by useProductsData hook
    }
  );
};