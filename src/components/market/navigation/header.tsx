"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserAction } from "@/services/auth/server-actions";
import { UserData } from "@/types";


export default function Header({ marketSlug }: { marketSlug: string }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = await getUserAction();
        setUser(userData);
      } catch (error) {
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
            <Link href="/market/basket" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
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