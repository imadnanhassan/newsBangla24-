'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  Settings,
  ChevronDown,
  Home,
  Bookmark,
  Heart
} from 'lucide-react';
import { ClientSession } from '@/lib/session';
import type { SessionUser } from '@/types';

interface UserHeaderProps {
  title?: string;
  user: SessionUser | null;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function UserHeader({ title, user, onMenuClick, showMenuButton = true }: UserHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    ClientSession.clearSession();
    window.location.href = '/';
  };

  const notifications = [
    { id: 1, title: 'নতুন নিবন্ধ প্রকাশিত', time: '২ মিনিট আগে', type: 'info' },
    { id: 2, title: 'আপনার মন্তব্যের উত্তর', time: '৫ মিনিট আগে', type: 'reply' },
    { id: 3, title: 'নতুন ব্রেকিং নিউজ', time: '১০ মিনিট আগে', type: 'breaking' }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <button
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                onClick={onMenuClick}
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">নিউজ</span>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    NewsPortal
                  </h1>
                </div>
              </Link>
              
              {title && (
                <div className="hidden md:block">
                  <span className="text-slate-400 mx-2">|</span>
                  <span className="text-lg font-semibold text-slate-700">{title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:block relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-green-500 transition-colors" />
              <input
                type="text"
                placeholder="খবর খুঁজুন..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm w-80 transition-all duration-200 placeholder-slate-400"
              />
            </div>

            {/* Quick Links */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/" className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" title="হোম">
                <Home className="w-5 h-5" />
              </Link>
              <Link href="/bookmarks" className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" title="বুকমার্ক">
                <Bookmark className="w-5 h-5" />
              </Link>
              <Link href="/favorites" className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" title="পছন্দের">
                <Heart className="w-5 h-5" />
              </Link>
            </div>

            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-900">নোটিফিকেশন</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 ${
                                notification.type === 'info' ? 'bg-blue-500' :
                                notification.type === 'reply' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                                <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-100">
                        <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium">
                          সব নোটিফিকেশন দেখুন
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
                  >
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 font-medium">ব্যবহারকারী</p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link href="/user/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          <User className="w-4 h-4" />
                          <span>প্রোফাইল দেখুন</span>
                        </Link>
                        <Link href="/user/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>সেটিংস</span>
                        </Link>
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
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  লগইন
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg text-sm"
                >
                  নিবন্ধন
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
}