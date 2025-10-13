"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/services/Seller-services/category/queries";
import { Edit } from "lucide-react";
import Link from "next/link";

function PreviewCategory() {
  const { id } = useParams();
  const { data: category } = useQuery({
    ...categoryQueries.show(Number(id)),
    enabled: !!id,
  });
  return (
    <div className="min-h-screen bg-[#FAFAFB] p-0 md:p-6">
      <h1 className="text-[28px] font-medium text-black mb-6">{category?.name}</h1>
      
      <div className="bg-white rounded-2xl border border-[#F3F2F8] mb-3 p-8 ">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-[24px] font-medium text-black">
            Əsas məlumatlar
          </h2>
          <Link
            href={`/dashboard/categorys/category/edit/${id}`}
            className="text-[#666666] hover:text-black transition-colors"
          >
            <Edit className="h-4 w-4" />
            </Link>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="text-[17px] text-[#666666]">Kateqoriya adı</div>
            <div className="text-[17px] text-[#666666]">Kateqoriya təsviri</div>
            <div className="text-[17px] text-[#666666]">Məhsul sıralanması</div>
          </div>
          <div className="space-y-5">
            <div className="text-[17px] text-black font-medium">
              {category?.name}
            </div>
            <div className="text-[17px] text-black font-medium">
              {category?.description}
            </div>
            <div className="text-[17px] text-black font-medium">
              {category?.order}
            </div>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-2xl border border-[#F3F2F8] p-8">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-[28px] font-medium text-black">SEO</h2>
          <Link
            href={`/dashboard/categorys/category/edit/${id}`}
            className="text-[#666666] hover:text-black transition-colors"
          >
          <Edit className="h-4 w-4" />
          </Link>
        </div>

        <div className="text-[16px] text-[#666666] mb-8">
          Sayt başlığını SEO üçün optimallaşdırın
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="text-[17px] text-[#666666]">Kateqoriya adı</div>
            <div className="text-[17px] text-[#666666]">Kateqoriya təsviri</div>
            <div className="text-[17px] text-[#666666]">Açar sözlər</div>
          </div>
          <div className="space-y-5">
            <div className="text-[17px] text-black font-medium">
              {category?.name}
            </div>
            <div className="text-[17px] text-black font-medium">
              {category?.meta_description}
            </div>
            <div className="text-[17px] text-black font-medium">
              {category?.meta_title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCategory;
