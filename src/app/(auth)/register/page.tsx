"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerAction } from '@/services/auth/server-actions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface FloatingFieldProps {
    id: string
    label: string
    children: React.ReactNode
    className?: string
}

function FloatingField({ id, label, children, className }: FloatingFieldProps) {
    return (
        <div className={`relative ${className ?? ''}`}>
            {children}
            <Label htmlFor={id} className={'pointer-events-none bg-white absolute left-3 -top-2 px-1 text-xs text-foreground'}>
                {label}
            </Label>
        </div>
    )
}

const RegisterSchema = z.object({
    store_name: z.string().min(2, { message: "Mağaza adı minimum 2 simvol olmalıdır" }),
    name: z.string().min(2, { message: "Ad minimum 2 simvol olmalıdır" }),
    phone: z.string().min(9, { message: "Telefon nömrəsi düzgün deyil" }),
    email: z.string().email({ message: "Düzgün email daxil edin" }),
    password: z.string().min(6, { message: "Şifrə minimum 6 simvol olmalıdır" }),
    terms: z.boolean().refine(val => val === true, {
        message: "Şərtləri qəbul etməlisiniz",
    }),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>

function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

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
    })

    async function onSubmit(values: RegisterFormValues) {
        try {
          const formData = new FormData();
      
          formData.append('store_name', values.store_name);
          formData.append('name', values.name);
          formData.append('phone', values.phone);
          formData.append('email', values.email);
          formData.append('password', values.password);
          
          const res = await registerAction(formData);
      
          if (res?.status === "success") {
            toast.success("Qeydiyyat uğurludur");
            router.push('/login');
          } else {
            toast.error(res.message || "Qeydiyyat uğursuz oldu");
          }
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Qeydiyyat uğursuz oldu";
          toast.error(message);
        }
      }

    return (
        <section className='bg-[#FBFDFF] min-h-screen flex items-center justify-center py-12'>
            <div className='w-full max-w-3xl mx-auto' style={{ borderRadius: '16px', border: '1px solid #FBFDFF', background: '#FFF', boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.06)' }}>
                <div className='p-6 md:p-10'>
                <Image src="/images/Logo.svg" alt="Logo" width={199} height={45} />
                    <h1 className='text-2xl font-semibold mt-8 mb-10'>Öz e-ticarət saytını qur!</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 md:gap-5'>
                            <FormField
                                control={form.control}
                                name="store_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FloatingField id='store_name' label='Mağaza adı'>
                                            <FormControl>
                                                <Input
                                                    placeholder='Mağaza adını daxil edin'
                                                    className='peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
                                                    disabled={form.formState.isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FloatingField>
                                        <FormMessage className="pl-3" />
                                    </FormItem>
                                )}
                            />

                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FloatingField id='name' label='Ad,soyad'>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Ad və soyadınızı daxil edin'
                                                        className='peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
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
                                            <FloatingField id='phone' label='Telefon nömrəsi'>
                                                <FormControl>
                                                    <Input
                                                        type='tel'
                                                        placeholder='Telefon nömrənizi daxil edin'
                                                        className='peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FloatingField>
                                            <FormMessage className="pl-3" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FloatingField id='email' label='Email'>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        placeholder='E-poçt ünvanınızı daxil edin'
                                                        className='peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
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
                                            <FloatingField id='password' label='Şifrə'>
                                                <div className='relative'>
                                                    <FormControl>
                                                        <Input
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder='Şifrənizi daxil edin'
                                                            className='peer h-12 rounded-lg pr-10 border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <button type='button' aria-label='Toggle password' className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground' onClick={() => setShowPassword((s) => !s)}>
                                                        {showPassword ? '🙈' : '👁️'}
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
                                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md py-2'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Şərtləri oxudum və qəbul edirəm
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className='mt-2 h-12 rounded-full bg-[#FF13F0]' disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Gözləyin..." : "Hesab yarat"}
                            </Button>
                        </form>
                    </Form>

                    <p className='mt-4 text-sm text-muted-foreground font-semibold'>
                        Hesabın var?{' '}
                        <Link href='/login' className='text-[#FF13F0] underline-offset-4 hover:underline'>
                            Daxil ol
                        </Link>
                    </p>
                </div>
            </div>
        </section >
    )
}

export default Register;
