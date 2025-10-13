import Link from 'next/link';
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

interface CardData {
  title: string;
  description: string;
  slug: string;
  icon: React.ElementType;
}

const cardData: CardData[] = [
  {
    title: 'Kateqoriyalar',
    description: 'İstifadəçilərin axtardıqlarını tez tapması üçün məhsulları kateqoriyalara ayırın.',
    slug: '/dashboard/categorys/category',
    icon: LayoutDashboard ,
  },
  {
    title: 'Brendlər',
    description: 'Brend detalları səhifələrində eyni brendin məhsullarını göstərin.',
    slug: '/dashboard/categorys/brands',
    icon: LayoutDashboard ,
  },
];

function ContractPage() {
  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         
          {cardData.map((card, index) => (
            <div key={index} className=" group bg-white rounded-2xl border border-[#F3F2F8] px-8 py-6 hover:shadow-md shadow-xs transition-shadow duration-300 ease-in-out flex flex-col">
             <Link href={card.slug}>
              <div className="flex items-center space-x-4 mb-4 text-black group-hover:text-[#FF13F0]">
                <card.icon />
                  <h2 className="text-xl font-medium">
                  {card.title}
                </h2>
              </div>
              <p className="text-slate-600 text-base leading-relaxed">
                {card.description}
              </p>
          </Link>
            </div>

          ))}
        </div>
  );
}

export default ContractPage;
