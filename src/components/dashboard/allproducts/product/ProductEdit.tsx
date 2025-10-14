"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DynamicRichTextEditor } from "@/components/dynamic/DynamicComponents";
import { Trash2 } from "lucide-react";

import { productQueries } from "@/services/Seller-services/product/queries";
import { categoryQueries } from "@/services/Seller-services/category/queries";
import { updateProductMutation } from "@/services/Seller-services/product/mutations";
import { ProductImage } from "@/types/product/productTypes"; 
import { Category } from "@/types/category/categoryTypes"; 

type ProductEditFormValues = {
  name: string;
  sales_price: number;
  discount_price?: number;
  purchase_price: number;
  category_id: string;
  stock: number;
  description: string;
  meta_description?: string;
  meta_keywords?: string;
  new_main_image?: FileList;
  new_images?: FileList;
};

const ProductEdit: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const productId = parseInt(params.id as string);

  // --- MƏNTİQ HİSSƏSİ ---

  // 1. Form idarəetməsi üçün react-hook-form
  const { register, handleSubmit, control, reset, watch, setValue } = useForm<ProductEditFormValues>();

  // 2. Şəkilləri idarə etmək üçün state-lər
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  // 3. API sorğuları
  const { data: product, isLoading } = useQuery({ ...productQueries.show(productId), enabled: !!productId });
  const { data: categories } = useQuery(categoryQueries.all());

  const { mutate: updateProduct, isPending } = useMutation({
    ...updateProductMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      toast.success("Məhsul uğurla yeniləndi!");
      router.push("/dashboard/products");
    },
    onError: (error) => { toast.error("Məhsul yenilənərkən xəta baş verdi: " + error.message); },
  });

  // 4. Formu ilkin data ilə doldurmaq üçün useEffect
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sales_price: parseFloat(product.detail.sales_price),
        discount_price: product.detail.discount_price ? parseFloat(product.detail.discount_price) : undefined,
        purchase_price: parseFloat(product.detail.purchase_price),
        category_id: String(product.category_id),
        stock: product.detail.stock,
        description: product.detail.description,
        meta_description: product.detail.meta_description,
        meta_keywords: product.detail.meta_keywords,
      });
      setMainImagePreview(product.image);
      setExistingImages(product.images);
    }
  }, [product, reset]);

  // 5. Yeni şəkillər üçün önbaxış (preview) yaratmaq
  const watchedNewMainImage = watch("new_main_image");
  const watchedNewImages = watch("new_images");

  useEffect(() => {
    if (watchedNewMainImage && watchedNewMainImage.length > 0) {
      setMainImagePreview(URL.createObjectURL(watchedNewMainImage[0]));
    } else if (product) {
      setMainImagePreview(product.image);
    }
  }, [watchedNewMainImage, product]);

  useEffect(() => {
    if (watchedNewImages && watchedNewImages.length > 0) {
      const urls = Array.from(watchedNewImages).map(file => URL.createObjectURL(file));
      setNewImagePreviews(urls);
      return () => { urls.forEach(url => URL.revokeObjectURL(url)); };
    }
    setNewImagePreviews([]);
  }, [watchedNewImages]);


  // 6. Şəkil silmə məntiqi
  const handleDeleteExistingImage = (id: number) => {
    setDeletedImageIds(prev => [...prev, id]);
    setExistingImages(prev => prev.filter(img => img.id !== id));
  };
  
  const handleRemoveNewImage = (index: number) => {
    const newFiles = new DataTransfer();
    const currentFiles = Array.from(watchedNewImages || []);
    currentFiles.filter((_, i) => i !== index).forEach(file => newFiles.items.add(file));
    setValue("new_images", newFiles.files.length > 0 ? newFiles.files : undefined);
  };

  // 7. Form submit olduqda FormData-nın yığılması
  const onSubmit: SubmitHandler<ProductEditFormValues> = (data) => {
    const formData = new FormData();
    
    formData.append("id", productId.toString());

    // Mətn sahələrini əlavə edirik
    Object.entries(data).forEach(([key, value]) => {
      if (!key.startsWith('new_') && value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Yeni əsas şəkli əlavə edirik
    if (data.new_main_image && data.new_main_image.length > 0) {
      formData.append("image", data.new_main_image[0]);
    }
    
    // Yeni əlavə şəkilləri əlavə edirik
    if (data.new_images && data.new_images.length > 0) {
      Array.from(data.new_images).forEach(file => {
        formData.append(`images[]`, file);
      });
    }

    // Silinəcək şəkillərin ID-lərini əlavə edirik
    if (deletedImageIds.length > 0) {
      deletedImageIds.forEach(id => {
        formData.append('deleted_images[]', String(id));
      });
    }

    updateProduct(formData);
  };

  if (isLoading) return <div>Yüklənir...</div>;

  return (
    <div className="min-w-[260px] w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow">
        <fieldset disabled={isPending}>
          <h2 className="text-lg font-medium mb-4 sm:mb-6 break-words">{product?.name}</h2>
          
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base font-semibold mb-4">Məhsul detalları</h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Məhsulun adı</label>
                    <Input {...register("name")} className="w-full"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Satış qiyməti</label>
                        <Input type="number" step="0.01" {...register("sales_price", { valueAsNumber: true })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Endirim qiyməti</label>
                        <Input type="number" step="0.01" {...register("discount_price", { valueAsNumber: true })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Alış qiyməti</label>
                        <Input type="number" step="0.01" {...register("purchase_price", { valueAsNumber: true })} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Kateqoriya</label>
                        <Controller name="category_id" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Kateqoriya seçin" /></SelectTrigger>
                                <SelectContent>
                                    {categories?.map((category: Category) => (
                                        <SelectItem value={String(category.id)} key={category.id}>{category.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Stok sayı</label>
                        <Input type="number" {...register("stock", { valueAsNumber: true })} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Məhsulun təsviri</label>
                    <Controller name="description" control={control} render={({ field }) => (
                        <DynamicRichTextEditor value={field.value} onChange={field.onChange} />
                    )}/>
                </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Məhsulun şəkilləri</h3>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Ön şəkil</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                  {mainImagePreview && <Image src={mainImagePreview} alt="Əsas şəkil" width={128} height={128} className="object-cover w-32 h-32 rounded-xl border"/>}
                  <label htmlFor="main-image-upload" className="w-full bg-[#FBFDFF] border rounded-lg p-4 text-center cursor-pointer">
                      <Image src="/images/createimage.svg" alt="Upload" width={48} height={48} className="mx-auto mb-4" />
                      <p className="text-sm font-medium text-[#FF13F0]">+ Şəkil dəyişdir</p>
                  </label>
                  <input id="main-image-upload" type="file" className="hidden" {...register("new_main_image")} />
              </div>
            </div>

            <label className="block mb-2 font-medium">Digər şəkillər</label>
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                {/* Mövcud şəkillər */}
                {existingImages.map((image) => (
                  <div key={image.id} className="relative group w-32 h-32">
                    <Image src={image.image} alt="Product image" width={128} height={128} className="object-cover w-full h-full rounded-xl"/>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-start justify-end p-1.5">
                      <button type="button" onClick={() => handleDeleteExistingImage(image.id)} className="p-1.5 bg-white/80 rounded-md">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
                {/* Yeni əlavə olunan şəkillər */}
                {newImagePreviews.map((preview, index) => (
                     <div key={preview} className="relative group w-32 h-32">
                        <Image src={preview} alt="New preview" width={128} height={128} className="object-cover w-full h-full rounded-xl"/>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-start justify-end p-1.5">
                          <button type="button" onClick={() => handleRemoveNewImage(index)} className="p-1.5 bg-white/80 rounded-md">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                    </div>
                ))}
                <label htmlFor="new-images-upload" className="w-32 h-32 flex flex-col items-center justify-center bg-gray-50 rounded-lg border cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center mb-2"><span className="text-lg font-medium">+</span></div>
                    <span className="text-sm font-medium">Şəkil əlavə et</span>
                </label>
                <input id="new-images-upload" type="file" multiple className="hidden" {...register("new_images")} />
            </div>
          </div>

          <div className="flex justify-end mt-6 sm:mt-10">
            <Button type="submit" disabled={isPending} className="bg-[#E23359] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E23359]/90 disabled:opacity-50">
              {isPending ? "Yenilənir..." : "Dəyişiklikləri yadda saxla"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ProductEdit;