"use client";
import RichTextEditor from "@/components/shared/editor";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, Trash2, Replace } from "lucide-react";
import { productQueries } from "@/services/Seller-services/product/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryQueries } from "@/services/Seller-services/category/queries";
import { useParams, useRouter } from "next/navigation";
import { updateProductMutation } from "@/services/Seller-services/product/mutations";
import { toast } from "sonner";

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
        sales_price: product.detail.sales_price || "",
        discount_price: product.detail.discount_price || "",
        purchase_price: product.detail.purchase_price || "",
        stock: product.detail.stock || 0,
        category_id: product.category_id || 0,
        description: product.detail.description || "",
      });
    }
  }, [product]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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

    formDataToSend.append("id", productId.toString());
    formDataToSend.append("name", formData.name);
    formDataToSend.append("sales_price", formData.sales_price);
    formDataToSend.append("discount_price", formData.discount_price || "");
    formDataToSend.append("purchase_price", formData.purchase_price);
    formDataToSend.append("stock", formData.stock.toString());
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
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-8 rounded-lg shadow"
    >
      <h2 className="text-lg font-semibold mb-6">Məhsul redaktəsi</h2>
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-4">Məhsul detalları</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Məhsulun adı
            </label>
            <Input
              className="w-full border border-gray-200 rounded px-3 py-2"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Satış qiyməti
              </label>
              <div className="relative">
                <Input
                  placeholder="7000"
                  className="w-full rounded-xl border border-gray-200 py-4 px-4 text-base shadow "
                  value={formData.sales_price}
                  onChange={(e) =>
                    handleInputChange("sales_price", e.target.value)
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
                  className="w-full rounded-xl border border-gray-200 py-4 px-4 text-base shadow "
                  value={formData.discount_price}
                  onChange={(e) =>
                    handleInputChange("discount_price", e.target.value)
                  }
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">
                  AZN
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Alış qiyməti
              </label>
              <div className="relative">
                <Input
                  placeholder="10.000"
                  className="w-full rounded-xl border border-gray-200 py-4 px-4 text-base shadow "
                  value={formData.purchase_price}
                  onChange={(e) =>
                    handleInputChange("purchase_price", e.target.value)
                  }
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                  AZN
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Kateqoriya
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2"
                value={formData.category_id}
                onChange={(e) =>
                  handleInputChange("category_id", parseInt(e.target.value))
                }
              >
                <option value={0}>Kateqoriya seçin</option>
                {categories?.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Stok sayı
              </label>
              <Input
                placeholder="200"
                className="w-full border border-gray-200 rounded px-3 py-2"
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
            <RichTextEditor
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
          <div className="flex items-center gap-4">
            {product?.image && (
              <Image
                src={product.image}
                alt="Product main image"
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-xl border border-gray-200"
              />
            )}
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-fuchsia-400 transition-colors">
              <ImageIcon className="w-10 h-10 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-2 max-w-xs">
                Siz jpeg, .jpg, .png, .webp formatında faylları maksimum 7MB
                ölçüyə qədər yükləyə bilərsiniz.
              </p>
              <button
                type="button"
                className="text-fuchsia-500 font-semibold mt-2 text-sm"
                onClick={triggerMainImageInput}
              >
                + Şəkil əlavə et
              </button>
            </div>
          </div>
        </div>

        <label className="block mb-2 font-medium">Digər şəkillər</label>
        <div className="flex flex-wrap gap-4 items-center">
          {product?.images?.map((image, index) => (
            <div key={index} className="relative group w-32 h-32">
              <Image
                src={image.image}
                alt="Product image"
                width={128}
                height={128}
                className="object-cover w-full h-full rounded-xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-start justify-end p-1.5">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toast.info(`Dəyişdir: ${image.id}`)}
                    className="p-1.5 bg-white/80 rounded-md hover:bg-white"
                  >
                    <Replace className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.error(`Sil: ${image.id}`)}
                    className="p-1.5 bg-white/80 rounded-md hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {otherImages.map((image) => (
            <div key={image.id} className="relative group w-32 h-32">
              <Image
                src={image.url}
                alt="New product image"
                width={128}
                height={128}
                className="object-cover w-full h-full rounded-xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-start justify-end p-1.5">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-1.5 bg-white/80 rounded-md hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={triggerFileInput}
            className="w-32 h-32 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 hover:border-fuchsia-500 transition-colors text-gray-500 hover:text-fuchsia-500"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <span className="text-lg font-medium">+</span>
            </div>
            <span className="text-sm font-medium">Şəkil əlavə et</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />

          <input
            type="file"
            ref={mainImageInputRef}
            onChange={handleMainImageSelect}
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          type="submit"
          disabled={isPending}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Yenilənir..." : "Dəyişiklikləri yadda saxla"}
        </button>
      </div>
    </form>
  );
};

export default ProductEdit;