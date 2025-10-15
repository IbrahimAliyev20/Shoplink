"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const dashboardRouteMap: Record<string, string> = {
  "": "Dashboard",
  products: "Məhsullar",
  categorys: "Kateqoriyalar",
  customers: "Müştərilər",
  discounts: "Endirimlər",
  reports: "Hesabatlar",
  settings: "Tənzimlənmələr",
  // subscription: "Abunəlik",

  create: "Məhsul yarat",
  edit: "Redaktə et",
  preview: "Önizləmə",
  "purchase-orders": "Satınalma sifarişləri",

  category: "Kateqoriya",
};

const contextualRouteMap: Record<
  string,
  Record<string, string | Record<string, string>>
> = {
  products: {
    create: "Yarat",
    edit: "Məhsul Redaktə et",
    preview: "Məhsul Önizləmə",
  },
  categorys: {
    category: {
      create: "Kateqoriya Yarat",
      edit: "Kateqoriya Redaktə et",
      preview: "Kateqoriya Önizləmə",
    },
  },
};

const generateBreadcrumbs = (pathname: string) => {
  const pathWithoutDashboard = pathname.replace("/dashboard", "");
  const pathSegments = pathWithoutDashboard.split("/").filter(Boolean);

  const breadcrumbs = [
    {
      label: "İdarə paneli",
      href: "/dashboard",
      isActive: pathSegments.length === 0,
    },
  ];

  // If we're on the dashboard root, return only the dashboard breadcrumb
  if (pathSegments.length === 0) {
    return breadcrumbs;
  }

  // Find the main section (first non-dynamic segment)
  let mainSection = "";
  let mainSectionLabel = "";
  
  for (const segment of pathSegments) {
    if (segment.startsWith("[") && segment.endsWith("]")) {
      continue;
    }
    if (/^\d+$/.test(segment)) {
      continue;
    }
    
    mainSection = segment;
    mainSectionLabel = dashboardRouteMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    break;
  }

  // Add the main section breadcrumb
  if (mainSection) {
    breadcrumbs.push({
      label: mainSectionLabel,
      href: `/dashboard/${mainSection}`,
      isActive: pathSegments.length === 1 || (pathSegments.length === 2 && /^\d+$/.test(pathSegments[1])),
    });
  }

  return breadcrumbs;
};

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  if (!pathname.startsWith("/dashboard")) {
    return null;
  }

  if (pathname.startsWith("/dashboard/shopsetup") ) {
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="mb-6  rounded-lg  px-2 py-2 md:px-4 md:py-3 ">
      <Breadcrumb>
        <BreadcrumbList className="flex-wrap">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {crumb.isActive ? (
                  <BreadcrumbPage className="text-gray-900 font-semibold text-sm flex items-center">
                    {index === 0 && <Home className="h-4 w-4 mr-1.5" />}
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={crumb.href}
                      className="text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium flex items-center hover:underline"
                    >
                      {index === 0 && <Home className="h-4 w-4 mr-1.5" />}
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
