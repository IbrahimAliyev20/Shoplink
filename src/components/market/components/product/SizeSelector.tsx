// 'use client'

// import React from 'react'

// interface SizeSelectorProps {
//   sizes: string[]
//   selectedSize: string
//   onSizeSelect: (size: string) => void
// }

// const SizeSelector: React.FC<SizeSelectorProps> = ({
//   sizes,
//   selectedSize,
//   onSizeSelect
// }) => {
//   return (
//     <div>
//       <h3 className="text-[20px] font-medium text-gray-800 mb-3 max-md:text-lg max-md:mb-2">Ölçülər</h3>
//       <div className="flex flex-wrap gap-3 max-md:gap-2">
//         {sizes.map((size) => (
//           <button
//             key={size}
//             onClick={() => onSizeSelect(size)}
//             className={`w-16 h-17 border rounded-md text-sm font-medium transition-colors max-md:w-12 max-md:h-12 max-md:text-xs max-md:rounded-sm ${
//               selectedSize === size
//                 ? 'border-black bg-white text-black'
//                 : 'border-gray-200 text-gray-700 hover:border-gray-400'
//             }`}
//           >
//             {size}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default SizeSelector
