'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProductStoreCategoryOptions } from '@/services/User-services/StoreForUsers/queries';
import { ProductStoreCategory } from '@/types/storeforusers/types';
import ProductCard from '../shared/ProoductCard';

interface OtherProductsInCategoryProps {
  currentProduct: ProductStoreCategory;
}

const OtherProductsInCategory: React.FC<OtherProductsInCategoryProps> = ({ currentProduct }) => {
  const params = useParams();
  const marketSlug = params.market as string;

  const { data: categoryProducts, isLoading } = useQuery(
    getProductStoreCategoryOptions(marketSlug, currentProduct.category_name)
  );

  const otherProducts = categoryProducts?.filter(product => product.id !== currentProduct.id) || [];

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Oxşar məhsullar
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-square mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!otherProducts.length) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Oxşar məhsullar
        </h2>
        <div className="text-center py-8 text-gray-500">
          Bu kateqoriyada başqa məhsul tapılmadı.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Oxşar məhsullar
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {otherProducts.slice(0, 10).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            storeSlug={marketSlug} 
          />
        ))}
      </div>
    </div>
  );
};

export default OtherProductsInCategory;
