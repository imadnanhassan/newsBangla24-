'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserRole } from '@/types';
import { ClientSession, SessionUser } from '@/lib/session';
import { getDashboardRoute } from '@/lib/auth';

interface AuthState {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const initializeAuth = () => {
      const user = ClientSession.getSession();
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: !!user
      });
    };

    initializeAuth();

    // Listen for storage changes (multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_session' || e.key === 'auth_token') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = useCallback(async (user: SessionUser, token: string) => {
    ClientSession.setSession(user, token);
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: true
    });
  }, []);

  const logout = useCallback(() => {
    ClientSession.clearSession();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
    window.location.href = '/login';
  }, []);

  const refreshSession = useCallback(() => {
    ClientSession.refreshSession();
    const user = ClientSession.getSession();
    setAuthState(prev => ({
      ...prev,
      user
    }));
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    return authState.user?.role === role;
  }, [authState.user]);

  const hasAnyRole = useCallback((roles: UserRole[]): boolean => {
    return authState.user ? roles.includes(authState.user.role) : false;
  }, [authState.user]);

  const canAccess = useCallback((requiredRoles: UserRole[]): boolean => {
    if (!authState.isAuthenticated || !authState.user) return false;
    return requiredRoles.includes(authState.user.role);
  }, [authState.isAuthenticated, authState.user]);

  const redirectToDashboard = useCallback(() => {
    if (authState.user) {
      const route = getDashboardRoute(authState.user.role);
      window.location.href = route;
    }
  }, [authState.user]);

  return {
    ...authState,
    login,
    logout,
    refreshSession,
    hasRole,
    hasAnyRole,
    canAccess,
    redirectToDashboard
  };
}