import { queryOptions } from "@tanstack/react-query"
import { getCategoryStore, getStore, getProductStoreCategory, getProductSingle, getAllProductsStore, FilterProductsStore } from "./api"




export const getStoreOptions = function(slug: string){
    return queryOptions({
        queryKey: ['store-options' , slug],
        queryFn: () => getStore(slug)
    })
}



export const getCategoryStoreOptions = function(slug: string){
    return queryOptions({
        queryKey: ['category-store-options' , slug],
        queryFn: () => getCategoryStore(slug)
    })
}



export const getProductStoreCategoryOptions = function(
    slug: string,
    category_name: string,
    search?: string 
  ) {
    return queryOptions({
      queryKey: ["product-store-category-options", slug, category_name, search],
      queryFn: () => getProductStoreCategory(slug, category_name, search),
    });
  };



export const getProductSingleOptions = function(slug: string){
    return queryOptions({
        queryKey: ['product-single-options' , slug],
        queryFn: () => getProductSingle(slug)
    })
}


 
export const getAllProductsStoreOptions = function(slug: string, search?: string) {
    return queryOptions({
      queryKey: ['all-products-store-options', slug, search],
      queryFn: () => getAllProductsStore(slug, search),
    });
  };


interface ProductFilters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  stock?: 0 | 1;
}

export const getFilteredProductsStoreOptions = (filters: ProductFilters) => {
  return queryOptions({
    queryKey: ['products', 'filter', filters],
      
    queryFn: () => {
      const formData = new FormData();
      if (filters.category_id) formData.append('category_id', String(filters.category_id));
      if (filters.min_price) formData.append('min_price', String(filters.min_price));
      if (filters.max_price) formData.append('max_price', String(filters.max_price));
      if (filters.stock !== undefined) formData.append('stock', String(filters.stock));
      
      return FilterProductsStore(formData);
    },
    enabled: false, 
  });
};