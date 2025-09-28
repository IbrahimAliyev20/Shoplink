"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserAction } from "@/services/auth/server-actions";
import { UserData } from "@/types";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";


export default function Header({ marketSlug }: { marketSlug: string }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getCartCount } = useCart();
  
  const cartCount = getCartCount();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = await getUserAction();
        setUser(userData);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Giriş zamanı xəta baş verdi.");
        setUser(null);
      } finally {
        
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []); 

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <Link href={`/${marketSlug}`} className="flex items-center gap-2">
            <Image
              src="/images/Logo.svg" 
              alt="ShopLink Logo"
              width={150}
              height={40}
            />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href={`/${marketSlug}/basket`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 relative">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span>Səbət</span>
            </Link>
            
            {isLoading ? (
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : user ? (
              <Link href={`/${marketSlug}/account`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Hesab</span>
              </Link>
            ) : (
              <Link href={`/${marketSlug}/login`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Giriş</span>
              </Link>
            )}
          </div>
          
        </div>
      </nav>
    </header>
  );
}