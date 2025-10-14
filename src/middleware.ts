import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const userRoleCookie = request.cookies.get('user_role')?.value;
  const marketSlug = request.nextUrl.pathname.split('/')[1];
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/login', '/register'];
  const marketAccountRoute = `/${marketSlug}/account`;

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  const isMarketAccountRoute = pathname.startsWith(marketAccountRoute) && pathname.endsWith('/account');

  let userRoles: string[] = [];
  if (userRoleCookie) {
    try {
      userRoles = JSON.parse(userRoleCookie);
    } catch (error) {
      console.error('Error parsing user role cookie:', error);
    }
  }

  const hasUserRole = userRoles.includes('user');
  const hasSellerRole = userRoles.includes('seller');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && token && hasUserRole && !hasSellerRole) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (isMarketAccountRoute && token && hasSellerRole) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/en/:path*',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};