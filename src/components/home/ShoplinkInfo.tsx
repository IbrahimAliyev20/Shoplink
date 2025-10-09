"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAboutOptions } from '@/services/Home/About/queries';

const ShoplinkInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
              {/* Desktop: Full text always visible */}
              <div className="hidden lg:block">
                <p dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
              </div>
              
              {/* Mobile: Text with line clamp and expand/collapse */}
              <div className="lg:hidden">
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? '' : 'line-clamp-7'
                  }`}
                >
                  <p dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
                </div>
                
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 mt-2"
                >
                  {isExpanded ? 'Daha az göstər' : 'Daha çox'}
                </button>
              </div>
            </div>
          </div>

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