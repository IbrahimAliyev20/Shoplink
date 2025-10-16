import { StoreForUsers } from '@/types/storeforusers/types';
import Image from 'next/image';
import React from 'react';

interface MarketHeroProps {
  store: StoreForUsers;
}

export default function MarketHero({ store }: MarketHeroProps) {
  return (
    <section className="relative">
      
      <div>
        <Image
          src={store.background_image || "/marketimg/hero.png"}
          width={1440}
          height={250}
          alt={`Mağaza banneri - ${store.name}`}
          className="w-full h-52 sm:h-64 object-cover max-md:h-40" 
          priority
        />
      </div>

      <div className="absolute flex flex-col items-start justify-center gap-5 bottom-8 md:bottom-0 left-8 sm:left-30 transform translate-y-25 max-md:left-4 max-md:gap-3 max-md:translate-y-20">
        <Image
          src={store.logo || "/marketimg/herologo.svg"}
          width={128}
          height={128}
          alt={`Mağaza logosu - ${store.name}`}
          className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 md:border-2 border-white max-md:w-20 max-md:h-20" 
        />
      </div>

    </section>
  );
};