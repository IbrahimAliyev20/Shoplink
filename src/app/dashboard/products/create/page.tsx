import React from 'react' 
import ProductCreatePage from '@/components/dashboard/allproducts/product/ProductCreate'
import { CREATE_PRODUCT_META } from '@/utils/MetaTagsData';


import { Metadata } from 'next';
export const metadata: Metadata = {
  title: CREATE_PRODUCT_META.title,
  description: CREATE_PRODUCT_META.meta_description,
  keywords: CREATE_PRODUCT_META.meta_keywords,
};

function ProductCreate() {
  return (
    <div>
      <ProductCreatePage />
    </div>
  )
}

export default ProductCreate