import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const userRoleCookie = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/login', '/register'];

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Parse user role from cookie
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

  // Block dashboard access for users with "user" role
  if (isProtectedRoute && token && hasUserRole && !hasSellerRole) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/', request.url);
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