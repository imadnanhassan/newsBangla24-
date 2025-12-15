'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types';
import { ClientSession, SessionUser } from '@/lib/session';
import { getDashboardRoute } from '@/lib/auth';

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: SessionUser, token: string) => void;
  logout: () => void;
  refreshSession: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  canAccess: (requiredRoles: UserRole[]) => boolean;
  redirectToDashboard: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const sessionUser = ClientSession.getSession();
      setUser(sessionUser);
      setIsLoading(false);
    };

    initializeAuth();

    // Auto-refresh session every 30 minutes
    const refreshInterval = setInterval(() => {
      if (ClientSession.isAuthenticated()) {
        ClientSession.refreshSession();
        const refreshedUser = ClientSession.getSession();
        setUser(refreshedUser);
      }
    }, 30 * 60 * 1000); // 30 minutes

    // Listen for storage changes (multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_session' || e.key === 'auth_token') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (user: SessionUser, token: string) => {
    ClientSession.setSession(user, token);
    setUser(user);
  };

  const logout = () => {
    ClientSession.clearSession();
    setUser(null);
    window.location.href = '/login';
  };

  const refreshSession = () => {
    ClientSession.refreshSession();
    const refreshedUser = ClientSession.getSession();
    setUser(refreshedUser);
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const canAccess = (requiredRoles: UserRole[]): boolean => {
    return user ? requiredRoles.includes(user.role) : false;
  };

  const redirectToDashboard = () => {
    if (user) {
      const route = getDashboardRoute(user.role);
      window.location.href = route;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshSession,
    hasRole,
    hasAnyRole,
    canAccess,
    redirectToDashboard
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Route protection component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles, 
  fallback 
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, canAccess, redirectToDashboard } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        window.location.href = '/login';
        return;
      }

      if (requiredRoles && !canAccess(requiredRoles)) {
        redirectToDashboard();
        return;
      }
    }
  }, [isLoading, isAuthenticated, canAccess, redirectToDashboard, requiredRoles]);

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRoles && !canAccess(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button
            onClick={redirectToDashboard}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}