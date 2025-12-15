'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Bookmark,
  Heart,
  User,
  Settings,
  Bell,
  MessageSquare,
  TrendingUp,
  Clock,
  X,
  Search,
  Tag,
  Globe,
  Rss
} from 'lucide-react';
import type { SessionUser, MenuItem } from '@/types';

interface UserSidebarProps {
  user: SessionUser | null;
  onClose?: () => void;
}

const navigation: MenuItem[] = [
  {
    id: 'home',
    label: 'হোম',
    href: '/',
    icon: 'Home',
  },
  {
    id: 'trending',
    label: 'ট্রেন্ডিং',
    href: '/trending',
    icon: 'TrendingUp',
  },
  {
    id: 'categories',
    label: 'বিভাগসমূহ',
    href: '/categories',
    icon: 'Tag',
    children: [
      { id: 'politics', label: 'রাজনীতি', href: '/categories/politics', icon: 'Globe' },
      { id: 'sports', label: 'খেলাধুলা', href: '/categories/sports', icon: 'TrendingUp' },
      { id: 'technology', label: 'প্রযুক্তি', href: '/categories/technology', icon: 'Settings' },
      { id: 'entertainment', label: 'বিনোদন', href: '/categories/entertainment', icon: 'Heart' },
    ]
  },
  {
    id: 'live',
    label: 'লাইভ নিউজ',
    href: '/live',
    icon: 'Rss',
  },
  {
    id: 'recent',
    label: 'সাম্প্রতিক',
    href: '/recent',
    icon: 'Clock',
  }
];

const userNavigation: MenuItem[] = [
  {
    id: 'bookmarks',
    label: 'বুকমার্ক',
    href: '/user/bookmarks',
    icon: 'Bookmark',
  },
  {
    id: 'favorites',
    label: 'পছন্দের',
    href: '/user/favorites',
    icon: 'Heart',
  },
  {
    id: 'notifications',
    label: 'নোটিফিকেশন',
    href: '/user/notifications',
    icon: 'Bell',
    badge: '3',
    badgeColor: 'bg-green-500',
  },
  {
    id: 'comments',
    label: 'আমার মন্তব্য',
    href: '/user/comments',
    icon: 'MessageSquare',
  },
  {
    id: 'profile',
    label: 'প্রোফাইল',
    href: '/user/profile',
    icon: 'User',
  },
  {
    id: 'settings',
    label: 'সেটিংস',
    href: '/user/settings',
    icon: 'Settings',
  }
];

const iconMap = {
  Home, Bookmark, Heart, User, Settings, Bell, MessageSquare,
  TrendingUp, Clock, X, Search, Tag, Globe, Rss
};

export default function UserSidebar({ user, onClose }: UserSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isExpanded = (id: string) => {
    return expandedItems.includes(id);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700 h-full flex flex-col overflow-hidden">
      {/* Close button for mobile */}
      {onClose && (
        <div className="lg:hidden p-4 border-b border-slate-700/50">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/50 text-white hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">নিউজ</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              NewsPortal
            </h1>
            <p className="text-xs text-slate-400 font-medium">বাংলা সংবাদ পোর্টাল</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-green-400 transition-colors" />
          <input
            type="text"
            placeholder="খবর খুঁজুন..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-white placeholder-slate-400 text-sm transition-all duration-200 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">মূল মেনু</h3>
          <div className="space-y-1">
            {navigation.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              
              return (
                <div key={item.id} className="group">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                          isActive(item.href!)
                            ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      </button>
                      
                      {isExpanded(item.id) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.children.map((child) => {
                            const ChildIcon = iconMap[child.icon as keyof typeof iconMap];
                            return (
                              <Link
                                key={child.id}
                                href={child.href!}
                                className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                  isActive(child.href!)
                                    ? 'bg-gradient-to-r from-green-500/15 to-green-600/15 text-green-300 border-l-2 border-green-500'
                                    : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border-l-2 border-transparent hover:border-slate-500/50'
                                }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        isActive(item.href!)
                          ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* User Navigation */}
        {user && (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">ব্যক্তিগত</h3>
            <div className="space-y-1">
              {userNavigation.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                
                return (
                  <Link
                    key={item.id}
                    href={item.href!}
                    className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      isActive(item.href!)
                        ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`${item.badgeColor || 'bg-slate-600'} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* User Info - Fixed at bottom */}
      {user && (
        <div className="flex-shrink-0 p-4 border-t border-slate-700/50">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">সক্রিয় ব্যবহারকারী</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}