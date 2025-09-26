'use client'

import React, { useState } from 'react'
import { mockProduct } from '../data/product'
import {
  ProductImageGallery,
  ColorSelector,
  SizeSelector,
  QuantitySelector,
  ProductActions,
  ProductTabs,
  SimilarProducts
} from './product'

function SingleProductPage() {
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0].id)
  const [selectedSize, setSelectedSize] = useState("38") 
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }
  
  const handleBuyNow = () => console.log("Indi al:", { selectedColor, selectedSize, quantity })
  const handleAddToCart = () => console.log("Səbətə at:", { selectedColor, selectedSize, quantity })

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 max-md:py-6">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-md:gap-6">
          {/* Product Image Gallery */}
          <ProductImageGallery
            images={mockProduct.images}
            currentImageIndex={currentImageIndex}
            onImageChange={setCurrentImageIndex}
            productName={mockProduct.name}
          />

          {/* Product Information */}
          <div className="flex flex-col justify-between max-md:space-y-6">
            <h1 className="text-[24px] font-medium text-gray-900 leading-snug max-md:text-xl max-md:leading-tight">
              {mockProduct.name}
            </h1>

            {/* Color Selection */}
            <ColorSelector
              colors={mockProduct.colors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            {/* Size Selection */}
            <SizeSelector
              sizes={mockProduct.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />

            {/* Quantity and Price */}
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              price={mockProduct.price}
            />

            {/* Action Buttons */}
            <ProductActions
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
            />

            {/* Product Information Tabs */}
            <ProductTabs
              details={mockProduct.details}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="max-md:mt-12">
          <SimilarProducts />
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage;