"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSubscribesQuery } from "@/services/Seller-services/subscribe/queires";
import { useQuery } from "@tanstack/react-query";
import { usePlanPaymentMutation } from "@/services/Seller-services/subscribe/mutations";
import { getUserQuery } from "@/services/auth/queries";

const Subscription = () => {
  const { data: user } = useQuery(getUserQuery());
  const userPlanId = user?.data?.plan_id;

  const isUserSubscribed = !!userPlanId;

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

  const activeMonthlyPlan = useMemo(
    () => monthlyPlans.find((plan) => plan.id === userPlanId),
    [monthlyPlans, userPlanId]
  );
  const isCommissionActive = useMemo(
    () => (commissionPlan ? commissionPlan.id === userPlanId : false),
    [commissionPlan, userPlanId]
  );

  useEffect(() => {
    if (activeMonthlyPlan?.months === 1) setSelectedDuration("1-month");
    else if (activeMonthlyPlan?.months === 6) setSelectedDuration("6-month");
    else if (activeMonthlyPlan?.months === 12) setSelectedDuration("12-month");
  }, [activeMonthlyPlan]);

  const pricing = {
    "1-month": monthlyPlans.find((plan) => plan.months === 1)?.price || 0,
    "6-month": monthlyPlans.find((plan) => plan.months === 6)?.price || 0,
    "12-month": monthlyPlans.find((plan) => plan.months === 12)?.price || 0,
  };

  const durationLabels = {
    "1-month": "1 Aylıq",
    "6-month": "6 Aylıq",
    "12-month": "1 İllik",
  };

  // This useMemo is not strictly needed for the button text anymore, but can be kept for other uses
  const activeMonthlyLabel = useMemo(() => {
    if (!activeMonthlyPlan) return undefined;
    if (activeMonthlyPlan.months === 1) return durationLabels["1-month"];
    if (activeMonthlyPlan.months === 6) return durationLabels["6-month"];
    if (activeMonthlyPlan.months === 12) return durationLabels["12-month"];
    return undefined;
  }, [activeMonthlyPlan, durationLabels]);

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
    <div className="bg-white mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">Tariflər</h1>
        <p className="text-lg text-gray-600 mx-auto">
          Sənə uyğun olan tarif planını seç və abuna olaraq öz onlayn e-ticarət
          mağazanı yarat.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mx-auto">
        <Card className={`relative border border-[#F3F2F8] flex flex-col justify-between transition-all duration-300 rounded-3xl p-4 ${
            selectedDuration === "6-month"
              ? "bg-[#1A202C] text-white"
              : "bg-[#FBFDFF] text-gray-800"
          }`}
        >
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle
                className={`text-xl font-medium ${
                  selectedDuration === "6-month"
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                Abunəlik planı
              </CardTitle>
              <Badge
                className="bg-red-100 text-red-600 border-0 rounded-full px-4 py-1 font-medium text-sm">
                {durationLabels[selectedDuration]}
              </Badge>
            </div>
            <div
              className={`mt-4 flex w-fit transition-all duration-300 ${
                selectedDuration === "6-month"
                  ? "bg-[#2D3748] rounded-full p-1"
                  : "bg-[#F3F2F8] rounded-2xl p-1"
              }`}
            >
              {(["1-month", "6-month", "12-month"] as const).map((duration) => (
                <div key={duration} className="flex items-center">
                  <button
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 flex-1 ${
                      selectedDuration === duration
                        ? "bg-white text-gray-900 font-semibold shadow-sm"
                        : selectedDuration === "6-month"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-500 hover:text-gray-700"
                    } ${
                      selectedDuration === "6-month"
                        ? "rounded-full"
                        : "rounded-xl"
                    }`}
                  >
                    {durationLabels[duration]}
                  </button>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span
                className={`text-5xl font-medium transition-colors duration-300 ${
                  selectedDuration === "6-month"
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                {pricing[selectedDuration]} AZN
              </span>
            </div>
            <p
              className={`leading-relaxed transition-colors duration-300 ${
                selectedDuration === "6-month"
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {monthlyPlans.find((plan) => plan.months === 1)?.description ||
                "Aylıq sabiq qiymət ödəyərək öz onlayn mağazanı aç və limitsiz satış et. Satışlardan əlavə faiz tutulmur, qazancın səndə qalır."}
            </p>
            {/* === DÜZƏLİŞLƏR BU DÜYMƏDƏDİR === */}
            <Button
              onClick={handleMonthlyPlanSubscribe}
              disabled={planPaymentMutation.isPending || isUserSubscribed}
              className={`w-full py-6  bg-black text-white rounded-[16px] font-medium disabled:opacity-100  duration-300 ${
                activeMonthlyPlan || selectedDuration === "6-month"
                  ? "bg-white  hover:bg-white/90 text-black disabled:opacity-100 border border-[#E5E5EA]"
                  : "bg-black hover:bg-black/90 text-white "
              }`}
            >
              {planPaymentMutation.isPending
                ? "Yüklənir..."
                : activeMonthlyPlan
                ? "Cari planınız"
                : "Abunə ol"}
            </Button>
          </CardContent>
        </Card>

        {/* === FAİZLİ PLAN KARTI === */}
        <Card className="relative bg-[#FBFDFF] border border-[#F3F2F8] flex flex-col justify-between p-4 rounded-3xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-medium text-gray-800">
                {commissionPlan?.title || "Faizli plan"}
              </CardTitle>
              <Badge className="bg-red-100 text-red-600 border-0 rounded-full px-4 py-1 font-medium text-sm">
                {commissionPlan?.type || "Hər satışdan"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 mt-16">
            <div>
              <span className="text-5xl font-medium text-gray-800">
                {commissionPlan?.price || 3.5} %
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {commissionPlan?.description ||
                "Bu planda aylıq sabit ödəniş yoxdur. Yalnız satış olduqda 3.5% komissiya ödənilir. Satış etmədikdə heç bir xərcin olmur."}
            </p>
            <Button
              onClick={handleCommissionPlanSubscribe}
              disabled={planPaymentMutation.isPending || isUserSubscribed}
              className="w-full bg-black hover:bg-black/90 text-base text-white py-6 rounded-[16px] font-medium disabled:bg-[#504D4F] disabled:opacity-100"
            >
              {planPaymentMutation.isPending
                ? "Yüklənir..."
                : isCommissionActive
                ? "Cari planınız"
                : "Abunə ol"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
