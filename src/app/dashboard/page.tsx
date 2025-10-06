"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { DollarSign, User, UserRoundPlus, Activity } from "lucide-react";
import {
  monthlyChartData,
  weeklyChartData,
  dailyChartData,
  recentActivities,
} from "@/utils/static";
import LastOrders from "@/components/dashboard/panel/LastOrders";
import { useQuery } from "@tanstack/react-query";
import { getStoreStatsQuery } from "@/services/Seller-services/dashboard/queries";
import { MetricData } from "@/utils/static";





type Timeframe = "monthly" | "weekly" | "daily";

const icons = {
  dollar: <DollarSign className="h-5 w-5 text-gray-500" />,
  users: <User className="h-5 w-5 text-gray-500" />,
  userCheck: <UserRoundPlus className="h-5 w-5 text-gray-500" />,
  zap: <Activity className="h-5 w-5 text-gray-500" />,
};

interface RechartsTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: RechartsTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;

    return (
      <div className="bg-white p-3 rounded-lg border shadow-lg">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-bold">{`${value.toLocaleString()} AZN`}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const { data: storeStats } = useQuery(getStoreStatsQuery());

  const dashboardMetrics: MetricData[] = [
    {
      title: "Ümumi gəlir",
      value: storeStats?.total_amount.toString() || "0",
      icon: "dollar",
    },
    {
      title: "Bugünkü sifarişlər",
      value: storeStats?.todays_order.toString() || "0",
      icon: "users",
    },
    {
      title: "Aktiv sifarişlər",
      value: storeStats?.active_order.toString() || "0",
      icon: "userCheck",
    },
    {
      title: "Aktiv istifadəçilər",
      value: storeStats?.total_users.toString() || "0",
      icon: "zap",
    },
  ];

  const activeChartData = useMemo(() => {
    switch (timeframe) {
      case "weekly":
        return weeklyChartData;
      case "daily":
        return dailyChartData;
      default:
        return monthlyChartData;
    }
  }, [timeframe]);

  return (
    <div>
      <div className="space-y-8 max-md:space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 max-md:text-2xl">
            Panel
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-md:grid-cols-2 max-md:gap-3">
          {dashboardMetrics.map((metric, index) => {
              const cardColors = [
                { icon: "bg-pink-100", iconColor: "text-pink-600" },
                { icon: "bg-purple-100", iconColor: "text-purple-600" },
                { icon: "bg-blue-100", iconColor: "text-blue-600" },
                { icon: "bg-indigo-100", iconColor: "text-indigo-600" },
              ];
            const colors = cardColors[index % cardColors.length];

            return (
              <Card
                key={index}
                className="bg-white shadow-none border-gray-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 max-md:p-3">
                  <CardTitle className="text-sm font-medium text-gray-600 max-md:text-xs max-md:leading-tight">
                    {metric.title}
                  </CardTitle>
                  <div
                    className={`h-12 w-12 rounded-lg ${colors.icon} flex items-center justify-center max-md:h-8 max-md:w-8 flex-shrink-0`}
                  >
                    <div className={colors.iconColor}>{icons[metric.icon]}</div>
                  </div>
                </CardHeader>
                <CardContent className="max-md:p-3 max-md:pt-0">
                  <div className="text-2xl font-bold text-gray-900 max-md:text-lg">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-md:gap-4">
          <Card className="lg:col-span-2 bg-white shadow-none border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between max-md:p-4">
              <CardTitle className="text-lg font-semibold text-gray-900 max-md:text-base">
                Gəlir qrafiki
              </CardTitle>
              <Select
                value={timeframe}
                onValueChange={(value: Timeframe) => setTimeframe(value)}
              >
                <SelectTrigger className="w-[100px] h-8 text-sm max-md:w-[80px] max-md:text-xs">
                  <SelectValue placeholder="6 ay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">6 ay</SelectItem>
                  <SelectItem value="weekly">Həftəlik</SelectItem>
                  <SelectItem value="daily">Günlük</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="h-[350px] w-full p-4 max-md:h-[250px] max-md:p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activeChartData}
                  margin={{ top: 5, right: 20, bottom: 20, left: 30 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#8B5CF6"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    dx={-10}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "#8B5CF6",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-white shadow-none border-gray-200">
            <CardHeader className="max-md:p-4">
              <CardTitle className="text-lg font-semibold text-gray-900 max-md:text-base">
                Son fəaliyyətlər
              </CardTitle>
            </CardHeader>
            <CardContent className="max-md:p-4 max-md:pt-0">
              <div className="space-y-4 max-md:space-y-3">
                {recentActivities.map((activity, index) => {
                  const iconColors = [
                    "bg-purple-100 text-purple-600",
                    "bg-green-100 text-green-600",
                    "bg-green-100 text-green-600",
                    "bg-blue-100 text-blue-600",
                    "bg-blue-100 text-blue-600",
                    "bg-pink-100 text-pink-600",
                  ];
                  const iconColor = iconColors[index % iconColors.length];

                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 max-md:space-x-2"
                    >
                      <div
                        className={`w-8 h-8 ${iconColor} rounded-full flex items-center justify-center flex-shrink-0 max-md:w-6 max-md:h-6`}
                      >
                        <div className="w-2 h-2 bg-current rounded-full max-md:w-1.5 max-md:h-1.5"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium max-md:text-xs max-md:leading-tight">
                          {activity.company}{" "}
                          {activity.description && `— ${activity.description}`}
                        </p>
                        {activity.time && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {activity.time}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <LastOrders />
      </div>
    </div>
  );
}
