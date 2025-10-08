"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PersonalInfo from "./tabs/PersonalInfo";
import Addresses from "./tabs/addrestab/Addresses";
import Security from "./tabs/Security";
import SupportMarket from "./tabs/SupportMarket";
import Orders from "./tabs/ordertab/Orders";
import { LogOut, CircleUser, Box, MapPin, Shield, Info } from "lucide-react";
import { UserData } from "@/types";
import { logoutAction } from "@/services/auth/server-actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function AccountPage({ user }: { user: UserData }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  const { market: marketSlug } = useParams();
  
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAction ();
      router.push(`/${marketSlug}`);
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 max-sm:py-4">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-2">
        <Tabs defaultValue="personal" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-sm:gap-4">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm max-sm:p-4 max-sm:rounded-xl">
                <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0 gap-2 max-sm:gap-1.5">
                  <TabsTrigger
                    value="personal"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start text-[#565355] data-[state=active]:bg-[#F3F2F8] data-[state=active]:text-[#242123] max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <CircleUser className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    <span className="font-medium max-sm:text-sm">
                      Şəxsi məlumatlar
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start text-[#565355] data-[state=active]:bg-[#F3F2F8] data-[state=active]:text-[#242123] max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <Box className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    <span className="font-medium max-sm:text-sm">
                      Sifarişlərim
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="addresses"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start text-[#565355] data-[state=active]:bg-[#F3F2F8] data-[state=active]:text-[#242123] max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <MapPin className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    <span className="font-medium max-sm:text-sm">
                      Ünvanlarım
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start text-[#565355] data-[state=active]:bg-[#F3F2F8] data-[state=active]:text-[#242123] max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <Shield className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    <span className="font-medium max-sm:text-sm">
                      Təhlükəsizlik
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start text-[#565355] data-[state=active]:bg-[#F3F2F8] data-[state=active]:text-[#242123] max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <Info className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    <span className="font-medium max-sm:text-sm">Dəstək</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-4 max-sm:mt-3">
                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start text-black transition-colors hover:bg-gray-100 max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <LogOut className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    <span className="font-medium max-sm:text-sm">
                      Hesabdan çıxış
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm max-sm:p-4 max-sm:rounded-xl">
                <TabsContent value="personal">
                  <PersonalInfo user={user} />
                </TabsContent>
                <TabsContent value="orders">
                  <Orders />
                </TabsContent>
                <TabsContent value="addresses">
                  <Addresses />
                </TabsContent>
                <TabsContent value="security">
                  <Security />
                </TabsContent>
                <TabsContent value="support">
                  <SupportMarket />
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
        
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-md max-sm:max-w-[90vw] max-sm:mx-4">
            <div className="text-center ">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 max-sm:w-12 max-sm:h-12 max-sm:mb-3">
                 <svg
                    className="w-8 h-8 text-red-600 max-sm:w-6 max-sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
               </div>
               <h2 className="text-lg font-medium text-gray-900 mb-10 max-sm:text-base max-sm:mb-3">
                  Hesabdan çıxmaqda əminsiniz?
               </h2>
               <div className="  grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleCancelLogout}
                    variant="outline"
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 max-sm:px-4 max-sm:py-2 max-sm:text-sm"
                  >
                    Ləğv et
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white max-sm:px-4 max-sm:py-2 max-sm:text-sm"
                  >
                    Hesabdan çıx
                  </Button>
               </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AccountPage;