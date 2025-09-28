export interface StoreForUsers {
    id: number;
    name: string;
    language: string;
    currency: string;
    logo: string;  
    thumb_logo: string;
    background_image: string;
    thumb_background_image: string;
}

export interface CategoryStore {
    id: number;
    name: string;
    slug: string;
    description: string;
    order: string;
    meta_description: string;
    meta_keywords: string;
}

export interface ProductStoreCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
    thumb_image: string;
    category_id: number;
    category_name: string;
    detail: ProductStoreCategoryDetail;
    images: ProductStoreCategoryImage[];
}
export interface ProductStoreCategoryImage {
    id: number;
    image: string;
    thumb_image: string;
}

export interface ProductStoreCategoryDetail {
    sales_price: string;
    discount_price: string;
    purchase_price: string;
    description: string;
    meta_description: string;
    meta_keywords: string;
    stock: number;
}
