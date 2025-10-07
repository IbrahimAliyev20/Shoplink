"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSubscribesQuery } from "@/services/Seller-services/subscribe/queires";
import { useQuery } from "@tanstack/react-query";
import { usePlanPaymentMutation } from "@/services/Seller-services/subscribe/mutations";

const Subscription = () => {
  
  const [selectedDuration, setSelectedDuration] = useState<
    "1-month" | "6-month" | "12-month"
  >("1-month");
  const { data: subscribes } = useQuery(getSubscribesQuery());
  const planPaymentMutation = usePlanPaymentMutation();

  const monthlyPlans =
    subscribes?.filter((plan) => plan.type === "aylıq") || [];
  const commissionPlan = subscribes?.find(
    (plan) => plan.type === "Hər satışdan"
  );

  const pricing = {
    "1-month": monthlyPlans.find((plan) => plan.months === 1)?.price || 0,
    "6-month": monthlyPlans.find((plan) => plan.months === 6)?.price || 0,
    "12-month": monthlyPlans.find((plan) => plan.months === 12)?.price || 0,
  };

  const durationLabels = {
    "1-month":
      monthlyPlans.find((plan) => plan.months === 1)?.months + " aylıq" ||
      "1 aylıq",
    "6-month":
      monthlyPlans.find((plan) => plan.months === 6)?.months + " aylıq" ||
      "6 aylıq",
    "12-month":
      monthlyPlans.find((plan) => plan.months === 12)?.months + " aylıq" ||
      "12 aylıq",
  };

  const handleMonthlyPlanSubscribe = () => {
    const selectedPlan = monthlyPlans.find((plan) => {
      if (selectedDuration === "1-month") return plan.months === 1;
      if (selectedDuration === "6-month") return plan.months === 6;
      if (selectedDuration === "12-month") return plan.months === 12;
      return false;
    });

    if (selectedPlan) {
      const formData = new FormData();
      formData.append("plan_id", selectedPlan.id.toString());
      planPaymentMutation.mutate(formData);
    }
  };

  const handleCommissionPlanSubscribe = () => {
    if (commissionPlan) {
      const formData = new FormData();
      formData.append("plan_id", commissionPlan.id.toString());
      planPaymentMutation.mutate(formData);
    }
  };
  return (
    <div className="bg-white  mx-auto px-4 py-8">
      <div className=" mb-12">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">Tariflər</h1>
        <p className="text-lg text-gray-600  mx-auto">
          Sənə uyğun olan tarif planını seç və abuna olaraq öz onlayn e-ticarət
          mağazanı yarat.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8  mx-auto">
        <Card className="relative bg-[#FBFDFF] border-0 flex flex-col justify-between">
          <CardHeader className="pb-4 ">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-medium text-gray-800">
                Abunəlik planı
              </CardTitle>
              <Badge className="bg-[#FFE7FE] text-[#FF13F0] border-0 rounded-full px-4 py-1 font-medium text-sm">
                1 aylıq
              </Badge>
            </div>
            <div className="bg-[#F3F2F8] rounded-4xl py-2 px-2 mt-4 flex w-fit ">
              {(["1-month", "6-month", "12-month"] as const).map(
                (duration) => (
                  <div key={duration} className="flex items-center">
                    <button
                      onClick={() => setSelectedDuration(duration)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-1 ${
                        selectedDuration === duration
                          ? "bg-white text-gray-800 font-semibold shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {durationLabels[duration]}
                    </button>
                  </div>
                )
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span className="text-4xl font-medium text-gray-800">
                {pricing[selectedDuration]} AZN
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {monthlyPlans.find((plan) => plan.months === 1)?.description ||
                "Aylıq sabiq qiymət ödəyərək öz onlayn mağazanı aç və limitsiz satış et. Satışlardan əlavə faiz tutulmur, qazancın səndə qalır."}
            </p>
             <Button 
               onClick={handleMonthlyPlanSubscribe}
               disabled={planPaymentMutation.isPending}
               className="w-full bg-gray-800 hover:bg-gray-700 text-white py-5 rounded-lg font-medium disabled:opacity-50"
             >
               {planPaymentMutation.isPending ? "Yüklənir..." : "Abunə ol"}
             </Button>
          </CardContent>
        </Card>

        <Card className="relative bg-[#FBFDFF] border-0 flex flex-col justify-between">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-medium text-gray-800">
                {commissionPlan?.title || "Faizli plan"}
              </CardTitle>
              <Badge className="bg-[#FFE7FE] text-[#FF13F0] border-0 rounded-full px-4 py-1 font-medium text-sm">
                {commissionPlan?.type || "Hər satışdan"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span className="text-4xl font-medium text-gray-800">
                {commissionPlan?.price || 3.5} %
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {commissionPlan?.description ||
                "Bu planda aylıq sabit ödəniş yoxdur. Yalnız satış olduqda 3.5% komissiya ödənilir. Satış etmədikdə heç bir xərcin olmur."}
            </p>
             <Button 
               onClick={handleCommissionPlanSubscribe}
               disabled={planPaymentMutation.isPending}
               className="w-full bg-gray-800 hover:bg-gray-700 text-white py-5 rounded-lg font-medium disabled:opacity-50"
             >
               {planPaymentMutation.isPending ? "Yüklənir..." : "Abunə ol"}
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
