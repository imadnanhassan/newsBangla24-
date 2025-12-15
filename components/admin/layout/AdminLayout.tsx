'use client';

import { useEffect, useState } from 'react';
import { ClientSession } from '@/lib/session';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import type { SessionUser } from '@/types';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
    setIsLoading(false);

    // Redirect if not admin
    if (sessionUser && !['admin', 'super_admin'].includes(sessionUser.role)) {
      window.location.href = '/login';
    }
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
          </div>
          <p className="mt-4 text-slate-300 font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader title={title} user={user} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/50 to-gray-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}