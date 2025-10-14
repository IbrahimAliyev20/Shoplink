"use client";
import { useParams } from 'next/navigation';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { productQueries } from '@/services/Seller-services/product/queries';
import { Edit } from 'lucide-react';
import Link from 'next/link';

function PreviewProduct() {
    const { id } = useParams();
    const { data: product } = useQuery({
        ...productQueries.show(Number(id)),
        enabled: !!id,
    });
    return (
        <div className="min-h-screen bg-[#FAFAFB] p-0 md:p-6 space-y-6">
          <h1 className="text-[28px] font-medium text-black">{product?.name}</h1>
          <div className="bg-white rounded-[12px] shadow-sm mb-6 p-8">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-[28px] font-medium text-black">
                Əsas məlumatlar
              </h2>
              <Link
                href={`/dashboard/products/edit/${id}`}
                className="text-[#666666] hover:text-black transition-colors"
              >
                <Edit className="h-4 w-4" />
                </Link>
            </div>
    
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="text-[17px] text-[#666666]">Məhsul adı</div>
                <div className="text-[17px] text-[#666666]">Məhsul satış qiyməti</div>
                <div className="text-[17px] text-[#666666]">Məhsul endirim qiyməti</div>
                <div className="text-[17px] text-[#666666]">Məhsul alış qiyməti</div>
              </div>
              <div className="space-y-8">
                <div className="text-[17px] text-black font-medium">
                  {product?.name}
                </div>
                <div className="text-[17px] text-black font-medium">
                  {product?.detail?.sales_price}
                </div>
                <div className="text-[17px] text-black font-medium">
                  {product?.detail?.discount_price}
                </div>
                <div className="text-[17px] text-black font-medium">
                  {product?.detail?.purchase_price}
                </div>
              </div>
            </div>
          </div>


           {/* Məhsul detalları */}
           <div className="bg-white rounded-[12px] shadow-sm p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-[28px] font-medium text-black">Məhsul detalları</h2>
              <Link
                href={`/dashboard/products/edit/${id}`}
                className="text-[#666666] hover:text-black transition-colors"
              >
              <Edit className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="text-[17px] text-[#666666]">Kateqoriya</div>
                <div className="text-[17px] text-[#666666]">Stok sayı</div>
                <div className="text-[17px] text-[#666666]">Məhsulun təsviri</div>
              </div>
              <div className="space-y-8">
                <div className="text-[17px] text-black font-medium">
                  {product?.category_name}
                </div>
                <div className="text-[17px] text-black font-medium">
                  {product?.detail?.stock}
                </div>
                <div className="text-[17px] text-black font-medium">
                    <p dangerouslySetInnerHTML={{ __html: product?.detail?.description || '' }} />
                </div>
              </div>
            </div>
          </div>
          
          
    
          {/* SEO */}
          <div className="bg-white rounded-[12px] shadow-sm p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-[28px] font-medium text-black">SEO</h2>
              <Link
                href={`/dashboard/products/edit/${id}`}
                className="text-[#666666] hover:text-black transition-colors"
              >
              <Edit className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="text-[17px] text-[#666666]">Məhsul adı</div>
                <div className="text-[17px] text-[#666666]">Səhifə başlığı</div>
                <div className="text-[17px] text-[#666666]">Səhifə təsviri</div>
              </div>
              <div className="space-y-8">
                <div className="text-[17px] text-black font-medium">
                  {product?.name}
                </div>
                <div className="text-[17px] text-black font-medium">
                  {product?.detail?.meta_keywords}
                </div>
                <div className="text-[17px] text-black font-medium">
                  {product?.detail?.meta_description}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default PreviewProduct