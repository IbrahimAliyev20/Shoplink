'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductSingleOptions } from '@/services/User-services/StoreForUsers/queries';
import {
  ProductImageGallery,
  
  QuantitySelector,
  ProductActions,
  ProductTabs,
} from './product';
import OtherProductsInCategory from './product/OtherProductsInCategory';

function SingleProductPage({ slug }: { slug: string }) {
  const { data: product, isLoading, isError } = useQuery(getProductSingleOptions(slug));

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return <div className="text-center py-20">Məhsul yüklənir...</div>;
  }
  if (isError || !product) {
    return <div className="text-center py-20 text-red-500">Məhsul tapılmadı və ya xəta baş verdi.</div>;
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const imageUrls = product.images.map(img => img.image);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 max-md:py-6">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-md:gap-6">
          <ProductImageGallery
            images={imageUrls}
            currentImageIndex={currentImageIndex}
            onImageChange={setCurrentImageIndex}
            productName={product.name}
          />

          <div className="flex flex-col justify-between max-md:space-y-6">
            <h1 className="text-[24px] font-medium text-gray-900 leading-snug max-md:text-xl max-md:leading-tight">
              {product.name}
            </h1>

       
            
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              price={product.detail.discount_price || product.detail.sales_price}
            />

            <ProductActions
              product={product}
              quantity={quantity}
            />
            
            <ProductTabs
              description={product.detail.description}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
        
        <div className="max-md:mt-12">
          <OtherProductsInCategory currentProduct={product} />
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;