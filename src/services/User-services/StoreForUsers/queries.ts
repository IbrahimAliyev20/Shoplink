import { queryOptions } from "@tanstack/react-query"
import { getCategoryStore, getStore, getProductStoreCategory, getProductSingle, getAllProductsStore } from "./api"




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