"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getSosialOptions } from "@/services/Sosial/queries"

export function Footer() {
  const { data, isLoading, isError, error } = useQuery(getSosialOptions());
  const pathname = usePathname()
  const isLogin = pathname === "/login"
  const isRegister = pathname === "/register"

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLogin || isRegister) {
    return null
  }
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Logo and Social Section */}
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
          <Image 
            src={data?.logo || "/images/logofooter.png"} 
            alt="Logo" 
            width={150} 
            height={40} 
            />
          </Link>

          {/* Follow Us Text */}
          <p className="text-gray-400">Bizi izləyin</p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {data?.["sosial-media"]?.map((social, index) => (
              <Link 
                key={index}
                href={social.link} 
                className="text-gray-400 hover:text-white transition-colors" 
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={social.thumb_image || social.image}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm text-gray-400">
          <p className="flex items-center gap-1">
            <span>©</span>
            <span>Copyright | All Rights Reserved</span>
          </p>
          <p>Markup Agency tərəfindən hazırlanılıb</p>
        </div>
      </div>
    </footer>
  )
}
