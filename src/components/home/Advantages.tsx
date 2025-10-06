"use client"
import React from "react";
import Image from "next/image"; // Şəkilləri optimallaşdırmaq üçün Next.js Image komponentini istifadə edə bilərsiniz
import { useQuery } from "@tanstack/react-query";
import { getAdvantagesOptions } from "@/services/Home/Advantages/queries";

const Advantages = () => {
  const { data, isLoading, isError, error } = useQuery(getAdvantagesOptions());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    
      <div >
        {/* Başlıq və Açıqlama */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl  md:text-[40px] font-medium text-gray-900 mb-4">
            Üstünlüklərimiz nələrdir?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Shoplink olaraq biz satıcıların işini asanlaşdıran, satış imkanlarını genişləndirən və etibarlı e-ticarət mühiti yaradırıq. Platformamız satıcılara məhsullarını rahat idarə etmək, stoklarını izləmək və satışlarını optimallaşdırmaq imkanı verir. Bizimlə e-ticarətdə bütün məhdudiyyətlər aradan qalxır və biznesiniz üçün yeni imkanlar açılır.
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {data?.map((item , index) => (
              <div key={index} className="rounded-3xl flex flex-col bg-[#FBFDFF] p-6 border-1 border-[#E5E5EA]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              <Image src={item.image} alt={item.title} width={300} height={200} />
            </div>
          ))} 

        </div>
      </div>
  );
};

export default Advantages;