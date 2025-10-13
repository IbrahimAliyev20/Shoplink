"use client";

import React, { useState, useMemo } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import {
  DynamicRevenueChart,
  DynamicRecentActivities,
  DynamicLastOrders,
} from "@/components/dynamic/DynamicComponents";
import { useDashboardData } from "@/hooks/useDashboardData";

type Timeframe = "monthly" | "weekly" | "daily";

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const { dashboardMetrics, monthlyChartData, lastActivities } =
    useDashboardData();

  const activeChartData = useMemo(() => {
    switch (timeframe) {
      default:
        return monthlyChartData;
    }
  }, [timeframe, monthlyChartData]);
  console.log(dashboardMetrics);

  return (
    <div>
      <div className="space-y-8 max-md:space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 max-md:text-2xl">
            Panel
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-md:grid-cols-2 max-md:gap-3">
          {dashboardMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-md:gap-4">
          <DynamicRevenueChart
            chartData={activeChartData}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <DynamicRecentActivities activities={lastActivities?.logs || []} />
        </div>
        <DynamicLastOrders />
      </div>
    </div>
  );
}
