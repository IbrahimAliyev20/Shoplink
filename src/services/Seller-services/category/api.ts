
import { get, post } from "@/lib/api";
import { ApiResponse } from "@/types";
import {  Category } from "@/types/category/categoryTypes";


const getCategoryProducts = async () => {
    const response = await get<{ data: Category[] }>("user/categories"); 
    console.log(response.data);
    return response.data;
};

const getShowCategory = async (id: number) => {
    const response = await get<ApiResponse<Category>>(`user/category/show/${id}`);
    return response.data;
};

const createCategory = async (formData: FormData) => {
    const response = await post<ApiResponse<Category>>("user/category-store", formData);
    return response.data;
};

const updateCategory = async (formData: FormData) => {
    const productId = formData.get('id');
    if (!productId) {
        throw new Error("Category ID is missing in FormData for update.");
    }
    const response = await post<ApiResponse<Category>>(`user/category/update/${productId}`, formData);
    return response.data;
};

const deleteCategory = async (id: number) => {
    const response = await post<ApiResponse<null>>(`user/category/delete/${id}`);
    return response;
};



export { getCategoryProducts, getShowCategory, createCategory, updateCategory, deleteCategory };