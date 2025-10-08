import React from "react";
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
import { ChartDataPoint } from "@/hooks/useDashboardData";

type Timeframe = "monthly" | "weekly" | "daily";

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

interface RevenueChartProps {
  chartData: ChartDataPoint[];
  timeframe: Timeframe;
  onTimeframeChange: (value: Timeframe) => void;
}

export default function RevenueChart({ chartData, timeframe, onTimeframeChange }: RevenueChartProps) {
  return (
    <Card className="bg-white shadow-none border-gray-100 h-[420px] max-md:h-[350px]">
      <CardHeader className="flex flex-row items-center justify-between max-md:p-4">
        <CardTitle className="text-lg font-medium text-gray-900 max-md:text-base">
          Gəlir qrafiki
        </CardTitle>
        <Select
          value={timeframe}
          onValueChange={onTimeframeChange}
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
            data={chartData}
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
  );
}
