'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Product } from '@/types/product/productTypes'

interface ProductActionsProps {
  product: Product
  quantity: number
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  quantity
}) => {
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} səbətə əlavə edildi`, {
      description: `${quantity} ədəd məhsul səbətə əlavə edildi`,
      duration: 3000,
    })
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    // Navigate to basket page with current market slug
    const currentPath = window.location.pathname
    const marketSlug = currentPath.split('/')[1]
    router.push(`/${marketSlug}/basket`)
  }

  return (
    <div className="grid grid-cols-2 gap-4 pt-2 max-md:grid-cols-1 max-md:gap-3 max-md:pt-4">
      <Button
        variant="outline"
        onClick={handleBuyNow}
        className="w-full h-12 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base max-md:py-3 max-md:text-sm max-md:rounded-lg max-md:order-2"
      >
        İndi al
      </Button>
      <Button
        variant="default"
        onClick={handleAddToCart}
        className="w-full h-12 bg-[#E23359] text-white rounded-xl font-semibold hover:bg-[#E23359]/90 transition-colors text-base max-md:py-3 max-md:text-sm max-md:rounded-lg max-md:order-1"
      >
        Səbətə at
      </Button>
    </div>
  )
}

export default ProductActions
