"use client";

import React, { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/shared/editor";
import { X, Plus } from "lucide-react";

import { createProductMutation } from "@/services/Seller-services/product/mutations";
import { categoryQueries } from "@/services/Seller-services/category/queries";
import { productQueries } from "@/services/Seller-services/product/queries";
import { useRouter } from "next/navigation";
import CreateCategoryModal from "@/components/dashboard/modal/CreateCategoryModal";

type ProductFormValues = {
  name: string;
  description: string;
  sales_price: number;
  discount_price?: number;
  purchase_price: number;
  category_id: string;
  stock: number;
  meta_description: string;
  meta_keywords: string;
};

const CreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: categories } = useQuery({
    ...categoryQueries.all(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<
    string[]
  >([]);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { mutate: createProduct, isPending } = useMutation({
    ...createProductMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ ...productQueries.all() });
      toast.success("Məhsul uğurla əlavə edildi");
      router.push("/dashboard/products");
    },
    onError: () => {
      toast.error("Məhsul əlavə edilərkən xəta baş verdi");
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    if (!mainImage) {
      toast.error("Əsas məhsul şəkli mütləqdir.");
      return;
    }

    const formData = new FormData();

    // Process data and ensure price fields are never null/undefined
    const processedData = {
      ...data,
      sales_price: data.sales_price || 0,
      discount_price: data.discount_price || 0,
      purchase_price: data.purchase_price || 0,
      stock: data.stock || 0,
    };

    Object.entries(processedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    formData.append("image", mainImage);

    if (additionalImages.length > 0) {
      additionalImages.forEach((file) => {
        formData.append("images[]", file);
      });
    }

    createProduct(formData);
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "additional"
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (type === "main") {
      const file = files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    } else {
      const newFiles = Array.from(files);
      setAdditionalImages((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setAdditionalImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeMainImage = () => {
    if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
    setMainImage(null);
    setMainImagePreview(null);
    if (mainImageInputRef.current) mainImageInputRef.current.value = "";
  };

  const removeAdditionalImage = (index: number) => {
    URL.revokeObjectURL(additionalImagePreviews[index]);
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryCreated = () => {
    queryClient.invalidateQueries({ ...categoryQueries.all() });
  };

  return (
    <div className="mx-auto space-y-6 bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-medium mb-6">Yeni məhsul əlavə et</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-medium">
                Əsas məlumatlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Məhsulun adı</Label>
                <Input
                  className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                  id="product-name"
                  placeholder="Məhsulun adını daxil edin"
                  {...register("name", { required: "Ad mütləqdir" })}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sales-price">Satış qiyməti</Label>
                  <Input
                    id="sales-price"
                    type="number"
                    placeholder="0"
                    className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                    {...register("sales_price", {
                      required: "Satış qiyməti mütləqdir",
                      valueAsNumber: true,
                      setValueAs: (value) => (value === "" ? 0 : Number(value)),
                    })}
                  />
                  {errors.sales_price && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.sales_price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-price">Endirim qiyməti</Label>
                  <Input
                    id="discount-price"
                    type="number"
                    placeholder="0"
                    className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                    {...register("discount_price", {
                      valueAsNumber: true,
                      setValueAs: (value) => (value === "" ? 0 : Number(value)),
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchase-price">Alış qiyməti</Label>
                  <Input
                    id="purchase-price"
                    type="number"
                    placeholder="0"
                    className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                    {...register("purchase_price", {
                      required: "Alış qiyməti mütləqdir",
                      valueAsNumber: true,
                      setValueAs: (value) => (value === "" ? 0 : Number(value)),
                    })}
                  />
                  {errors.purchase_price && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.purchase_price.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-medium">
                Məhsulun şəkli
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Əsas şəkil </Label>
                <input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, "main")}
                />
                {!mainImagePreview ? (
                  <div
                    onClick={() => mainImageInputRef.current?.click()}
                    className="mt-2 border border-gray-100 rounded-lg p-8 text-center  transition-colors cursor-pointer bg-[#FBFDFF]"
                  >
                    <Image
                      src="/images/createimage.svg"
                      alt="Upload icon"
                      width={48}
                      height={48}
                      className="mx-auto mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-2">
                      Siz .jpeg, .jpg, .png, .webp formatında faylları maksimum
                      7MB ölçüyə qədər yükləyə bilərsiniz.
                    </p>
                    <p className="text-sm font-medium text-[#FF13F0]">
                      + Şəkil əlavə et
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 relative w-32 h-32 border rounded-md">
                    <Image
                      src={mainImagePreview}
                      alt="Əsas şəkil"
                      layout="fill"
                      className="object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={removeMainImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Label>Əlavə şəkillər (Çoxlu seçim)</Label>
                <input
                  ref={additionalImagesInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, "additional")}
                />
                <div
                  onClick={() => additionalImagesInputRef.current?.click()}
                  className="mt-2 border border-gray-100 rounded-lg p-8 text-center  transition-colors cursor-pointer bg-[#FBFDFF]"
                >
                  <Image
                    src="/images/createimage.svg"
                    alt="Upload icon"
                    width={48}
                    height={48}
                    className="mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Siz .jpeg, .jpg, .png, .webp formatında faylları maksimum
                    7MB ölçüyə qədər yükləyə bilərsiniz.
                  </p>
                  <p className="text-sm font-medium text-[#FF13F0]">
                    + Şəkillər əlavə et
                  </p>
                </div>
                {additionalImagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {additionalImagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative w-32 h-32 border rounded-md"
                      >
                        <Image
                          src={preview}
                          alt={`Əlavə şəkil ${index + 1}`}
                          layout="fill"
                          className="object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-medium">
                Məhsul detalları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Kateqoriya</Label>
                  <Controller
                    name="category_id"
                    control={control}
                    rules={{ required: "Kateqoriya mütləqdir" }}
                    render={({ field }) => (
                      <>
                        {categories && categories.length > 0 ? (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-10 w-full">
                              <SelectValue placeholder="Kateqoriya seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                              <div className="border-t">
                                <div
                                  className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm"
                                  onClick={() => setIsCategoryModalOpen(true)}
                                >
                                  <Plus className="h-4 w-4" />
                                  Kateqoriya əlavə et
                                </div>
                              </div>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsCategoryModalOpen(true)}
                              className="flex items-center gap-2 w-full justify-start"
                            >
                              <Plus className="h-4 w-4" />
                              Kateqoriya yarat
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.category_id && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.category_id.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Stok sayı</Label>
                  <Input
                    placeholder="Stok sayını qeyd edin"
                    className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                    type="number"
                    {...register("stock", {
                      required: "Stok sayı mütləqdir",
                      valueAsNumber: true,
                      setValueAs: (value) => (value === "" ? 0 : Number(value)),
                    })}
                  />
                  {errors.stock && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Məhsulun təsviri</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Məhsulun təsvirini daxil edin"
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">SEO</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Səhifə başlığı (Keywords)</Label>
                <Input
                  id="meta_keywords"
                  placeholder="Səhifə başlığı"
                  {...register("meta_keywords")}
                  className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_description">Səhifə təsviri</Label>
                <Input
                  id="meta_description"
                  placeholder="Səhifə təsviri"
                  className="w-full border border-[#F3F2F8]  px-3 py-5.5 rounded-md "
                  {...register("meta_description")}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" size="lg" className="px-8">
              Geri
            </Button>
            <Button
              type="submit"
              className="bg-[#E23359] hover:bg-[#E23359]/90 text-white px-8 cursor-pointer"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Əlavə edilir..." : "Əlavə et"}
            </Button>
          </div>
        </fieldset>
      </form>

      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
    </div>
  );
};

export default CreateProduct;
