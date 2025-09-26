
import { get, post } from "@/lib/api";
import { ApiResponse } from "@/types";
import {  Product } from "@/types/product/productTypes";


const getAllProducts = async () => {
    const response = await get<{ data: Product[] }>("user/products"); 
    return response.data;
};

const getShowProduct = async (id: number) => {
    const response = await get<ApiResponse<Product>>(`user/product/show/${id}`);
    return response.data;
};

const createProduct = async (formData: FormData) => {
    const response = await post<ApiResponse<Product>>("user/product-store", formData);
    return response.data;
};

const updateProduct = async (formData: FormData) => {
    const productId = formData.get('id');
    if (!productId) {
        throw new Error("Product ID is missing in FormData for update.");
    }
    const response = await post<ApiResponse<Product>>(`user/product/update/${productId}`, formData);
    return response.data;
};

const deleteProduct = async (id: number) => {
    const response = await post<ApiResponse<null>>(`user/product/delete/${id}`);
    return response;
};



export { getAllProducts, getShowProduct, createProduct, updateProduct, deleteProduct };