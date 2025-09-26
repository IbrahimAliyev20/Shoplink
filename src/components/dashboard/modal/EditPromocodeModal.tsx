// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// /**
//  * Promokod redaktə pəncərəsi (modal)
//  * @param {object} props
//  * @param {boolean} props.isOpen - Modalın açıq olub-olmadığını idarə edir.
//  * @param {Function} props.onClose - Modalı bağlamaq üçün çağırılan funksiya.
//  * @param {object} props.promocode - Redaktə edilən promokodun məlumatları (id, name, discount).
//  * @param {Function} props.onSave - Dəyişiklikləri yadda saxlamaq üçün çağırılan funksiya.
//  */
// function EditPromocodeModal({ isOpen, onClose, promocode, onSave }: any) {
//   const [name, setName] = useState("");
//   const [discount, setDiscount] = useState("");

//   // 'promocode' prop-u dəyişdikdə və ya ilk dəfə gəldikdə
//   // formadakı inputların dəyərlərini yeniləyirik.
//   useEffect(() => {
//     if (promocode) {
//       setName(promocode.name);
//       setDiscount(promocode.discount);
//     }
//   }, [promocode]);

//   // Modal açıq deyilsə, heç bir şey göstərmirik.
//   if (!isOpen) {
//     return null;
//   }

//   // Yadda saxlama funksiyasını çağırır və redaktə edilmiş məlumatları ötürür.
//   const handleSave = () => {
//     onSave({ id: promocode.id, name, discount });
//   };

//   return (
//     // Overlay (arxa fonu tündləşdirən hissə)
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       {/* Modal pəncərəsi */}
//       <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Promokodu tənzimlə</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Promokod adı</label>
//             <Input
//               type="text"
//               placeholder="Promokod adı"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Endirim faizi</label>
//             <Input
//               type="text"
//               placeholder="Endirim faizi"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//               className="w-full"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-6">
//           <Button variant="outline" onClick={onClose}>
//             Ləğv et
//           </Button>
//           <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600 text-white">
//             Yadda saxla
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditPromocodeModal;