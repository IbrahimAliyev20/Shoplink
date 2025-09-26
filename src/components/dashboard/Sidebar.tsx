'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Monitor,
  Package, 
  CircleUser, 
  CirclePercent , 
  SquareCheck, 
  Bolt , 
  ChevronDown, 
  ChevronRight,
  Menu,
  PanelRightOpen,
  LayoutGrid,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAllStoreQuery } from '@/services/Seller-services/store/allstore/queries';
import { getUserQuery } from '@/services/auth/queries';

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapsed?: (collapsed: boolean) => void;
}

const menuItems = [
  {
    id: 'panel',
    label: 'Panel',
    icon: LayoutGrid ,
    href: '/dashboard',
  },
  {
    id: 'hesabatlar',
    label: 'Hesabatlar',
    icon: Monitor,
    href: '/dashboard/reports',
  },
  {
    id: 'mehsullar',
    label: 'Məhsullar',
    icon: Package,
    href: '/dashboard/products',
    subItems: [
      { label: 'Məhsullar', href: '/dashboard/products' },
      { label: 'Satınalma sifarişləri', href: '/dashboard/products/purchase-orders' },
    ],
  },
  {
    id: 'musteriler',
    label: 'Müştərilər',
    icon: CircleUser,
    href: '/dashboard/customers',
  },
  {
    id: 'endirimler',
    label: 'Endirimler',
    icon: CirclePercent ,
    href: '/dashboard/discounts',
  },
  {
    id: 'anlasmalar',
    label: 'Anlayışlar',
    icon: SquareCheck ,
    href: '/dashboard/contracts',
  },
  {
    id: 'tesvimlenmelev',
    label: 'Tənzimlənmələr',
    icon: Bolt ,
    href: '/dashboard/settings',
  },
];

export default function Sidebar({ className, isCollapsed: externalIsCollapsed, onToggleCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['mehsullar']);
  const { data: store } = useQuery(getAllStoreQuery());
  
  // DƏYİŞİKLİK 1: isLoading və isError statuslarını useQuery-dan götürürük
  const { data: user, isLoading, isError } = useQuery(getUserQuery());
  
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;

  const toggleCollapsed = () => {
    const newCollapsed = !isCollapsed;
    
    if (onToggleCollapsed) {
      onToggleCollapsed(newCollapsed);
    } else {
      setInternalIsCollapsed(newCollapsed);
    }
    
    if (!newCollapsed) {
      setExpandedItems([]);
    } else {
      setExpandedItems(['mehsullar']);
    }
  };

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return;
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-black text-white transition-all duration-300 ease-in-out border-r border-gray-800 shadow-xl",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex h-full flex-col ">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className={cn(
            "flex items-center space-x-3 transition-opacity duration-200",
            isCollapsed && "opacity-0"
          )}>
          
            {!isCollapsed && (
              <Image src="/images/logofooter.png" alt="Logo" width={150} height={40} />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <PanelRightOpen  className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* DƏYİŞİKLİK 2: User Profile bloku tamamilə yeniləndi */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-700">
              {/* Əgər sorğu hələ yüklənirsə, boz bir dairə (skeleton) göstər */}
              {isLoading && (
                <div className="w-full h-full rounded-full bg-gray-700 animate-pulse"></div>
              )}

              {/* Əgər sorğuda xəta baş veribsə və ya məlumat uğurla gəlibsə */}
              {!isLoading && (
                <Image 
                  // Burada həm datanın mövcudluğunu, həm də "null" stringi olmadığını yoxlayırıq
                  src={!isError && user?.data?.image && user.data.image !== 'null' ? user.data.image : "/images/Card.svg"}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                  // Əlavə təhlükəsizlik: Əgər src linki yüklənməsə, standart şəkilə qayıt
                  onError={(e) => {
                    e.currentTarget.src = "/images/Card.svg";
                  }}
                />
              )}
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {/* Bu hissə orijinal kodunuzda boş idi */}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {/* Məlumat yüklənərkən və ya xəta olanda emaili göstərmə */}
                  {!isLoading && !isError ? user?.data?.email : '...'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group",
                  isActive(item.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
                onClick={() => {
                  if (item.subItems && !isCollapsed) {
                    toggleExpanded(item.id);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 flex-1 min-w-0"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
                {item.subItems && !isCollapsed && (
                  <div 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation();
                      toggleExpanded(item.id); 
                    }}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    {expandedItems.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </div>

              {/* Sub items */}
              {item.subItems && expandedItems.includes(item.id) && !isCollapsed && (
                <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-4">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        pathname === subItem.href
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && item.subItems && (
                <div className="absolute left-16 top-0 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap border border-gray-700 shadow-lg">
                  <div className="font-medium">{item.label}</div>
                  {item.subItems && (
                    <div className="mt-1 space-y-1 text-xs text-gray-300">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.href}>{subItem.label}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {isCollapsed && !item.subItems && (
                <div className="absolute left-16 top-0 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap border border-gray-700 shadow-lg">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {!isCollapsed ? (
            <div className='flex items-center space-x-2'>
              <Globe  className='w-[18px] h-[18px] text-[#AF52DE]'/> 
              <Link href={`/${store?.slug}`} className="text-xs text-gray-400">
                {store?.name}
              </Link> 
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Link href={`/${store?.slug}`} className="text-xs text-gray-400">
                  <Package className="h-4 w-4 text-white" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}