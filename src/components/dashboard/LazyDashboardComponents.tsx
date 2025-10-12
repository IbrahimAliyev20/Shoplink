"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy dashboard components
const RevenueChart = lazy(() => import("@/components/dashboard/RevenueChart"));
const RecentActivities = lazy(() => import("@/components/dashboard/RecentActivities"));
const LastOrders = lazy(() => import("@/components/dashboard/panel/LastOrders"));

interface LazyRevenueChartProps {
  chartData: Array<{ label: string; value: number }>;
  timeframe: "monthly" | "weekly" | "daily";
  onTimeframeChange: (timeframe: "monthly" | "weekly" | "daily") => void;
}

export function LazyRevenueChart(props: LazyRevenueChartProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-lg shadow p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      }
    >
      <RevenueChart {...props} />
    </Suspense>
  );
}

interface LazyRecentActivitiesProps {
  activities: Array<{ id: string; message: string; timestamp: string }>;
}

export function LazyRecentActivities(props: LazyRecentActivitiesProps) {
  return (
    <Suspense
      fallback={
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
      }
    >
      <RecentActivities {...props} />
    </Suspense>
  );
}

export function LazyLastOrders() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <LastOrders />
    </Suspense>
  );
}
