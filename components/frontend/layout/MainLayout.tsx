"use client";

import { useState, useEffect } from "react";

import { ClientSession } from "@/lib/session";
import type { SessionUser } from "@/types";
import { MainFooter, MainHeader } from ".";

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function MainLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = "",
}: MainLayoutProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-500/30 rounded-full animate-spin border-t-red-500"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-red-400"></div>
          </div>
          <p className="mt-4 text-slate-300 font-medium">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 ${className}`}
    >
      {showHeader && <MainHeader />}

      <main className="flex-1">{children}</main>

      {showFooter && <MainFooter />}
    </div>
  );
}
