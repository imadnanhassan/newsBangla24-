import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/types';

// Route protection configuration
const routePermissions: Record<string, UserRole[]> = {
  '/dashboard': ['admin', 'super_admin'],
  '/dashboard/analytics': ['admin', 'super_admin'],
  '/dashboard/article': ['admin', 'super_admin', 'reporter'],
  '/dashboard/breaking': ['admin', 'super_admin'],
  '/dashboard/category': ['admin', 'super_admin'],
  '/dashboard/comments': ['admin', 'super_admin'],
  '/dashboard/live': ['admin', 'super_admin'],
  '/dashboard/media': ['admin', 'super_admin', 'reporter'],
  '/dashboard/moderation': ['admin', 'super_admin'],
  '/dashboard/notifications': ['admin', 'super_admin'],
  '/dashboard/reporter': ['admin', 'super_admin'],
  '/dashboard/settings': ['super_admin'],
  '/dashboard/trending': ['admin', 'super_admin'],
  '/dashboard/video': ['admin', 'super_admin', 'reporter'],
  '/reporter': ['reporter'],
  '/user': ['user', 'reporter', 'admin', 'super_admin']
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/static') ||
      pathname === '/login' ||
      pathname === '/' ||
      pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  // Get user from cookie or header
  const userCookie = request.cookies.get('user');
  const authHeader = request.headers.get('authorization');
  
  if (!userCookie && !authHeader) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    let user;
    if (userCookie) {
      user = JSON.parse(userCookie.value);
    } else if (authHeader) {
      // Handle Bearer token if needed
      const token = authHeader.replace('Bearer ', '');
      // Decode token logic here
    }

    if (!user || !user.role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check route permissions
    const requiredRoles = getRequiredRoles(pathname);
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      const allowedRoute = getDashboardRoute(user.role);
      return NextResponse.redirect(new URL(allowedRoute, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

function getRequiredRoles(pathname: string): UserRole[] {
  // Find the most specific route match
  const routes = Object.keys(routePermissions).sort((a, b) => b.length - a.length);
  
  for (const route of routes) {
    if (pathname.startsWith(route)) {
      return routePermissions[route];
    }
  }
  
  return [];
}

function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return '/dashboard';
    case 'reporter':
      return '/reporter/dashboard';
    case 'user':
      return '/user/dashboard';
    default:
      return '/';
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};