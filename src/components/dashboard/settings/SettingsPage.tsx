"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Shield, CreditCard, CircleUser, Info, Instagram } from "lucide-react";
import { PersonalInfo, StoreInfo, Security, PaymentMethods } from "./tabs";
import { useQuery } from "@tanstack/react-query";
import { getUserQuery } from "@/services/auth/queries";
import SupportDashboard from "./tabs/SupportDashboard";
import SocialMediaDashboard from "./tabs/SocialMediaDashboard";
import Subscription from "@/app/dashboard/subscription/page";

const navItems = [
  { value: "personal", label: "Şəxsi məlumatlar", icon: CircleUser },
  { value: "store", label: "Mağaza məlumatları", icon: Store },
  { value: "security", label: "Təhlükəsizlik", icon: Shield },
  { value: "payment", label: "Ödəniş metodları", icon: CreditCard },
  { value: "social", label: "Sosial media", icon: Instagram },
  { value: "subscription", label: "Abunəlik", icon: CreditCard },
  { value: "support", label: "Dəstək", icon: Info },
];

const SettingsPage = () => {
  const { data: user } = useQuery(getUserQuery());

  return (
    <div className="min-h-screen bg-gray-50/50 max-md:pb-20">
      <div>
        <div className="mb-8 max-md:mb-6">
          <h1 className="text-3xl font-medium text-black max-md:text-2xl">
            Tənzimlənmələr
          </h1>
        </div>

        <Tabs
          defaultValue="personal"
          orientation="vertical"
          className="w-full max-md:orientation-horizontal"
        >
          {/* ----- ƏSAS DƏYİŞİKLİK BU SƏTİRDƏDİR ----- */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] lg:gap-8 items-start">
            
            {/* Sidebar (sol menyu) - `col-span-1` və `lg:w-69` silindi */}
            <div className="rounded-xl w-full flex-shrink-0 bg-white max-md:order-2 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:z-50 max-md:w-full max-md:bg-white max-md:h-16 max-md:shadow-[0_-4px_12px_rgba(0,0,0,0.06)] border border-[#F3F2F8]">
              <TabsList className="w-full h-auto flex flex-col items-start justify-start p-4 rounded-xl bg-white max-md:flex-row max-md:items-center max-md:justify-between max-md:overflow-x-auto max-md:p-0 max-md:rounded-none max-md:border-t max-md:h-16 gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className="bg-white w-full justify-center md:justify-start items-center gap-3 px-4 py-3 text-base font-medium rounded-lg text-gray-600 data-[state=active]:bg-[#F2F4F8]/80 data-[state=active]:text-black data-[state=active]:shadow-sm transition-all duration-200 hover:bg-[#F2F4F8]/60 hover:text-gray-800 max-md:flex-1 max-md:whitespace-nowrap max-md:text-sm max-md:px-0 max-md:py-0 max-md:gap-2 "
                    >
                      <Icon className="h-5 w-5 max-md:h-10 max-md:w-10" />
                      <span className="max-md:hidden ">{item.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Content (sağ tərəf) - `col-span-3` silindi */}
            <div className="max-md:order-1">
              <div>
                <TabsContent value="personal">
                  {user?.data && <PersonalInfo user={user.data} />}
                </TabsContent>
                <TabsContent value="store">
                  <StoreInfo />
                </TabsContent>
                <TabsContent value="security">
                  <Security />
                </TabsContent>
                <TabsContent value="payment">
                  <PaymentMethods />
                </TabsContent>
                <TabsContent value="social">
                  <SocialMediaDashboard />
                </TabsContent>
                <TabsContent value="subscription">
                  <Subscription />
                </TabsContent>
                <TabsContent value="support">
                  <SupportDashboard />
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;