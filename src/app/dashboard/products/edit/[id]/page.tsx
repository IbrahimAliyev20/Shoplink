"use client";
import { DynamicRichTextEditor } from "@/components/dynamic/DynamicComponents";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {  Trash2, RefreshCcw } from "lucide-react";
import { productQueries } from "@/services/Seller-services/product/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryQueries } from "@/services/Seller-services/category/queries";
import { useParams, useRouter } from "next/navigation";
import { updateProductMutation } from "@/services/Seller-services/product/mutations";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UploadedImage {
  id: number;
  url: string;
  file: File;
}

const ProductEdit: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const productId = parseInt(params.id as string);

  const [formData, setFormData] = useState({
    name: "",
    sales_price: "",
    discount_price: "",
    purchase_price: "",
    stock: 0,
    category_id: 0,
    description: "",
  });
  const [otherImages, setOtherImages] = useState<UploadedImage[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);

  const { data: product, isLoading } = useQuery(productQueries.show(productId));
  const { data: categories } = useQuery(categoryQueries.all());

  const { mutateAsync: updateProduct, isPending } = useMutation({
    ...updateProductMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      toast.success("Məhsul uğurla yeniləndi!");
      router.push("/dashboard/products");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Məhsul yenilənərkən xəta baş verdi.");
    },
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        sales_price: product.detail.sales_price || "0",
        discount_price: product.detail.discount_price || "0",
        purchase_price: product.detail.purchase_price || "0",
        stock: product.detail.stock || 0,
        category_id: product.category_id || 0,
        description: product.detail.description || "",
      });
    }
  }, [product]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | number) => {
    // Ensure price fields default to 0 when empty
    let processedValue = value;
    if (field === 'sales_price' || field === 'discount_price' || field === 'purchase_price') {
      processedValue = value === "" || value === null || value === undefined ? "0" : value;
    }
    
    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: UploadedImage[] = Array.from(files).map((file) => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        file: file,
      }));
      setOtherImages((prev) => [...prev, ...newImages]);
    }
  };
 
  const handleDeleteImage = (id: number) => {
    setOtherImages((prev) => prev.filter((image) => image.id !== id));
  };
 

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerMainImageInput = () => {
    mainImageInputRef.current?.click();
  };

  const handleMainImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Ensure price fields are never null/undefined
    const processedData = {
      sales_price: formData.sales_price || "0",
      discount_price: formData.discount_price || "0",
      purchase_price: formData.purchase_price || "0",
      stock: formData.stock || 0,
    };

    formDataToSend.append("id", productId.toString());
    formDataToSend.append("name", formData.name);
    formDataToSend.append("sales_price", processedData.sales_price);
    formDataToSend.append("discount_price", processedData.discount_price);
    formDataToSend.append("purchase_price", processedData.purchase_price);
    formDataToSend.append("stock", processedData.stock.toString());
    formDataToSend.append("category_id", formData.category_id.toString());
    formDataToSend.append("description", formData.description);

    if (mainImage) {
      formDataToSend.append("image", mainImage);
    }

    otherImages.forEach((image) => {
      formDataToSend.append(`images[]`, image.file);
    });

    await updateProduct(formDataToSend);
  };

  if (isLoading) {
    return <div>Yüklənir...</div>;
  }

  return (
    <div className="min-w-[260px] w-full mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow"
        style={{ fontSize: '16px' }} // Prevents zoom on iOS
      >
        <h2 className="text-lg font-medium mb-4 sm:mb-6 break-words"> {product?.name}</h2>
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base font-semibold mb-4">Məhsul detalları</h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Məhsulun adı
              </label>
              <Input
                className="w-full border border-[#F3F2F8] rounded px-3 py-3 sm:py-2 text-base min-h-[44px] sm:min-h-auto"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Satış qiyməti
                </label>
                <div className="relative">
                  <Input
                    placeholder="7000"
                    className="w-full rounded-sm border border-[#F3F2F8] py-3 sm:py-5.5 px-4 text-base min-h-[44px] sm:min-h-auto"
                    value={formData.sales_price}
                    onChange={(e) =>
                      handleInputChange("sales_price", e.target.value || "0")
                    }
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                    AZN
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Endirim qiyməti
                </label>
                <div className="relative">
                  <Input
                    placeholder="0"
                    className="w-full rounded-sm border border-[#F3F2F8] py-3 sm:py-5.5 px-4 text-base min-h-[44px] sm:min-h-auto"
                    value={formData.discount_price}
                    onChange={(e) =>
                      handleInputChange("discount_price", e.target.value || "0")
                    }
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">
                    AZN
                  </span>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium mb-2">
                  Alış qiyməti
                </label>
                <div className="relative">
                  <Input
                    placeholder="10.000"
                    className="w-full rounded-sm border border-[#F3F2F8] py-3 sm:py-5.5 px-4 text-base min-h-[44px] sm:min-h-auto"
                    value={formData.purchase_price}
                    onChange={(e) =>
                      handleInputChange("purchase_price", e.target.value || "0")
                    }
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                    AZN
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kateqoriya
                </label>
                <Select
                  value={formData.category_id > 0 ? String(formData.category_id) : undefined}
                  onValueChange={(value) =>
                    handleInputChange("category_id", parseInt(value))
                  }
                  >
                    <SelectTrigger className="h-11 sm:h-10 w-full min-h-[44px] sm:min-h-auto">
                      <SelectValue placeholder="Kateqoriya seçin" /> 
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem value={String(category.id)} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Stok sayı
                </label>
                <Input
                  placeholder="200"
                  className="w-full border border-[#F3F2F8] px-3 py-3 sm:py-5.5 rounded-md text-base min-h-[44px] sm:min-h-auto"
                  value={formData.stock}
                  onChange={(e) =>
                    handleInputChange("stock", parseInt(e.target.value) || 0)
                  }
                  type="number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Məhsulun təsviri
              </label>
              <DynamicRichTextEditor
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4">Məhsulun şəkilləri</h3>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">
              Ön şəkil
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {product?.image && (
                <Image
                  src={product.image}
                  alt="Product main image"
                  width={128}
                  height={128}
                  className="object-cover w-24 h-24 sm:w-32 sm:h-32 rounded-xl border border-[#F3F2F8] flex-shrink-0"
                />
              )}
              <div className="w-full bg-[#FBFDFF] border border-gray-100 rounded-lg p-4 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors" onClick={triggerMainImageInput}>
                <Image src="/images/createimage.svg" alt="Upload icon" width={48} height={48} className="mb-4" />
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Siz .jpeg, .jpg, .png, .webp formatında faylları maksimum 7MB ölçüyə qədər yükləyə bilərsiniz.
                </p>
                <p className="text-sm font-medium text-[#FF13F0]">
                  + Şəkil əlavə et
                </p>
              </div>
            </div>
          </div>

          <label className="block mb-2 font-medium">Digər şəkillər</label>
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            {product?.images?.map((image, index) => (
              <div key={index} className="relative group w-24 h-24 sm:w-32 sm:h-32">
                <Image
                  src={image.image}
                  alt="Product image"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full rounded-xl border border-[#F3F2F8]"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-start justify-end gap-1 sm:gap-2 p-1 sm:p-2">
                  <button
                    type="button"
                    onClick={() => toast.info(`Dəyişdir: ${image.id}`)}
                    className="p-1.5 sm:p-2 bg-black/80 rounded-full hover:bg-black/90"
                  >
                    <RefreshCcw className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.error(`Sil: ${image.id}`)}
                    className="p-1.5 sm:p-2 bg-black/80 rounded-full hover:bg-black/90"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}

            {otherImages.map((image) => (
              <div key={image.id} className="relative group w-24 h-24 sm:w-32 sm:h-32">
                <Image
                  src={image.url}
                  alt="New product image"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full rounded-xl border border-[#F3F2F8]"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-start justify-end p-1 sm:p-1.5">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-1 sm:p-1.5 bg-white/80 rounded-md hover:bg-white"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={triggerFileInput}
              className="w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-[#F3F2F8] transition-colors text-gray-600 cursor-pointer"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-[#F3F2F8] flex items-center justify-center mb-1 sm:mb-2">
                <span className="text-sm sm:text-lg font-medium text-gray-600">+</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Şəkil əlavə et</span>
            </button>

          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />

          <Input
            type="file"
            ref={mainImageInputRef}
            onChange={handleMainImageSelect}
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />
        </div>
      </div>

        <div className="flex justify-end mt-6 sm:mt-10">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#E23359] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#E23359]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
          >
            {isPending ? "Yenilənir..." : "Dəyişiklikləri yadda saxla"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;