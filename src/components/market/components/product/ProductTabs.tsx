'use client'

import React from 'react'

interface ProductDetails {
  material: string
  comfort: string
  sole: string
}

interface ProductTabsProps {
  details: ProductDetails
  activeTab: string
  onTabChange: (tab: string) => void
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  details,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="pt-4 max-md:pt-3">
      <div className="w-full flex border-b border-gray-200">
        <button
          onClick={() => onTabChange("details")}
          className={`w-full px-1 pb-2 mr-8 text-base font-medium border-b-2 transition-colors max-md:text-sm max-md:mr-4 max-md:pb-3 ${
            activeTab === "details"
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Məhsul detalları
        </button>
        <button
          onClick={() => onTabChange("delivery")}
          className={`w-full px-1 pb-2 text-base font-medium border-b-2 transition-colors max-md:text-sm max-md:pb-3 ${
            activeTab === "delivery"
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Çatdırılma haqqında
        </button>
      </div>

      <div className="mt-5 text-base text-gray-700 max-md:mt-4 max-md:text-sm">
        {activeTab === "details" && (
          <div className="space-y-3 max-md:space-y-2">
            <div className="flex justify-between max-md:flex-col max-md:gap-1">
              <span className="text-gray-500 max-md:text-xs">Material</span>
              <span className="font-medium text-gray-800 max-md:text-sm">{details.material}</span>
            </div>
            <div className="flex justify-between max-md:flex-col max-md:gap-1">
              <span className="text-gray-500 max-md:text-xs">Daxili rahatlıq</span>
              <span className="font-medium text-gray-800 max-md:text-sm">{details.comfort}</span>
            </div>
            <div className="flex justify-between max-md:flex-col max-md:gap-1">
              <span className="text-gray-500 max-md:text-xs">Altlıq</span>
              <span className="font-medium text-gray-800 max-md:text-sm">{details.sole}</span>
            </div>
          </div>
        )}
        {activeTab === "delivery" && (
          <div className="prose prose-sm max-w-none text-gray-700 max-md:text-xs">
            <ul className="max-md:space-y-1">
              <li>2-3 iş günü ərzində çatdırılma</li>
              <li>100 AZN-dən yuxarı sifarişlərə pulsuz çatdırılma</li>
              <li>14 gün ərzində geri qaytarma imkanı</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
