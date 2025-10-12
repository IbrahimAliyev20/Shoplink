"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamic imports with loading states
export const DynamicRichTextEditor = dynamic(
  () => import("@/components/shared/editor"),
  {
    loading: () => (
      <div>
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-32 w-full" />
      </div>
    ),
    ssr: false, // Disable SSR for heavy components
  }
);

export const DynamicRevenueChart = dynamic(
  () => import("@/components/dashboard/RevenueChart"),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    ),
    ssr: false,
  }
);

export const DynamicRecentActivities = dynamic(
  () => import("@/components/dashboard/RecentActivities"),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);

export const DynamicLastOrders = dynamic(
  () => import("@/components/dashboard/panel/LastOrders"),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3 border rounded">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);
