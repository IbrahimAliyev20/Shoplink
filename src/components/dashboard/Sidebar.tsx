"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Monitor,
  Package,
  CircleUser,
  CirclePercent,
  SquareCheck,
  Bolt,
  ChevronDown,
  ChevronRight,
  Menu,
  PanelRightOpen,
  LayoutGrid,
  Globe,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllStoreQuery } from "@/services/Seller-services/store/allstore/queries";
import { getUserQuery } from "@/services/auth/queries";
import { logoutAction } from "@/services/auth/server-actions";
import { toast } from "sonner";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapsed?: (collapsed: boolean) => void;
}

const menuItems = [
  {
    id: "panel",
    label: "Panel",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    id: "hesabatlar",
    label: "Hesabatlar",
    icon: Monitor,
    href: "/dashboard/reports",
  },
  {
    id: "mehsullar",
    label: "Məhsullar",
    icon: Package,
    href: "/dashboard/products",
    subItems: [
      { label: "Məhsullar", href: "/dashboard/products" },
      {
        label: "Satınalma sifarişləri",
        href: "/dashboard/products/purchase-orders",
      },
    ],
  },
  {
    id: "musteriler",
    label: "Müştərilər",
    icon: CircleUser,
    href: "/dashboard/customers",
  },
  {
    id: "endirimler",
    label: "Endirimlər",
    icon: CirclePercent,
    href: "/dashboard/discounts",
  },
  {
    id: "kateqoriyalar",
    label: "Kateqoriyalar",
    icon: SquareCheck,
    href: "/dashboard/categorys",
  },
  {
    id: "tesvimlenmelev",
    label: "Tənzimlənmələr",
    icon: Bolt,
    href: "/dashboard/settings",
  },
];

export default function Sidebar({
  className,
  isCollapsed: externalIsCollapsed,
  onToggleCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["mehsullar"]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { data: store } = useQuery(getAllStoreQuery());
  const { data: user, isLoading, isError } = useQuery(getUserQuery());
  const router = useRouter();

  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
      router.push(`/dashboard`);
      toast.success("Çıxış edildi");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const toggleCollapsed = () => {
    const newCollapsed = !isCollapsed;
    if (onToggleCollapsed) {
      onToggleCollapsed(newCollapsed);
    } else {
      setInternalIsCollapsed(newCollapsed);
    }
    if (!newCollapsed) {
      setExpandedItems([]);
    } else {
      setExpandedItems(["mehsullar"]);
    }
  };

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return;
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 min-h-screen overflow-y-auto bg-[#141414] text-white transition-all duration-300 ease-in-out  shadow-xl",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Content */}
      <div className="flex flex-col justify-between h-full">
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className={cn("flex items-center space-x-3 transition-opacity duration-200", isCollapsed && "opacity-0")}>
            {!isCollapsed && (
              <Link href="/">
                <Image src="/images/logofooter.svg" alt="Logo" width={150} height={40} />
              </Link>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0 hidden lg:block"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
          </Button>
        </div>

        {/* USER */}
        <div className="p-4 border-b border-gray-800">
          <div className="relative" ref={userDropdownRef}>
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-700">
                <Image
                  src={!isLoading && !isError && user?.data?.image && user.data.image !== "null" ? user.data.image : "/images/Card.svg"}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Card.svg";
                  }}
                />
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user?.data?.name || "..."}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.data?.email || "..."}</p>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform duration-200", isUserDropdownOpen && "rotate-180")} />
                </>
              )}
            </div>
            {/* Dropdown */}
            {isUserDropdownOpen && !isCollapsed && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Çıxış et</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group",
                  isActive(item.href) ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
                onClick={() => {
                  if (item.subItems && !isCollapsed) toggleExpanded(item.id);
                }}
              >
                <Link href={item.href} className="flex items-center space-x-3 flex-1 min-w-0">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>

                {/* Dropdown toggle */}
                {item.subItems && !isCollapsed && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpanded(item.id);
                    }}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    {expandedItems.includes(item.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                )}
              </div>

              {/* SubItems */}
              {item.subItems && expandedItems.includes(item.id) && !isCollapsed && (
                <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-4">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        pathname === subItem.href ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-800">
          {!isCollapsed ? (
            <div className="flex items-center space-x-2">
              <Globe className="w-[18px] h-[18px] text-[#AF52DE]" />
              <Link target="_blank" href={`/${store?.slug}`} className="text-xs text-white">
                {store?.name}
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Link href={`/${store?.slug}`} className="text-xs text-gray-400">
                  <Package className="h-4 w-4 text-white" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
