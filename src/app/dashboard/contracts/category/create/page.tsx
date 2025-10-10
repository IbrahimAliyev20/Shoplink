"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { createCategoryMutation } from "@/services/Seller-services/category/mutations";
import { categoryQueries } from "@/services/Seller-services/category/queries";

type CategoryFormValues = {
  name: string;
  description: string;
  order: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
};

function CreateCategory() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>();

  const { mutate: createCategory, isPending } = useMutation({
    ...createCategoryMutation(),
    onSuccess: () => {
      toast.success("Kateqoriya uğurla yaradıldı");
      queryClient.invalidateQueries(categoryQueries.all());
      reset();
    },
    onError: (error) => {
      toast.error("Xəta baş verdi: " + error.message);
    },
  });

  const onSubmit: SubmitHandler<CategoryFormValues> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("order", data.order);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("meta_keywords", data.meta_keywords);

    createCategory(formData);
  };

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <h1 className="text-2xl font-medium text-gray-900 max-sm:text-xl max-sm:font-semibold">
        Kateqoriya
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending} className="space-y-6 max-sm:space-y-4">
          <Card className="shadow-none border-2 border-[#F3F2F8]">
            <CardHeader className="mb-10 max-sm:mb-6">
              <CardTitle className="text-2xl font-medium max-sm:text-xl max-sm:font-semibold">
                Əsas məlumatlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-sm:space-y-3 max-sm:px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-6 max-sm:gap-4 max-sm:space-y-4">
                <div className="space-y-2 max-sm:space-y-1.5">
                  <Label htmlFor="categoryName" className="max-sm:text-sm">
                    Kateqoriya adı
                  </Label>
                  <Input
                    id="categoryName"
                    placeholder="Kateqoriya adı"
                    {...register("name", { required: "Ad mütləqdir" })}
                    className="max-sm:h-10 max-sm:text-sm py-5.5"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 max-sm:space-y-1.5">
                  <Label
                    htmlFor="categoryDescription"
                    className="max-sm:text-sm"
                  >
                    Kateqoriya təsviri
                  </Label>
                  <Input
                    id="categoryDescription"
                    placeholder="Kateqoriya təsviri"
                    {...register("description", {
                      required: "Təsvir mütləqdir",
                    })}
                    className="max-sm:h-10 max-sm:text-sm py-5.5"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 max-sm:space-y-1.5">
                  <Label htmlFor="productSorting" className="max-sm:text-sm">
                    Məhsul sıralanması
                  </Label>
                  <Controller
                    name="order"
                    control={control}
                    rules={{ required: "Sıralama mütləqdir" }}
                    defaultValue="desc"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full max-sm:h-10 max-sm:text-sm py-5.5">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">
                            Yaradılma tarixi (Asc)
                          </SelectItem>
                          <SelectItem value="desc">
                            Yaradılma tarixi (Desc)
                          </SelectItem>
                          <SelectItem value="A-Z">A-Z</SelectItem>
                          <SelectItem value="Z-A">Z-A</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.order && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.order.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-2 border-[#F3F2F8]">
            <CardHeader className="mb-10 max-sm:mb-6">
              <CardTitle className="text-2xl font-medium max-sm:text-xl max-sm:font-semibold">
                SEO
              </CardTitle>
              <p className="text-sm text-gray-600 max-sm:text-xs">
                Sizə uyğun olan ödəniş metodunu seçin
              </p>
            </CardHeader>
            <CardContent className="space-y-4 max-sm:space-y-3 max-sm:px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-sm:gap-3">
              
               <div className="space-y-2 max-sm:space-y-1.5">
                  <Label htmlFor="meta_keywords" className="max-sm:text-sm">
                    SEO Başlıq (Keywords)
                  </Label>
                  <Input
                    id="meta_keywords"
                    placeholder="Kateqoriya adı"
                    {...register("meta_keywords")}
                    className="max-sm:h-10 max-sm:text-sm py-5.5"
                  />
                </div>
                <div className="space-y-2 max-sm:space-y-1.5">
                  <Label htmlFor="meta_description" className="max-sm:text-sm">
                    SEO Təsvir (Description)
                  </Label>
                  <Input
                    id="meta_description"
                    placeholder="Kateqoriya təsviri"
                    {...register("meta_description")}
                    className="max-sm:h-10 max-sm:text-sm py-5.5"
                  />
                </div>
                <div className="col-span-2   space-y-2 max-sm:space-y-1.5">
                  <Label htmlFor="meta_title" className="max-sm:text-sm">
                    Açar sözlər 
                  </Label>
                  <Input
                    id="meta_title"
                    placeholder="Kateqoriya adı"
                    {...register("meta_title")}
                    className="max-sm:h-10 max-sm:text-sm py-5.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4 max-sm:flex-col max-sm:pt-3 max-sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="px-12 border-none shadow-sm rounded-xl max-sm:px-6 max-sm:py-2.5 max-sm:text-sm max-sm:w-full"
            >
              Ləğv et
            </Button>
            <Button
              type="submit"
              className="px-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl max-sm:px-6 max-sm:py-2.5 max-sm:text-sm max-sm:w-full"
            >
              {isPending ? "Saxlanılır..." : "Yadda saxla"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateCategory;
