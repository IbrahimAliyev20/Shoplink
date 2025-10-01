
export interface ProductImage {
    id: number;
    image: string; 
    thumb_image: string; 
  }
  
  export interface ProductDetail {
    sales_price: string;
    discount_price: string | null;
    purchase_price: number;
    description: string;
    meta_description: string;
    meta_keywords: string;
    stock: number;
  }
  
  export interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    thumb_image: string;
    category_id: number;
    category_name: string;
    detail: ProductDetail;
    images: ProductImage[];
  }