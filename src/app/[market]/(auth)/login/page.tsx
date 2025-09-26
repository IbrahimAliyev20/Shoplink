"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useLoginMutation } from '@/services/auth/mutations'
import { useParams } from 'next/navigation'

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

function LoginMarketUser() {
    const marketSlug = useParams().market;
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { mutate, isPending } = useLoginMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            return;
        }
        
        mutate({ email, password });
    };

    return (
        <section className='bg-[#FBFDFF] h-screen flex items-center justify-center'>
            <div
                className='w-[408px] mx-auto'
                style={{
                    borderRadius: '16px',
                    border: '1px solid #FBFDFF',
                    background: '#FFF',
                    boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.06)',
                }}
            >
                <div className='p-6 md:p-10'>
                    <Image src={'/images/Logo.svg'} alt={'Logo'} width={199} height={45} />
                    <h1 className='text-2xl font-semibold mt-8 mb-10'>Mağazana daxil ol</h1>
                    <form
                        className='grid grid-cols-1 gap-4 md:gap-5'
                        onSubmit={handleSubmit}
                    >
                        <FloatingField id='email' label='Email'>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Email adresinizi daxil edin'
                                className='peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isPending}
                            />
                        </FloatingField>

                        <FloatingField id='password' label='Şifrə'>
                            <div className='relative'>
                                <Input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Şifrənizi daxil edin'
                                    className='peer h-12 rounded-lg pr-10 border-[#AEAEB2] focus:outline-none focus-visible:ring-0'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                                <button
                                    type='button'
                                    aria-label='Toggle password visibility'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                                    onClick={() => setShowPassword((s) => !s)}
                                    disabled={isPending}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </FloatingField>

                        <div className='flex items-center justify-end'>
                            <Link href={'/forgot-password'} className='text-sm text-muted-foreground hover:underline'>
                                Şifrəmi unutdum
                            </Link>
                        </div>
                        
                        <Button type="submit" disabled={isPending} className='mt-2 h-12 rounded-full bg-[#FF13F0]'>
                            {isPending ? 'Yoxlanılır...' : 'Daxil ol'}
                        </Button>
                    </form>

                    <p className='mt-4 text-sm text-muted-foreground font-semibold'>
                        Hesabın yoxdur ?{' '}
                        <Link href={`/${marketSlug}/register`} className='text-[#FF13F0] underline-offset-4 hover:underline'>
                            Qeydiyyatdan keç
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LoginMarketUser;
