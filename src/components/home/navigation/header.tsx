"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu,  X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSosialOptions } from "@/services/Sosial/queries";
import { UserProfile, UserProfileMobile } from "./UserProfile";
import { getUserAction } from "@/services/auth/server-actions";
import { UserData } from "@/types";

export function Header() {
  const { data, isError, error } = useQuery(getSosialOptions());
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserAction();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleStorageChange = () => {
      window.location.reload();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  if (isLogin || isRegister) {
    return null;
  }

  return (
    <header className="w-full border-b bg-white fixed z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={data?.logo || "/images/logofooter.png"}
            alt="Logo"
            width={120}
            height={32}
            className="sm:w-[150px] sm:h-[40px]"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            Ana səhifə
          </Link>
          <Link href="/#about" className="text-gray-700 hover:text-gray-900 transition-colors">
            Shoplink nədir?
          </Link>
          <Link href="/#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
            Qiymətlər
          </Link>
          <Link href="/#features" className="text-gray-700 hover:text-gray-900 transition-colors">
            Xüsusiyyətlər
          </Link>
          <Link href="/#contact" className="text-gray-700 hover:text-gray-900 transition-colors">
            Əlaqə
          </Link>
        </nav>

        {authLoading ? (
          <div className="hidden md:flex items-center gap-4">
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : user ? (
          <UserProfile />
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900 font-semibold px-6 py-2 border rounded-xl text-sm">
              Giriş
            </Link>
            <Link href="/register">
              <Button className="rounded-[14px] px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 cursor-pointer text-sm">
                E-ticarət saytını aç
              </Button>
            </Link>
          </div>
        )}

        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ana səhifə
            </Link>
            <Link
              href="/#about"
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shoplink nədir?
            </Link>
            <Link
              href="/#pricing"
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Qiymətlər
            </Link>
            <Link
              href="/#features"
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Xüsusiyyətlər
            </Link>
            <Link
              href="/#contact"
              className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Əlaqə
            </Link>

            {/* Mobile Authentication Section */}
            {authLoading ? (
              <div className="pt-4 space-y-3">
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              <UserProfileMobile />
            ) : (
              <div className="pt-4 space-y-3">
                <Link
                  href="/login"
                  className="block text-center text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 border rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giriş
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full rounded-[14px] px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 cursor-pointer">
                    E-ticarət saytını aç
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}