"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
import { User,  Box, CreditCard, Check, Package } from "lucide-react";
import { recentActivities } from "@/utils/static";
import LastOrders from "@/components/dashboard/panel/LastOrders";
import { useQuery } from "@tanstack/react-query";
import {
  getReportStatsQuery,
  getStoreStatsQuery,
} from "@/services/Seller-services/dashboard/queries";
import { MetricData } from "@/utils/static";

type Timeframe = "monthly" | "weekly" | "daily";

const icons = {
  dollar: <Image src="/images/moneybag.svg" alt="moneybag" width={20} height={20} className="h-5 w-5 text-gray-500" />,
  users: <Box className="h-5 w-5 text-gray-500" />,
  userCheck: <Box className="h-5 w-5 text-gray-500" />,
  zap: <User className="h-5 w-5 text-gray-500" />,
  Box: <Package className="h-5 w-5 text-white" />,
  check: <Check className="h-5 w-5 text-white" />,
  creditCard: <CreditCard className="h-5 w-5 text-white" />,
  user: <User className="h-5 w-5 text-white" />,
};
export interface ChartDataPoint {
  label: string;
  value: number;
}

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
  const { data: reportStats } = useQuery(getReportStatsQuery());

  const monthlyChartData: ChartDataPoint[] = useMemo(() => {
    const currentYear = new Date().getFullYear().toString();
    const yearData = reportStats?.[currentYear];

    if (!yearData) {
      return [
        { label: "Yanvar", value: 0 },
        { label: "Fevral", value: 0 },
        { label: "Mart", value: 0 },
        { label: "Aprel", value: 0 },
        { label: "May", value: 0 },
        { label: "İyun", value: 0 },
        { label: "İyul", value: 0 },
        { label: "Avqust", value: 0 },
        { label: "Sentyabr", value: 0 },
        { label: "Oktyabr", value: 0 },
        { label: "Noyabr", value: 0 },
        { label: "Dekabr", value: 0 },
      ];
    }

    return [
      {
        label: "Yanvar",
        value: typeof yearData.January === "number" ? yearData.January : 0,
      },
      {
        label: "Fevral",
        value: typeof yearData.February === "number" ? yearData.February : 0,
      },
      {
        label: "Mart",
        value: typeof yearData.March === "number" ? yearData.March : 0,
      },
      {
        label: "Aprel",
        value: typeof yearData.April === "number" ? yearData.April : 0,
      },
      {
        label: "May",
        value: typeof yearData.May === "number" ? yearData.May : 0,
      },
      {
        label: "İyun",
        value: typeof yearData.June === "number" ? yearData.June : 0,
      },
      {
        label: "İyul",
        value: typeof yearData.July === "number" ? yearData.July : 0,
      },
      {
        label: "Avqust",
        value: typeof yearData.August === "number" ? yearData.August : 0,
      },
      {
        label: "Sentyabr",
        value: typeof yearData.September === "number" ? yearData.September : 0,
      },
      {
        label: "Oktyabr",
        value: typeof yearData.October === "number" ? yearData.October : 0,
      },
      {
        label: "Noyabr",
        value: typeof yearData.November === "number" ? yearData.November : 0,
      },
      {
        label: "Dekabr",
        value: typeof yearData.December === "number" ? yearData.December : 0,
      },
    ];
  }, [reportStats]);

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
      default:
        return monthlyChartData;
    }
  }, [timeframe, monthlyChartData]);

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
                className="bg-white shadow-none border-gray-100"
              >
                <CardHeader className="flex flex-row items-center gap-5 space-y-0 pb-2 max-md:p-3">
                <div
                    className={`h-12 w-12 rounded-lg ${colors.icon} flex items-center justify-center max-md:h-8 max-md:w-8 flex-shrink-0`}
                  >
                    <div className={colors.iconColor}>{icons[metric.icon]}</div>
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-600 max-md:text-xs max-md:leading-tight">
                    {metric.title}
                    <div className="text-xl font-medium text-gray-900 max-md:text-lg">
                    {metric.value}
                  </div>
                  </CardTitle>
           
                </CardHeader>
         
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-md:gap-4">
          <Card className="lg:col-span-2 bg-white shadow-none border-gray-100">
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

          <Card className="lg:col-span-2 bg-white shadow-none border-gray-100">
            <CardHeader className="max-md:p-4">
              <CardTitle className="text-lg font-semibold text-gray-900 max-md:text-base">
                Son fəaliyyətlər
              </CardTitle>
            </CardHeader>
            <CardContent className="max-md:p-4 max-md:pt-0">
              <div className="space-y-4 max-md:space-y-3">
                {recentActivities.map((activity, index) => {
                  const iconColors = [
                    "bg-[#AF52DE] ",
                    "bg-[#34C759] ",
                    "bg-[#34C759] " ,
                    "bg-[#5856D6] ",
                    "bg-[#5856D6] ",
                    "bg-[#FF13F0] ",
                  ];
                  const iconColor = iconColors[index % iconColors.length];

                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 max-md:space-x-2"
                    >
                      <div
                        className={`w-10 h-10 ${iconColor} rounded-full flex items-center justify-center flex-shrink-0 max-md:w-6 max-md:h-6`}
                      >
                        {icons[activity.icon as keyof typeof icons]}
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
