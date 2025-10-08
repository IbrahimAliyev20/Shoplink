"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PersonalInfo from "./tabs/PersonalInfo";
import Addresses from "./tabs/addrestab/Addresses";
import Security from "./tabs/Security";
import Support from "./tabs/Support";
import Orders from "./tabs/ordertab/Orders";
import { LogOut } from "lucide-react";
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
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <svg
                      className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-medium max-sm:text-sm">
                      Şəxsi məlumatlar
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                     <svg
                      className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span className="font-medium max-sm:text-sm">
                      Sifarişlərim
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="addresses"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <svg
                      className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium max-sm:text-sm">
                      Ünvanlarım
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <svg
                      className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="font-medium max-sm:text-sm">
                      Təhlükəsizlik
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left justify-start data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 max-sm:px-3 max-sm:py-2.5 max-sm:gap-2"
                  >
                    <svg
                      className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
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
                  <Support />
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
        
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-md max-sm:max-w-[90vw] max-sm:mx-4">
            <div className="text-center p-6 max-sm:p-4">
               <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4 max-sm:w-12 max-sm:h-12 max-sm:mb-3">
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
               <h2 className="text-lg font-semibold text-gray-900 mb-4 max-sm:text-base max-sm:mb-3">
                  Hesabdan çıxmaqda əminsiniz?
               </h2>
               <div className="flex gap-3 justify-center max-sm:flex-col max-sm:gap-2">
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