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
  contracts: "Müqavilələr",
  customers: "Müştərilər",
  discounts: "Endirimlər",
  reports: "Hesabatlar",
  settings: "Tənzimlənmələr",
  subscription: "Abunəlik",

  create: "Məhsul yarat",
  edit: "Redaktə et",
  preview: "Önizləmə",
  "purchase-orders": "Satınalma sifarişləri",

  brands: "Brendlər",
  category: "Kateqoriya",
  specialarea: "Xüsusi sahə",
  variants: "Variantlar",
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
  contracts: {
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
      label: "Dashboard",
      href: "/dashboard",
      isActive: pathSegments.length === 0,
    },
  ];

  let currentPath = "/dashboard";

  pathSegments.forEach((segment, index) => {
    if (segment.startsWith("[") && segment.endsWith("]")) {
      return;
    }

    if (/^\d+$/.test(segment)) {
      return;
    }

    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    let label = dashboardRouteMap[segment];

    if (index > 0) {
      const parentSegment = pathSegments[index - 1];
      const contextualMapping = contextualRouteMap[parentSegment];
      if (contextualMapping && typeof contextualMapping[segment] === "string") {
        label = contextualMapping[segment];
      } else if (
        contextualMapping &&
        typeof contextualMapping[segment] === "object"
      ) {
        const grandParentSegment = index > 1 ? pathSegments[index - 2] : "";
        const nestedMapping = contextualMapping[segment] as Record<
          string,
          string
        >;
        if (
          grandParentSegment &&
          nestedMapping &&
          nestedMapping[grandParentSegment]
        ) {
          label = nestedMapping[grandParentSegment];
        }
      }
    }

    if (!label) {
      label =
        dashboardRouteMap[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    breadcrumbs.push({
      label,
      href: currentPath,
      isActive: isLast,
    });
  });

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
    <div className="mb-6  rounded-lg   px-4 py-3 ">
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
