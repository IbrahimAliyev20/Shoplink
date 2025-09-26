"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContactMutation } from "@/services/Contact/queries"
import { Contact } from "@/types"

const formSchema = z.object({
  name: z.string().min(2, "Ad və soyad ən azı 2 simvol olmalıdır"),
  phone: z.string().min(9, "Telefon nömrəsi düzgün deyil"),
  message: z.string().min(10, "Mesaj ən azı 10 simvol olmalıdır"),
  countryCode: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function ContactPage() {
  const contactMutation = useContactMutation()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
      countryCode: "+994",
    },
  })

  const countryCode = watch("countryCode")

  const onSubmit = async (data: FormData) => {
    try {
      const contactData: Contact = {
        name: data.name,
        phone: `${data.countryCode}${data.phone}`,
        message: data.message,
      }
      
      await contactMutation.mutateAsync(contactData)
      
      // Reset form after successful submission
      reset()
      
      // You can add a success notification here
      console.log("Form submitted successfully!")
      
    } catch (error) {
      console.error("Form submission error:", error)
      // You can add an error notification here
    }
  }

  return (
    // Bu hissə olduğu kimi qala bilər, əsas dəyişiklik formun içindədir
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fbfdff]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Sol Hissə - Məzmun */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Sualınız var? <br />
                Biz <span className="text-pink-500">buradayıq</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Sualınız, təklifiniz və ya sadəcə paylaşmaq istədiyiniz fikriniz varsa, formu doldurun — komanda
                üzvlərimiz ən qısa zamanda sizinlə əlaqə saxlayacaq.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">Bizə email ilə yaz</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">info@shoplink.az</p>
            </div>
          </div>

          {/* Sağ Hissə - Form (DƏYİŞİKLİKLƏR BURADADIR) */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Ad,soyad Sahəsi */}
              <fieldset className={`mb-2 rounded-xl border transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}>
                <legend className="ml-3 px-1 text-sm text-gray-500">Ad,soyad</legend>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ad və soyadınızı daxil edin"
                  {...register("name")}
                  className="w-full h-10 px-4 -mt-3 bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </fieldset>
              {errors.name && (
                <p className="text-sm text-red-600 -mt-4 ml-1">{errors.name.message}</p>
              )}

              {/* Telefon Sahəsi */}
              <fieldset className={` mb-2 flex items-center rounded-xl border transition-all duration-200 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}>
                <legend className="ml-3 px-1 text-sm text-gray-500">Telefon nömrəsi</legend>
                <div className="flex w-full items-center -mt-3">
                  <Select
                    value={countryCode}
                    onValueChange={(value) => setValue("countryCode", value)}
                  >
                    <SelectTrigger className="w-22 h-10 bg-transparent border-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+994">+994</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Telefon nömrənizi daxil edin"
                    {...register("phone")}
                    className="flex-1 h-10 px-2 bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </fieldset>
              {errors.phone && (
                <p className="text-sm text-red-600 -mt-4 ml-1">{errors.phone.message}</p>
              )}

              {/* Mesaj Sahəsi */}
              <fieldset className={`mb-2 rounded-xl border transition-all duration-200 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}>
                <legend className="ml-3 px-1 text-sm text-gray-500">Mesaj</legend>
                <Textarea
                  id="message"
                  placeholder="Mesajınız"
                  {...register("message")}
                  className="w-full min-h-32 px-4 py-2 -mt-3 bg-transparent border-none resize-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </fieldset>
              {errors.message && (
                <p className="text-sm text-red-600 -mt-4 ml-1">{errors.message.message}</p>
              )}

              {/* Göndər Düyməsi */}
              <Button
                type="submit"
                disabled={isSubmitting || contactMutation.isPending}
                className="w-full h-14 bg-neutral-800 hover:bg-neutral-900 text-white font-medium rounded-xl text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || contactMutation.isPending ? "Göndərilir..." : "Mesaj göndər"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}