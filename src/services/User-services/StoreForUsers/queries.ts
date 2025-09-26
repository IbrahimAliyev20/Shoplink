import { queryOptions } from "@tanstack/react-query"
import { getCategoryStore, getStore, getProductStoreCategory, getProductSingle, getAllProductsStore } from "./api"




export const getStoreOptions = function(slug: string){
    return queryOptions({
        queryKey: ['store-options'],
        queryFn: () => getStore(slug)
    })
}



export const getCategoryStoreOptions = function(slug: string){
    return queryOptions({
        queryKey: ['category-store-options'],
        queryFn: () => getCategoryStore(slug)
    })
}



export const getProductStoreCategoryOptions = function(slug: string, category_name: string){
    return queryOptions({
        queryKey: ['product-store-category-options'],
        queryFn: () => getProductStoreCategory(slug, category_name)
    })
}



export const getProductSingleOptions = function(slug: string){
    return queryOptions({
        queryKey: ['product-single-options'],
        queryFn: () => getProductSingle(slug)
    })
}


 
export const getAllProductsStoreOptions = function(slug: string){
    return queryOptions({
        queryKey: ['all-products-store-options'],
        queryFn: () => getAllProductsStore(slug)
    })
}