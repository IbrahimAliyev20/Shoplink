"use client"
import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAboutOptions } from '@/services/Home/About/queries';

const ShoplinkInfo = () => {
  const { data, isLoading, isError, error } = useQuery(getAboutOptions());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section  >
      <div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-3xl sm:text-[40px] font-medium text-gray-900 mb-6 lg:mb-8">
              {data?.title}
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            <p dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
            </div>
          </div>

          {/* Right Content - Pricing Card */}
          <div className="lg:pl-8">
          <Image 
          src={data?.image || ''} 
          alt="Shoplink Info" 
          width={500} 
          height={500} 
          className="w-full h-auto" 
        />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoplinkInfo;