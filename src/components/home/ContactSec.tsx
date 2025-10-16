"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from "@/services/Home/ContactForm/mutations";
import { toast } from "sonner";
import { ContactForm } from "@/types/home/hometypes";
import { getContactQuery } from "@/services/Home/Contact/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const formSchema = z.object({
  name: z.string().min(2, "Ad və soyad ən azı 2 simvol olmalıdır"),
  phone: z.string().min(9, "Telefon nömrəsi düzgün deyil"),
  message: z.string().min(10, "Mesaj ən azı 10 simvol olmalıdır"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const contactMutation = useContactMutation();
  const { data: contact } = useQuery(getContactQuery());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const contactData: ContactForm = {
        name: data.name,
        phone: data.phone,
        message: data.message,
      };

      await contactMutation.mutateAsync(contactData);

      reset();

      toast.success("Mesaj göndərildi");
    } catch {
      toast.error("Mesaj göndərərkən xəta baş verdi");
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#fbfdff] border-1 border-[#F3F6F8] rounded-[16px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
                Sualınız var? <br />
                Biz <span className="text-[#E23359]">buradayıq</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Sualınız, təklifiniz və ya sadəcə paylaşmaq istədiyiniz fikriniz
                varsa, formu doldurun — komanda üzvlərimiz ən qısa zamanda
                sizinlə əlaqə saxlayacaq.
              </p>
            </div>
            <div className="py-8 flex flex-col justify-between ">
              <div className="space-y-6 text-gray-700">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-gray-600" />
                  <Link href={`mailto:${contact?.email}`} className="text-lg">
                    {contact?.email}
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-gray-600" />
                  <Link href={`tel:${contact?.phone}`} className="text-lg">
                    {contact?.phone}
                  </Link>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-gray-600 flex-shrink-0 mt-1" />
                  <Link
                    href={`https://maps.app.goo.gl/jQ7jUeF8eZU6UxQy9`}
                    className="text-lg"
                  >
                    {contact?.address}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xs p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-500">
                  Ad,soyad
                </label>
                <fieldset
                  className={`rounded-xl border transition-all duration-200 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ad və soyadınızı daxil edin"
                    {...register("name")}
                    className="w-full h-10 px-4 py-6  bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </fieldset>
              </div>
              {errors.name && (
                <p className="text-sm text-red-600  ml-1">
                  {errors.name.message}
                </p>
              )}

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-gray-500">
                  Nömrənizi daxil edin
                </label>
                <fieldset
                  className={`rounded-xl border transition-all duration-200 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <PhoneInput
                    country="az"
                    value=""
                    onChange={(value) => setValue("phone", value)}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "16px",
                      paddingLeft: "48px",
                    }}
                    buttonStyle={{
                      border: "none",
                      borderRadius: "12px 0 0 12px",
                      backgroundColor: "transparent",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    placeholder="Nömrənizi daxil edin"
                  />
                </fieldset>
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600 -mt-4 ml-1">
                  {errors.phone.message}
                </p>
              )}

              <div className="space-y-4">
                <label htmlFor="message" className="text-sm text-gray-500">
                  Mesaj
                </label>
                <fieldset
                  className={`rounded-xl border transition-all duration-200 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <Textarea
                    id="message"
                    placeholder="Mesajınız"
                    {...register("message")}
                    className="w-full min-h-22 px-4 py-6 -mt-3 bg-transparent border-none resize-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </fieldset>
              </div>
              {errors.message && (
                <p className="text-sm text-red-600 -mt-4 ml-1">
                  {errors.message.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || contactMutation.isPending}
                className="w-full h-10 mt-6 bg-neutral-800 hover:bg-neutral-900 text-white font-medium rounded-xl text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || contactMutation.isPending
                  ? "Göndərilir..."
                  : "Mesaj göndər"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
