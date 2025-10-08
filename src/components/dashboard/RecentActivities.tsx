import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  message: string;
  timestamp?: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const iconColors = [
    "bg-[#AF52DE]",
    "bg-[#34C759]",
    "bg-[#34C759]",
    "bg-[#5856D6]",
    "bg-[#5856D6]",
    "bg-[#FF13F0]",
  ];

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
            const iconColor = iconColors[index % iconColors.length];

            return (
              <div
                key={index}
                className="flex items-start space-x-3 max-md:space-x-2"
              >
                <div
                  className={`w-10 h-10 ${iconColor} rounded-full flex items-center justify-center flex-shrink-0 max-md:w-6 max-md:h-6`}
                >
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
