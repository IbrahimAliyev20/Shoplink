import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Check, CheckCircle2, LoaderCircle, Truck, UserIcon } from "lucide-react";

interface Activity {
  message: string;
  timestamp?: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

// 1. Bütün statusları və onlara uyğun rəngləri bir obyektdə təyin edirik.
// Bu, kodu daha səliqəli və idarəolunan edir.
const statusConfig = {
  STATUS_1: {
    keyword: "Yeni qeydiyyat var",
    color: "bg-[#5856D6]", // Yaşıl
    icon: <UserIcon className="w-5 h-5 text-white" />,
  },
  STATUS_2: {
    keyword: "adlı istifadəçidən sifarişiniz var",
    color: "bg-[#AF52DE]",
    icon: <Box className="w-5 h-5 text-white" />,
  },
  STATUS_3: {
    keyword: "nömrəli sifarişi təsdiqləndi",
    color: "bg-[#007AFF]", 
    icon: <Check className="w-5 h-5 text-white" />,
  },
  STATUS_4: {
    keyword: "sifariş hazırlanır",
    color: "bg-[#FF9500]", 
    icon: <LoaderCircle className="w-5 h-5 animate-spin text-white" />,
  },
  STATUS_5: {
    keyword: "nömrəli sifariş yoldadır",
    color: "bg-[#FFCC00]", 
    icon: <Truck className="w-5 h-5 text-white" />,
  },
  STATUS_6: {
    keyword: "nömrəli sifariş tamamlandı",
    color: "bg-[#34C759]", 
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
  },
};

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const getIconColorByMessage = (message: string): string => {
    for (const key in statusConfig) {
      if (message.includes(statusConfig[key as keyof typeof statusConfig].keyword)) {
        return statusConfig[key as keyof typeof statusConfig].color;
      }
    }
    return "bg-gray-400";
  };

  return (
    <Card className="bg-white shadow-none border-gray-100 h-[420px] max-md:h-[350px] flex flex-col">
      <CardHeader className="max-md:p-4 flex-shrink-0">
        <CardTitle className="text-lg font-medium text-gray-900 max-md:text-base">
          Son fəaliyyətlər
        </CardTitle>
      </CardHeader>
      <CardContent className="max-md:p-4 max-md:pt-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 max-md:space-y-3 pr-2">
          {activities.map((activity, index) => {
            const iconColor = getIconColorByMessage(activity.message);
            const key = Object.keys(statusConfig).find(key => activity.message.includes(statusConfig[key as keyof typeof statusConfig].keyword));

            return (
              <div
                key={index}
                className="flex items-start space-x-3 max-md:space-x-2"
              >
                <div
                  className={`w-10 h-10 ${iconColor} rounded-full flex items-center justify-center flex-shrink-0 max-md:w-6 max-md:h-6`}
                >
                  {statusConfig[key as keyof typeof statusConfig].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium max-md:text-xs max-md:leading-tight">
                    {activity.message}{" "}
                  </p>
                  {activity.timestamp && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activity.timestamp}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}