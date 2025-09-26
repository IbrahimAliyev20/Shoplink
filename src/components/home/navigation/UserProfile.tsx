"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Store } from "lucide-react";
import { getUserAction, logoutAction } from "@/services/auth/server-actions";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";

export function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserAction();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboard = () => {
    router.push('/dashboard');
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="hidden md:flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center gap-4 relative">
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User size={16} />
            Profil
          </Button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-3 border-b">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              
              <div className="py-1">
                <button
                  onClick={handleDashboard}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Store size={16} />
                  Dashboard
                </button>
          
                
                <hr className="my-1" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Çıxış
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mobile version
export function UserProfileMobile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserAction();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(null);
      // Force a complete page refresh to clear all state
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="pt-4 space-y-3 border-t">
      <div className="px-3 py-2">
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
      
      <button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        <Store size={16} />
        Dashboard
      </button>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
      >
        <LogOut size={16} />
        Çıxış
      </button>
    </div>
  );
}
