'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface ProductActionsProps {
  onBuyNow: () => void
  onAddToCart: () => void
}

const ProductActions: React.FC<ProductActionsProps> = ({
  onBuyNow,
  onAddToCart
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-2 max-md:grid-cols-1 max-md:gap-3 max-md:pt-4">
      <Button
        variant="outline"
        onClick={onBuyNow}
        className="w-full py-5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base max-md:py-3 max-md:text-sm max-md:rounded-lg max-md:order-2"
      >
        İndi al
      </Button>
      <Button
        variant="default"
        onClick={onAddToCart}
        className="w-full py-5 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors text-base max-md:py-3 max-md:text-sm max-md:rounded-lg max-md:order-1"
      >
        Səbətə at
      </Button>
    </div>
  )
}

export default ProductActions
