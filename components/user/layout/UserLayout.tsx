'use client';

import { useEffect, useState } from 'react';
import { ClientSession } from '@/lib/session';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import type { SessionUser } from '@/types';

interface UserLayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
}

export default function UserLayout({ children, title, showSidebar = true }: UserLayoutProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-500/30 rounded-full animate-spin border-t-green-500"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-green-400"></div>
          </div>
          <p className="mt-4 text-slate-300 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <UserHeader 
        title={title} 
        user={user} 
        onMenuClick={() => setSidebarOpen(true)}
        showMenuButton={showSidebar}
      />
      
      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                  onClick={() => setSidebarOpen(false)} 
                />
                <div className="relative flex-1 flex flex-col max-w-xs w-full h-full">
                  <UserSidebar user={user} onClose={() => setSidebarOpen(false)} />
                </div>
              </div>
            )}
            
            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0 lg:w-64">
              <UserSidebar user={user} />
            </div>
          </>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
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