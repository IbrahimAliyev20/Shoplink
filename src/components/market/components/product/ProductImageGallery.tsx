'use client'

import React from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: string[]
  currentImageIndex: number
  onImageChange: (index: number) => void
  productName: string
  thumbImages: string[]
}

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  currentImageIndex,
  onImageChange,
  productName,
  thumbImages
}) => {
  return (
    <div className="space-y-5 max-md:space-y-4">
      {/* Main Image */}
      <div className="w-[620px] h-[500px] border border-gray-200 rounded-xl aspect-square flex items-center justify-center p-4 max-md:w-full max-md:h-80 max-md:p-3 max-md:rounded-lg">
        <Image
          src={images[currentImageIndex]}
          alt={`${productName} - Görünüş ${currentImageIndex + 1} / ${images.length}`}
          width={600}
          height={600}
          className="w-full h-full object-contain"
          priority={currentImageIndex === 0}
          sizes="(max-width: 768px) 100vw, 620px"
          quality={90}
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex items-center gap-4 max-md:gap-2">
        <button
          onClick={() => onImageChange(Math.max(0, currentImageIndex - 1))}
          className="flex-shrink-0 w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-50 max-md:w-7 max-md:h-7"
          disabled={currentImageIndex === 0}
          aria-label="Əvvəlki şəkil"
        >
          <ChevronLeftIcon />
        </button>
        
        <div className="flex-grow grid grid-cols-5 gap-3 max-md:grid-cols-4 max-md:gap-2">
          {thumbImages.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageChange(index)}
              className={`aspect-square rounded-md border-2 overflow-hidden transition max-md:rounded-sm ${
                currentImageIndex === index
                  ? 'border-pink-500'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              aria-label={`${productName} görünüş ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} kiçik şəkil ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
                loading="lazy"
                sizes="100px"
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => onImageChange(Math.min(images.length - 1, currentImageIndex + 1))}
          className="flex-shrink-0 w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-50 max-md:w-7 max-md:h-7"
          disabled={currentImageIndex === images.length - 1}
          aria-label="Növbəti şəkil"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

export default ProductImageGallery
