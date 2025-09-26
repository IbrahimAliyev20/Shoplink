'use client'

import React from 'react'
import Image from 'next/image'

interface Color {
  id: string
  name: string
  image: string
}

interface ColorSelectorProps {
  colors: Color[]
  selectedColor: string
  onColorSelect: (colorId: string) => void
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect
}) => {
  return (
    <div>
      <h3 className="text-[20px] font-medium text-gray-800 mb-3 max-md:text-lg max-md:mb-2">Rənglər</h3>
      <div className="flex gap-3 max-md:gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorSelect(color.id)}
            className={`w-[90px] h-[90px] rounded-md border-2 p-1 overflow-hidden transition max-md:w-16 max-md:h-16 max-md:rounded-sm ${
              selectedColor === color.id
                ? 'border-pink-500'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <Image
              src={color.image}
              alt={color.name}
              width={90}
              height={90}
              className="w-full h-full object-cover rounded-sm max-md:rounded-xs"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector
