import Image from 'next/image';
import Link from 'next/link';
import React from 'react'; 

export default function Footer ({ marketSlug }: { marketSlug: string })  {
  return (
    <footer className="bg-white border-t border-[#F3F2F8]">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-4">
        
        <Image 
          src="/images/Logo.svg" 
          alt="Site Logo" 
          width={160} 
          height={40} 
          className="mb-2"
        />

        <Link 
          href="mailto:stridex@gmail.com" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>stridex@gmail.com</span>
        </Link>

        {/* Naviqasiya Linkləri */}
        <nav className="flex gap-6 mt-2">
          <Link href={`/${marketSlug}/about`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Haqqımızda
          </Link>
          <Link href={`/${marketSlug}/contact`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Əlaqə
          </Link>
        </nav>

      </div>
    </footer>
  );
};