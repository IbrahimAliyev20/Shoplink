"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterMutation } from "@/services/auth/mutations"; // Path'i projene göre uyarla, örneğin '@/services/auth/mutations'
import Image from "next/image";
import Link from "next/link";

interface FloatingFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function FloatingField({ id, label, children, className }: FloatingFieldProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

const RegisterSchema = z.object({
  store_name: z
    .string()
    .min(2, { message: "Mağaza adı minimum 2 simvol olmalıdır" }),
  name: z.string().min(2, { message: "Ad minimum 2 simvol olmalıdır" }),
  phone: z.string().min(9, { message: "Telefon nömrəsi düzgün deyil" }),
  email: z.string().email({ message: "Düzgün email daxil edin" }),
  password: z.string().min(6, { message: "Şifrə minimum 6 simvol olmalıdır" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Şərtləri qəbul etməlisiniz",
  }),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate: registerMutate, isPending } = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      store_name: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      terms: false,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: RegisterFormValues) {
    registerMutate({
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      store_name_or_id: values.store_name,
      isMarketRegistration: false,
    });
  }

  return (
    <section className="bg-[#FBFDFF] min-h-screen flex items-center justify-center py-12">
      <div
        className="w-full max-w-3xl mx-auto"
        style={{
          borderRadius: "16px",
          border: "1px solid #FBFDFF",
          background: "#FFF",
          boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="p-6 md:p-10">
          <Link href="/">
          <Image src="/images/Logo.svg" alt="Logo" width={199} height={45} />
          </Link>
          <h1 className="text-2xl font-semibold mt-8 mb-10">
            Öz e-ticarət saytını qur!
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 md:gap-5"
            >
              <FormField
                control={form.control}
                name="store_name"
                render={({ field }) => (
                  <FormItem>
                    <FloatingField id="store_name" label="Mağaza adı">
                      <FormControl>
                        <Input
                          placeholder="Mağaza adını daxil edin"
                          className="peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                          disabled={isPending || form.formState.isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    </FloatingField>
                    <FormMessage className="pl-3" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FloatingField id="name" label="Ad,soyad">
                        <FormControl>
                          <Input
                            placeholder="Ad və soyadınızı daxil edin"
                            className="peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                            disabled={isPending || form.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>
                      </FloatingField>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FloatingField id="phone" label="Telefon nömrəsi">
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Telefon nömrənizi daxil edin"
                            className="peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                            disabled={isPending || form.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>
                      </FloatingField>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FloatingField id="email" label="Email">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="E-poçt ünvanınızı daxil edin"
                            className="peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                            disabled={isPending || form.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>
                      </FloatingField>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FloatingField id="password" label="Şifrə">
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Şifrənizi daxil edin"
                              className="peer h-12 rounded-lg pr-10 border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                              disabled={
                                isPending || form.formState.isSubmitting
                              }
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            aria-label="Toggle password visibility"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                                <path d="m2 2 20 20" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </FloatingField>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending || form.formState.isSubmitting}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Şərtləri oxudum və qəbul edirəm</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 h-12 rounded-full bg-[#E23359] hover:bg-[#E23359]/90"
                disabled={isPending || form.formState.isSubmitting}
              >
                {isPending || form.formState.isSubmitting
                  ? "Gözləyin..."
                  : "Hesab yarat"}
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-sm text-muted-foreground font-semibold text-center">
            Hesabın var?{" "}
            <Link
              href="/login"
              className="text-[#E23359] underline-offset-4 hover:underline"
            >
              Daxil ol
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
