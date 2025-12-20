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
    label: "Dashboard",
    href: "/reporter/dashboard",
    icon: "Home",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "articles",
    label: "Article ",
    href: "/reporter/articles",
    icon: "FileText",
    color: "from-emerald-500 to-teal-500",
    children: [
      {
        id: "all-articles",
        label: "All Articles",
        href: "/reporter/articles",
        icon: "FileText",
      },
      {
        id: "create-article",
        label: "Create Article",
        href: "/reporter/articles/create",
        icon: "PlusCircle",
      },
      {
        id: "drafts",
        label: "Drafts",
        href: "/reporter/articles/drafts",
        icon: "Edit",
        badge: "3",
        badgeColor: "bg-emerald-500",
      },
      {
        id: "pending",
        label: "Pending Review",
        href: "/reporter/articles/pending",
        icon: "Clock",
        badge: "2",
        badgeColor: "bg-teal-500",
      },
      {
        id: "published",
        label: "Published",
        href: "/reporter/articles/published",
        icon: "CheckCircle",
      },
      {
        id: "rejected",
        label: "Rejected",
        href: "/reporter/articles/rejected",
        icon: "AlertCircle",
      },
    ],
  },
  {
    id: "media",
    label: "Media Library",
    href: "/reporter/media",
    icon: "Camera",
    color: "from-violet-500 to-purple-500",
    children: [
      {
        id: "all-media",
        label: "All Media",
        href: "/reporter/media",
        icon: "Camera",
      },
      {
        id: "upload",
        label: "Upload Image",
        href: "/reporter/media/upload",
        icon: "Upload",
      },
      {
        id: "videos",
        label: "Videos",
        href: "/reporter/media/videos",
        icon: "Video",
      },
      {
        id: "gallery",
        label: "Gallery",
        href: "/reporter/media/gallery",
        icon: "Eye",
      },
    ],
  },
  {
    id: "analytics",
    label: "Performance",
    href: "/reporter/analytics",
    icon: "BarChart3",
    color: "from-teal-500 to-cyan-500",
    children: [
      {
        id: "analytics-overview",
        label: "Analytics",
        href: "/reporter/analytics",
        icon: "Activity",
      },
      {
        id: "views",
        label: "View Reports",
        href: "/reporter/analytics/views",
        icon: "Eye",
      },
      {
        id: "engagement",
        label: "Engagement",
        href: "/reporter/analytics/engagement",
        icon: "Target",
      },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    href: "/reporter/profile",
    icon: "User",
    color: "from-gray-500 to-slate-500",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/reporter/settings",
    icon: "Settings",
    color: "from-gray-500 to-slate-500",
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

  useEffect(() => {
    const itemsToExpand: string[] = [];
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) =>
          isActive(child.href!)
        );
        if (hasActiveChild) {
          itemsToExpand.push(item.id);
        }
      }
    });
    setExpandedItems((prev) => [...new Set([...prev, ...itemsToExpand])]);
  }, [pathname]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isExpanded = (id: string) => {
    return expandedItems.includes(id);
  };

  return (
    <div className="w-72 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-r border-slate-800/50 shadow-2xl shadow-black/20 h-full flex flex-col overflow-hidden relative">
      {/* Futuristic Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50 relative">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 rounded flex items-center justify-center shadow-lg shadow-blue-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
              <span className="text-white font-bold text-xl relative z-10">
                নিউজ
              </span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-linear-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-bold text-white text-xl tracking-wide">
              Reporter Panel
            </h2>
            <p className="text-xs text-cyan-400 font-medium">
              Professional News Center
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        {navigation.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];

          return (
            <div key={item.id} className="group">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className={`flex items-center justify-between w-full space-x-4 px-4 py-3 rounded-l-full transition-all duration-300 group relative overflow-hidden ${
                      isActive(item.href!)
                        ? `bg-linear-to-r ${item.color} text-white shadow-lg border border-white/10`
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-700/50"
                    }`}
                  >
                    {isActive(item.href!) && (
                      <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent animate-pulse" />
                    )}

                    <div
                      className={`relative shrink-0 ${
                        isActive(item.href!) ? "animate-pulse" : ""
                      }`}
                    >
                      <IconComponent className="w-5 h-5 relative z-10" />
                      {isActive(item.href!) && (
                        <div
                          className={`absolute inset-0 bg-linear-to-r ${item.color} rounded-full blur-sm opacity-50 scale-150`}
                        />
                      )}
                    </div>

                    <span className="font-medium text-sm tracking-wide relative z-10 flex-1">
                      {item.label}
                    </span>

                    {item.badge && (
                      <span
                        className={`${
                          item.badgeColor || "bg-slate-600"
                        } text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg relative z-10`}
                      >
                        {item.badge}
                      </span>
                    )}

                    <div
                      className={`ml-auto transition-transform duration-300 ${
                        isExpanded(item.id) ? "rotate-180" : ""
                      } relative z-10`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>

                    {/* Hover glow effect */}
                    <div
                      className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded`}
                    />
                  </button>

                  {isExpanded(item.id) && (
                    <div className="ml-6 mt-2 p-2 bg-slate-800/30 backdrop-blur-sm rounded-lg space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {item.children.map((child) => {
                        const ChildIcon =
                          iconMap[child.icon as keyof typeof iconMap];
                        return (
                          <Link
                            key={child.id}
                            href={child.href!}
                            className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-all duration-300 group ${
                              isActive(child.href!, child.href === item.href)
                                ? "bg-slate-700/50 text-white border-l-2 border-cyan-500"
                                : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border-l-2 border-transparent hover:border-slate-500/50"
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
                </>
              ) : (
                <Link
                  href={item.href!}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-l-full transition-all duration-300 group relative overflow-hidden ${
                    isActive(item.href!)
                      ? `bg-linear-to-r ${item.color} text-white shadow-lg border border-white/10`
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-700/50"
                  }`}
                >
                  {isActive(item.href!) && (
                    <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent animate-pulse" />
                  )}

                  <div
                    className={`relative shrink-0 ${
                      isActive(item.href!) ? "animate-pulse" : ""
                    }`}
                  >
                    <IconComponent className="w-5 h-5 relative z-10" />
                    {isActive(item.href!) && (
                      <div
                        className={`absolute inset-0 bg-linear-to-r ${item.color} rounded-full blur-sm opacity-50 scale-150`}
                      />
                    )}
                  </div>

                  <span className="font-medium text-sm tracking-wide relative z-10 flex-1">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span
                      className={`${
                        item.badgeColor || "bg-slate-600"
                      } text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg relative z-10`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded`}
                  />
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="shrink-0 p-6 border-t border-slate-800/50 relative">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded flex items-center justify-center shadow-lg shadow-emerald-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
              <User className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-900" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Reporter User
            </p>
            <p className="text-xs text-cyan-400 truncate">
              reporter@newsportal.com
            </p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
              <span className="text-xs text-emerald-400 font-medium">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Status indicator line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </div>
  );
}
