"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { categories } from "@/lib/data";

export default function NewsPortalBaseHeader() {
  const [activeNav, setActiveNav] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Current date in Bengali format
  const currentDate = new Date();
  const banglaMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const banglaDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const today = `${
    banglaDays[currentDate.getDay()]
  }, ${currentDate.getDate()} ${
    banglaMonths[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  // Check scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main navigation items - core site sections
  const mainNavItems = [
    { id: "home", name: "হোম", path: "/" },
    { id: "latest", name: "সর্বশেষ", path: "/latest" },
    { id: "about", name: "আমাদের সম্পর্কে", path: "/about" },
    { id: "contact", name: "যোগাযোগ", path: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg border-b border-gray-200"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Top Header - Date and Social */}
      <div className="bg-linear-to-r from-red-50 to-red-100 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-gray-700 font-medium">{today}</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 font-medium">
              ৩২°সি, ঢাকা
            </span>
            <div className="flex gap-2">
              <button className="text-red-600 hover:text-red-800 transition-all duration-300 transform hover:scale-110">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="text-red-600 hover:text-red-800 transition-all duration-300 transform hover:scale-110">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Logo and Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Enhanced Logo Design */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 bg-linear-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-3xl italic transform group-hover:rotate-12 transition-transform duration-300">
                N
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                newsBangla24
              </h1>
              <p className="text-xs text-gray-600 group-hover:text-red-500 transition-colors duration-300">
                বাংলার খবর ২৪ ঘণ্টা
              </p>
            </div>
          </Link>

          {/* Modern Navigation Bar with Icons */}
          <nav className="hidden lg:flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-sm border border-gray-100">
            {mainNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1 relative group ${
                  activeNav === item.id
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
                onClick={() => setActiveNav(item.id)}
              >
                <span>{item.name}</span>
                {activeNav === item.id && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side - Search */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <input
                type="text"
                placeholder="খুঁজুন..."
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
              <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation - Below Main Header */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="no-scrollbar -mx-4 overflow-x-auto px-4 py-3">
            <div className="flex items-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
