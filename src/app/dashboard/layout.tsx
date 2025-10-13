'use client';

import MobileSidebar from '@/components/dashboard/MobileSidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb';
import React, { useState, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
     
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapsed={setSidebarCollapsed}
        />
      </div>

      <div className={`transition-all duration-300 ease-in-out ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="lg:hidden bg-white  px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30">
          <MobileSidebar />
          <h1 className="text-lg font-semibold text-gray-900">İdarə paneli</h1>
          <div className="w-10" />
        </div>

        <main className="p-4 md:p-6">
          <DashboardBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}