'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Image,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  ChevronLeft,
  User,
  LogOut,
  Newspaper,
  Zap,
  Globe,
  Video,
  TrendingUp,
  Bell,
  Shield,
  Rss
} from 'lucide-react';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      active: pathname === '/dashboard',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Breaking News',
      icon: Zap,
      href: '/dashboard/breaking',
      active: pathname.startsWith('/dashboard/breaking'),
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'News Articles',
      icon: Newspaper,
      href: '/dashboard/article',
      active: pathname.startsWith('/dashboard/article'),
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Live News',
      icon: Rss,
      href: '/dashboard/live',
      active: pathname.startsWith('/dashboard/live'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Categories',
      icon: FolderOpen,
      href: '/dashboard/category',
      active: pathname.startsWith('/dashboard/category'),
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Video News',
      icon: Video,
      href: '/dashboard/video',
      active: pathname.startsWith('/dashboard/video'),
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Reporters',
      icon: Users,
      href: '/dashboard/reporter',
      active: pathname.startsWith('/dashboard/reporter'),
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Media Gallery',
      icon: Image,
      href: '/dashboard/media',
      active: pathname.startsWith('/dashboard/media'),
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Comments',
      icon: MessageSquare,
      href: '/dashboard/comments',
      active: pathname.startsWith('/dashboard/comments'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Trending',
      icon: TrendingUp,
      href: '/dashboard/trending',
      active: pathname.startsWith('/dashboard/trending'),
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Notifications',
      icon: Bell,
      href: '/dashboard/notifications',
      active: pathname.startsWith('/dashboard/notifications'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      active: pathname.startsWith('/dashboard/analytics'),
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Moderation',
      icon: Shield,
      href: '/dashboard/moderation',
      active: pathname.startsWith('/dashboard/moderation'),
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      active: pathname.startsWith('/dashboard/settings'),
      color: 'from-gray-500 to-slate-500'
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
      >
        <Menu className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-r border-slate-800/50 transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      } min-h-screen flex flex-col fixed lg:relative z-40 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } shadow-2xl shadow-black/20`}>
      
      {/* Futuristic Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50 relative">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <Globe className="w-6 h-6 text-white relative z-10" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="font-bold text-white text-xl tracking-wide">NewsPortal</h2>
                <p className="text-xs text-cyan-400 font-medium">Admin Control Center</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2.5 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group border border-slate-700/50 hover:border-cyan-500/50"
          >
            <ChevronLeft
              className={`w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    item.active
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-${item.color.split('-')[1]}-500/25 border border-white/10`
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-700/50'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Animated background for active state */}
                  {item.active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
                  )}
                  
                  {/* Icon container with glow effect */}
                  <div className={`relative flex-shrink-0 ${item.active ? 'animate-pulse' : ''}`}>
                    <IconComponent className="w-5 h-5 relative z-10" />
                    {item.active && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full blur-sm opacity-50 scale-150`} />
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <span className="font-medium text-sm tracking-wide relative z-10">{item.title}</span>
                  )}
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-20 bg-slate-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-xl border border-slate-700/50 whitespace-nowrap">
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gradient-to-r ${item.color} rotate-45`} />
                      {item.title}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-slate-800/50 relative">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <User className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Admin User</p>
              <p className="text-xs text-cyan-400 truncate">admin@newsportal.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                <span className="text-xs text-emerald-400 font-medium">Online</span>
              </div>
            </div>
          )}
          
          {!isCollapsed && (
            <button className="p-2.5 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group border border-slate-700/50 hover:border-red-500/50">
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
            </button>
          )}
        </div>
        
        {/* Status indicator line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
      </div>
    </>
  );
};

export default AdminSidebar;