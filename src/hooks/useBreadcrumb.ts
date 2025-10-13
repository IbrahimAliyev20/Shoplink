'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/profil': [{ title: 'Profil', link: '/profil' }],
  '/profil/add-startup': [
    { title: 'Profil', link: '/profil' },
    { title: 'Startup əlavə edin', link: '/profil/add-startup' }
  ],
  '/profil/my-projects': [
    { title: 'Profil', link: '/profil' },
    { title: 'Layihələrim', link: '/profil/my-projects' }
  ],
  '/profil/account': [
    { title: 'Profil', link: '/profil' },
    { title: 'Hesabım', link: '/profil/account' }
  ],
  '/profil/account-settings': [
    { title: 'Profil', link: '/profil' },
    { title: 'Hesab Ayarları', link: '/profil/account-settings' }
  ],
  '/profil/support': [
    { title: 'Profil', link: '/profil' },
    { title: 'Dəstək', link: '/profil/support' }
  ],
  '/profil/favorites': [
    { title: 'Profil', link: '/profil' },
    { title: 'Sevimlilər', link: '/profil/favorites' }
  ],
  '/profil/profil': [
    { title: 'Profil', link: '/profil' },
    { title: 'İdarə paneli', link: '/profil/dashboard' }
  ],
  '/profil/my-investments': [
    { title: 'Profil', link: '/profil' },
    { title: 'Investisiyalarım', link: '/profil/my-investments' }
  ],
  '/profil/balance': [
    { title: 'Profil', link: '/profil' },
    { title: 'Balansım', link: '/profil/balance' }
  ],
 
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });
  }, [pathname]);

  return breadcrumbs;
}