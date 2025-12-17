"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { ClientSession } from "@/lib/session";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import type { SessionUser } from "@/types";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    if (sessionUser && !["admin", "super_admin"].includes(sessionUser.role)) {
      window.location.href = "/login";
    }
  }, []);

  if (!mounted || isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{ fontFamily: inter.style.fontFamily }}
      >
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
          </div>
          <p className="mt-4 text-slate-300 font-medium">
            Loading Admin Panel...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className="h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 flex overflow-hidden"
      style={{ fontFamily: inter.style.fontFamily }}
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader title={title} user={user} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-linear-to-br from-slate-50/50 to-gray-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
