'use client';

import { useEffect, useState } from 'react';
import { ClientSession, SessionUser } from '@/lib/session';
import ReporterSidebar from './ReporterSidebar';
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Settings,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ReporterLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function ReporterLayout({ children, title }: ReporterLayoutProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
    setIsLoading(false);

    // Redirect if not reporter
    if (sessionUser && !['reporter'].includes(sessionUser.role)) {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    ClientSession.clearSession();
    window.location.href = '/login';
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-500/30 rounded-full animate-spin border-t-red-500"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-red-400"></div>
          </div>
          <p className="mt-4 text-slate-300 font-medium">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)} 
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full h-full">
            <div className="absolute top-4 right-4 z-10">
              <button
                className="p-2 rounded-xl bg-slate-800/90 text-white hover:bg-slate-700 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ReporterSidebar />
          </div>
        </div>
      )}

      {/* Desktop sidebar - Fixed position */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30">
        <ReporterSidebar />
      </div>

      {/* Main content - Offset by sidebar width */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Top header - Fixed */}
        <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-40 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <button
                  className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {title || 'রিপোর্টার ড্যাশবোর্ড'}
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    {new Date().toLocaleDateString('bn-BD', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="hidden md:block relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="দ্রুত খুঁজুন..."
                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm w-80 transition-all duration-200 placeholder-slate-400"
                  />
                </div>

                {/* Fullscreen Toggle */}
                <button 
                  onClick={toggleFullscreen}
                  className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                  title={isFullscreen ? 'ফুলস্ক্রিন থেকে বের হন' : 'ফুলস্ক্রিন করুন'}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <button className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-400 animate-ping"></span>
                </button>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
                  >
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 font-medium">প্রফেশনাল রিপোর্টার</p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {user.name?.charAt(0) || 'R'}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <a href="/reporter/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          <User className="w-4 h-4" />
                          <span>প্রোফাইল দেখুন</span>
                        </a>
                        <a href="/reporter/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>সেটিংস</span>
                        </a>
                        <div className="border-t border-slate-100 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>লগআউট</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/50 to-gray-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
}