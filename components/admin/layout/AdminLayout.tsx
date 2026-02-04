"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
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
  // Mock user for public access
  const [user] = useState<SessionUser>({
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  });

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
