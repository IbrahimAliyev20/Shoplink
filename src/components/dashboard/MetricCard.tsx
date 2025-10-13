import React from "react";
import Image from "next/image";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import { User, Box, CreditCard, Check, Package } from "lucide-react";
import { MetricData } from "@/utils/static";

const icons = {
  dollar: <Image src="/images/moneybag.svg" alt="moneybag" width={20} height={20} className="h-5 w-5 text-gray-500" />,
  users: <Box className="h-5 w-5 text-[#B927D6]" />,
  userCheck: <Box className="h-5 w-5 text-[#007AFF]" />,
  zap: <User className="h-5 w-5 text-[#5856D6]" />,
  Box: <Package className="h-5 w-5 text-white" />,
  check: <Check className="h-5 w-5 text-white" />,
  creditCard: <CreditCard className="h-5 w-5 text-white" />,
  user: <User className="h-5 w-5 text-white" />,
};

interface MetricCardProps {
  metric: MetricData;
  index: number;
}

const cardColors = [
  { icon: "bg-pink-100", iconColor: "text-pink-600" },
  { icon: "bg-purple-100", iconColor: "text-purple-600" },
  { icon: "bg-blue-100", iconColor: "text-blue-600" },
  { icon: "bg-indigo-100", iconColor: "text-indigo-600" },
];

export default function MetricCard({ metric, index }: MetricCardProps) {
  const colors = cardColors[index % cardColors.length];

  return (
    <Card className="bg-white shadow-none border-gray-100">
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
}
