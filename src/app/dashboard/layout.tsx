'use client';

import MobileSidebar from '@/components/dashboard/MobileSidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAllStoreQuery } from '@/services/Seller-services/store/allstore/queries';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  // Check if store exists to determine if shop setup is completed
  const { data: storeData } = useQuery(getAllStoreQuery());
  const hasStore = !!storeData?.id;
  
  // Check if current page is shop setup
  const isShopSetupPage = pathname === '/dashboard/shopsetup';

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if sidebar should be shown
  const shouldShowSidebar = !isShopSetupPage && hasStore;

  return (
    <div className="min-h-screen bg-[#fbfdff]">
      {/* Only show sidebar if not on shop setup page and store exists */}
      {shouldShowSidebar && (
        <div className="hidden lg:block">
          <Sidebar 
            isCollapsed={sidebarCollapsed}
            onToggleCollapsed={setSidebarCollapsed}
          />
        </div>
      )}

      <div className={`transition-all duration-300 ease-in-out ${
        shouldShowSidebar 
          ? (isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64')
          : 'ml-0'
      }`}>
        {/* Only show mobile header if sidebar should be shown */}
        {shouldShowSidebar && (
          <div className="lg:hidden bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30">
            <MobileSidebar />
            <h1 className="text-lg font-semibold text-gray-900">İdarə paneli</h1>
            <div className="w-10" />
          </div>
        )}

        <main className="p-4 md:p-6">
          {/* Only show breadcrumb if sidebar should be shown */}
          {shouldShowSidebar && <DashboardBreadcrumb />}
          {children}
        </main>
      </div>
    </div>
  );
}