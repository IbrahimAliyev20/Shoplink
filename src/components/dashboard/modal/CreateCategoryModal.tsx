"use client";

import React from 'react';
import { useForm, SubmitHandler, Controller, FieldError } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { createCategoryMutation } from '@/services/Seller-services/category/mutations';
import { categoryQueries } from '@/services/Seller-services/category/queries';

// Form dəyərlərinin tipi
type CategoryFormValues = {
  name: string;
  description: string;
  order: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
};

// Props-lar (dəyişməyib)
interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (categoryId: number) => void;
}

// Köməkçi Form Komponenti (dəyişməyib)
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: any;
  error?: FieldError;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, register, error, ...props }) => (
  <div className="space-y-1.5"> {/* Dəyişiklik: space-y-2 -> space-y-1.5 */}
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...register} {...props} />
    {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
  </div>
);

// ƏSAS MODAL KOMPONENTİ
const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ isOpen, onClose, onCategoryCreated }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CategoryFormValues>();

  const { mutate: createCategory, isPending } = useMutation({
    ...createCategoryMutation(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.all().queryKey });
      toast.success("Kateqoriya uğurla əlavə edildi");
      reset();
      onCategoryCreated(data.id);
      onClose();
    },
    onError: () => toast.error("Kateqoriya əlavə edilərkən xəta baş verdi"),
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
    <Dialog open={isOpen} onOpenChange={() => { reset(); onClose(); }}>
      {/* Dəyişiklik: Daxili padding (p-6 -> p-4) */}
      <DialogContent className="sm:max-w-[800px] p-4">
        <DialogHeader className="pb-2"> {/* Dəyişiklik: Başlıq altındakı boşluq azaldıldı */}
            <DialogTitle className="text-lg font-semibold">Kateqoriya yarat</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dəyişiklik: Bloklar arası boşluq (space-y-6 -> space-y-4) */}
          <fieldset disabled={isPending} className="space-y-4">
            
            {/* Dəyişiklik: Elementlər arası boşluq (gap-6 -> gap-4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="name"
                label="Kateqoriya adı"
                register={register("name", { required: "Ad mütləqdir" })}
                error={errors.name}
                placeholder="Kateqoriya adı"
              />
              <FormInput
                id="description"
                label="Kateqoriya təsviri"
                register={register("description", { required: "Təsvir mütləqdir" })}
                error={errors.description}
                placeholder="Kateqoriya təsviri"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Məhsul sıralanması</Label>
              <Controller
                name="order"
                control={control}
                rules={{ required: "Sıralama mütləqdir" }}
                defaultValue="desc"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Yaradılma tarixi (Asc)</SelectItem>
                      <SelectItem value="desc">Yaradılma tarixi (Desc)</SelectItem>
                      <SelectItem value="A-Z">A-Z</SelectItem>
                      <SelectItem value="Z-A">Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.order && <p className="text-xs text-red-600 mt-1">{errors.order.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput id="meta_keywords" label="SEO Başlıq (Keywords)" register={register("meta_keywords")} placeholder="Kateqoriya adı" />
              <FormInput id="meta_description" label="SEO Təsvir (Description)" register={register("meta_description")} placeholder="Kateqoriya təsviri" />
            </div>
            
            <FormInput id="meta_title" label="Açar sözlər" register={register("meta_title")} placeholder="Kateqoriya adı" />

            <div className="flex justify-end gap-4 pt-2"> {/* Dəyişiklik: pt-4 -> pt-2 */}
              <Button type="button" variant="outline" onClick={() => { reset(); onClose(); }} disabled={isPending}>Ləğv et</Button>
              <Button type="submit" className="bg-[#FF13F0] hover:bg-[#FF13F0]/90 text-white" disabled={isPending}>
                {isPending ? "Yaradılır..." : "Yadda saxla"}
              </Button>
            </div>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;