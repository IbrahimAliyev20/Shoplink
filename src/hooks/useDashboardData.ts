import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getReportStatsQuery,
  getStoreStatsQuery,
  getLastActivitiesQuery,
} from "@/services/Seller-services/dashboard/queries";
import { MetricData } from "@/utils/static";

export interface ChartDataPoint {
  label: string;
  value: number;
}

export function useDashboardData() {
  const { data: storeStats } = useQuery(getStoreStatsQuery());
  const { data: reportStats } = useQuery(getReportStatsQuery());
  const { data: lastActivities } = useQuery(getLastActivitiesQuery());

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

  return {
    storeStats,
    reportStats,
    lastActivities,
    monthlyChartData,
    dashboardMetrics,
  };
}
