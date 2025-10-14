'use client'

import React from 'react'
import Image from 'next/image'
import { CartItem as CartItemType } from '../../data/cart'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (id: number, change: number) => void
  onRemove: (id: number) => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove
}) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-[#F3F2F8] max-md:p-3 max-md:rounded-md">
      <div className="flex justify-between items-center w-full max-md:flex-col max-md:items-start max-md:gap-3">
        <div className="flex items-center gap-4 max-md:w-full max-md:gap-3">
          <div className="flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-lg object-cover w-24 h-24 max-md:w-20 max-md:h-20 max-md:rounded-md"
            />
          </div>

          <div className="flex flex-col max-md:flex-1">
            <h3 className="text-[20px] font-medium text-gray-800 mb-3 max-md:text-lg max-md:mb-2">
              {item.name}
            </h3>
            <div className="flex items-center gap-3 max-md:gap-2">
            <button
                onClick={() => onQuantityChange(item.id, -1)}
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors max-md:w-7 max-md:h-7 max-md:text-sm cursor-pointer"
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="w-8 text-center font-medium text-lg max-md:w-6 max-md:text-base">
                {item.quantity}
              </span>
          
              <button
                onClick={() => onQuantityChange(item.id, 1)}
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors max-md:w-7 max-md:h-7 max-md:text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between h-full min-h-[100px] max-md:flex-row max-md:w-full max-md:items-center max-md:min-h-0">
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors max-md:order-2"
            aria-label="Məhsulu sil"
          >
            <svg
              className="w-6 h-6 max-md:w-5 max-md:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          
          <p className="text-[20px] font-medium text-gray-900 max-md:text-lg max-md:order-1">
            {item.price} AZN
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem