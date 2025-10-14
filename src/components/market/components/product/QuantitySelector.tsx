'use client'

import React from 'react'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (change: number) => void
  price: string
  stock: number
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  price,
  stock
}) => {
  return (
    <div className="flex items-center justify-between pt-4 max-md:pt-3">
      <div className="flex items-center gap-4 max-md:gap-3">
        <button
          onClick={() => onQuantityChange(-1)}
          className="w-11 h-11 border border-gray-300 rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition max-md:w-9 max-md:h-9 max-md:text-lg cursor-pointer"
          aria-label="Miqdarı azalt"
          disabled={quantity <= 1}
        >
          &ndash;
        </button>
        <span className="text-[32px] text-center font-medium max-md:text-2xl" aria-live="polite">
          {quantity}
        </span>
        <button
          onClick={() => onQuantityChange(1)}
          className="w-11 h-11 border border-gray-300 rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition max-md:w-9 max-md:h-9 max-md:text-lg cursor-pointer"
          aria-label="Miqdarı artır"
          disabled={stock <= quantity}
        >
          +
        </button>
      </div>
      <p className="text-[24px] font-medium text-gray-900 max-md:text-xl">{price}</p>
    </div>
  )
}

export default QuantitySelector
