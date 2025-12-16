"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  PlusCircle,
  Camera,
  Video,
  BarChart3,
  Settings,
  User,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  Edit,
  Bookmark,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Award,
  Zap,
  Target,
  Activity,
} from "lucide-react";
import type { MenuItem } from "@/types";

const navigation: MenuItem[] = [
  {
    id: "dashboard",
    label: "ড্যাশবোর্ড",
    href: "/reporter/dashboard",
    icon: "Home",
  },
  {
    id: "articles",
    label: "নিবন্ধ পরিচালনা",
    href: "/reporter/articles",
    icon: "FileText",
    children: [
      {
        id: "all-articles",
        label: "সব নিবন্ধ",
        href: "/reporter/articles",
        icon: "FileText",
      },
      {
        id: "create-article",
        label: "নতুন নিবন্ধ",
        href: "/reporter/articles/create",
        icon: "PlusCircle",
      },
      {
        id: "drafts",
        label: "খসড়া",
        href: "/reporter/articles/drafts",
        icon: "Edit",
        badge: "3",
        badgeColor: "bg-amber-500",
      },
      {
        id: "pending",
        label: "পর্যালোচনায়",
        href: "/reporter/articles/pending",
        icon: "Clock",
        badge: "2",
        badgeColor: "bg-blue-500",
      },
      {
        id: "published",
        label: "প্রকাশিত",
        href: "/reporter/articles/published",
        icon: "CheckCircle",
      },
      {
        id: "rejected",
        label: "প্রত্যাখ্যাত",
        href: "/reporter/articles/rejected",
        icon: "AlertCircle",
      },
    ],
  },
  {
    id: "media",
    label: "মিডিয়া লাইব্রেরি",
    href: "/reporter/media",
    icon: "Camera",
    children: [
      {
        id: "all-media",
        label: "সব মিডিয়া",
        href: "/reporter/media",
        icon: "Camera",
      },
      {
        id: "upload",
        label: "ছবি আপলোড",
        href: "/reporter/media/upload",
        icon: "Upload",
      },
      {
        id: "videos",
        label: "ভিডিও",
        href: "/reporter/media/videos",
        icon: "Video",
      },
      {
        id: "gallery",
        label: "গ্যালারি",
        href: "/reporter/media/gallery",
        icon: "Eye",
      },
    ],
  },
  {
    id: "analytics",
    label: "পারফরম্যান্স",
    href: "/reporter/analytics",
    icon: "BarChart3",
    children: [
      {
        id: "analytics-overview",
        label: "অ্যানালিটিক্স",
        href: "/reporter/analytics",
        icon: "Activity",
      },
      {
        id: "views",
        label: "ভিউ রিপোর্ট",
        href: "/reporter/analytics/views",
        icon: "Eye",
      },
      {
        id: "engagement",
        label: "এনগেজমেন্ট",
        href: "/reporter/analytics/engagement",
        icon: "Target",
      },
    ],
  },
  {
    id: "profile",
    label: "প্রোফাইল",
    href: "/reporter/profile",
    icon: "User",
  },
  {
    id: "settings",
    label: "সেটিংস",
    href: "/reporter/settings",
    icon: "Settings",
  },
];

const iconMap = {
  Home,
  FileText,
  PlusCircle,
  Camera,
  Video,
  BarChart3,
  Settings,
  User,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  Edit,
  Bookmark,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Award,
  Zap,
  Target,
  Activity,
};

export default function ReporterSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["articles"]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isExpanded = (id: string) => {
    return expandedItems.includes(id);
  };

  if (!mounted) {
    return (
      <div className="w-72 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 h-full">
        <div className="animate-pulse p-6">
          <div className="h-12 bg-slate-700 rounded-lg mb-4"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700 h-full flex flex-col overflow-hidden">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">নিউজ</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
              রিপোর্টার প্যানেল
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              প্রফেশনাল নিউজ সেন্টার
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-red-400 transition-colors" />
          <input
            type="text"
            placeholder="দ্রুত খুঁজুন..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-white placeholder-slate-400 text-sm transition-all duration-200 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {navigation.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];

          return (
            <div key={item.id} className="group">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      isActive(item.href!)
                        ? "bg-linear-to-r from-red-500/20 to-red-600/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          isActive(item.href!)
                            ? "bg-red-500/20 text-red-400"
                            : "bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-slate-300"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{item.label}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span
                          className={`${
                            item.badgeColor || "bg-red-500"
                          } text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <div
                        className={`transition-transform duration-200 ${
                          isExpanded(item.id) ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {isExpanded(item.id) && (
                    <div className="ml-6 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {item.children.map((child) => {
                        const ChildIcon =
                          iconMap[child.icon as keyof typeof iconMap];
                        return (
                          <Link
                            key={child.id}
                            href={child.href!}
                            className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all duration-200 group ${
                              isActive(child.href!)
                                ? "bg-linear-to-r from-red-500/15 to-red-600/15 text-red-300 border-l-2 border-red-500"
                                : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border-l-2 border-transparent hover:border-slate-500/50"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <ChildIcon className="w-4 h-4" />
                              <span className="font-medium">{child.label}</span>
                            </div>
                            {child.badge && (
                              <span
                                className={`${
                                  child.badgeColor || "bg-slate-600"
                                } text-white text-xs px-2 py-0.5 rounded-full font-semibold`}
                              >
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive(item.href!)
                      ? "bg-linear-to-r from-red-500/20 to-red-600/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isActive(item.href!)
                          ? "bg-red-500/20 text-red-400"
                          : "bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-slate-300"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                    </div>
                  </div>
                  {item.badge && (
                    <span
                      className={`${
                        item.badgeColor || "bg-red-500"
                      } text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Quick Stats Section - Fixed at bottom */}
      <div className="shrink-0 p-4 border-t border-slate-700/50">
        <div className="bg-linear-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <h4 className="text-sm font-semibold text-white">
              আজকের পরিসংখ্যান
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>নতুন ভিউ</span>
              </span>
              <span className="font-bold text-green-400 text-sm">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>মন্তব্য</span>
              </span>
              <span className="font-bold text-blue-400 text-sm">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>শেয়ার</span>
              </span>
              <span className="font-bold text-purple-400 text-sm">23</span>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="mt-4 pt-3 border-t border-slate-600/30">
            <div className="flex items-center space-x-2 text-xs">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300 font-medium">
                এই সপ্তাহের সেরা রিপোর্টার
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
