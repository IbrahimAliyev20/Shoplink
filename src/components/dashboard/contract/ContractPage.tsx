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
    slug: '/dashboard/contracts/category',
    icon: LayoutDashboard ,
  },
  {
    title: 'Brendlər',
    description: 'Brend detalları səhifələrində eyni brendin məhsullarını göstərin.',
    slug: '/dashboard/contracts/brands',
    icon: LayoutDashboard ,
  },
  {
    title: 'Xüsusi sahələr',
    description: 'Məhsul filtrləri yaradın və atributları əlavə edib mövcuda göstərin.',
    slug: '/dashboard/contracts/specialarea',
    icon: LayoutDashboard ,
  },
  {
    title: 'Variant növləri',
    description: 'Məhsullarınızı şaxələndirmək üçün ölçü, rəng və ölçülər kimi variantlar əlavə edin.',
    slug: '/dashboard/contracts/variants',
    icon: LayoutDashboard ,
  },
];

function ContractPage() {
  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          {cardData.map((card, index) => (
            <div key={index} className=" group bg-white rounded-2xl border border-slate-200/80 px-8 py-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col">
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
