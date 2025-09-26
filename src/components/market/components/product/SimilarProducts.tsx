'use client'

import React from 'react'
import { allProducts } from '../../data/product'
import ProductCard from '../shared/ProoductCard'

const SimilarProducts: React.FC = () => {
  return (
    <div className="mt-20 max-md:mt-12">
      <div className="flex items-center justify-between mb-6 max-md:mb-4">
        <h2 className="text-xl font-semibold text-gray-900 max-md:text-lg">Oxşar məhsullar</h2>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors max-md:text-xs max-md:gap-1">
          <span>Hamısına bax</span>
          <svg className="w-4 h-4 max-md:w-3 max-md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-md:grid-cols-2 max-md:gap-3">
        {allProducts.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default SimilarProducts

