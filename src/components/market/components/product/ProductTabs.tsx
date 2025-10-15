
'use client';

import React from 'react';

interface ProductTabsProps {
  description: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  description,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="pt-4 max-md:pt-3">
      <div className="w-full flex border-b border-[#F3F2F8]">
        <button
          onClick={() => onTabChange("details")}
          className={`w-full px-1 pb-2 mr-8 text-base font-medium border-b-2 transition-colors max-md:text-sm max-md:mr-4 max-md:pb-3 ${
            activeTab === "details" ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Məhsul detalları
        </button>
        <button
          onClick={() => onTabChange("delivery")}
          className={`w-full px-1 pb-2 text-base font-medium border-b-2 transition-colors max-md:text-sm max-md:pb-3 ${
            activeTab === "delivery" ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Çatdırılma haqqında
        </button>
      </div>

      <div className="mt-5 text-base text-gray-700 max-md:mt-4 max-md:text-sm">
        {activeTab === "details" && (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        )}
        {activeTab === "delivery" && (
          <div className="prose prose-sm max-w-none text-gray-700 max-md:text-xs">
            <ul className="max-md:space-y-1 list-disc list-inside">
              <li>2-3 iş günü ərzində çatdırılma</li>
              <li>100 AZN-dən yuxarı sifarişlərə pulsuz çatdırılma</li>
              <li>14 gün ərzində geri qaytarma imkanı</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;