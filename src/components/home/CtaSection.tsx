"use client"
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getBannerOptions } from "@/services/Banner/queries";
import Link from "next/link";

export default function CtaSection() {

  const { data, isLoading, isError, error } = useQuery(getBannerOptions());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="py-14 relative"
    style={{ 
      backgroundImage: "url('/images/ctabg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/70 via-purple-600/70 to-purple-700/70"></div>
      
      {/* Content */}
      <div className="relative z-10">
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
         <Image
         src="/images/logofooter.png" 
         alt="Logo"
         width={185}
         height={50}
         />
        </div>

        {/* Main heading */}
        <h2 className="text-2xl  lg:text-[36px] font-bold text-white mb-8 sm:mb-12 leading-tight px-4">
          {data?.title}
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
           <Link href={data?.link_1 || "#"} className="w-full sm:w-auto bg-gray-100 text-gray-900 px-6 sm:px-8 py-3 sm:py-2 rounded-xl font-semibold text-base sm:text-lg hover:bg-white transition-colors duration-300 cursor-pointer">
            {data?.btn_1}
           </Link>
           <Link href={data?.link_2 || "#"} className="w-full sm:w-auto bg-[#FF13F0] text-white px-6 sm:px-8 py-3 sm:py-2 rounded-xl font-semibold text-base sm:text-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 cursor-pointer">
            {data?.btn_2}
           </Link>
        </div>
      </div>
      </div>
    </section>
  )
}