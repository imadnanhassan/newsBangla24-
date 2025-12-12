"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { categories } from "@/lib/data";

export default function MainHeader() {
  const [activeNav, setActiveNav] = useState("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

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

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Main navigation items with submenus
  const mainNavItems = [
    { id: "home", name: "হোম", path: "/" },
    { id: "latest", name: "সর্বশেষ", path: "/latest" },
    { id: "popular", name: "জনপ্রিয়", path: "/popular" },
    {
      id: "news",
      name: "সংবাদ",
      path: "#",
      submenu: [
        { id: "politics", name: "রাজনীতি", path: "/categories/politics" },
        { id: "business", name: "ব্যবসা", path: "/categories/business" },
        { id: "world", name: "আন্তর্জাতিক", path: "/categories/world-news" },
        { id: "country", name: "দেশ", path: "/categories/country-news" },
      ],
    },
    {
      id: "lifestyle",
      name: "জীবনধারা",
      path: "#",
      submenu: [
        { id: "health", name: "স্বাস্থ্য", path: "/categories/health" },
        { id: "tech", name: "প্রযুক্তি", path: "/categories/tech" },
        {
          id: "entertainment",
          name: "বিনোদন",
          path: "/categories/entertainment",
        },
      ],
    },
    {
      id: "sports",
      name: "খেলা",
      path: "/categories/sports",
    },
    { id: "opinion", name: "মতামত", path: "/opinion" },
  ];

  // Toggle submenu
  const toggleSubmenu = (itemId: string) => {
    if (activeSubmenu === itemId) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(itemId);
    }
  };

  // Close mobile menu when navigation item is clicked
  const handleMobileNavClick = (itemId: string) => {
    setActiveNav(itemId);
    setShowMobileMenu(false);
    setActiveSubmenu(null);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Header - Date and Social */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-gray-600">{today}</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">৩২°সি, ঢাকা</span>
            <div className="flex gap-2">
              <button className="text-gray-600 hover:text-red-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-red-600 transition-colors">
                <svg
                  className="w-4 h-4"
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
          {/* New Logo Design - News Portal Style */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-2xl italic">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">newsBangla24</h1>
              <p className="text-xs text-gray-600">বাংলার খবর ২৪ ঘণ্টা</p>
            </div>
          </Link>

          {/* Main Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 relative"
            ref={submenuRef}
          >
            {mainNavItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 hover:bg-red-50 ${
                        activeNav === item.id
                          ? "bg-red-600 text-white"
                          : "text-gray-700"
                      }`}
                      onClick={() => toggleSubmenu(item.id)}
                      onMouseEnter={() =>
                        !isMobile && setActiveSubmenu(item.id)
                      }
                      onMouseLeave={() => !isMobile && setActiveSubmenu(null)}
                    >
                      {item.name}
                      <svg
                        className="w-3 h-3 ml-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Submenu Dropdown - Simplified and reliable */}
                    <div
                      className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50 ${
                        activeSubmenu === item.id ? "block" : "hidden"
                      }`}
                    >
                      <div className="py-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.path}
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors ${
                              activeNav === subItem.id
                                ? "bg-red-50 text-red-600"
                                : ""
                            }`}
                            onClick={() => {
                              setActiveNav(subItem.id);
                              setActiveSubmenu(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeNav === item.id
                        ? "bg-red-600 text-white"
                        : "text-gray-700 hover:bg-red-50"
                    }`}
                    onClick={() => setActiveNav(item.id)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <input
                type="text"
                placeholder="খুঁজুন..."
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors">
                <svg
                  className="w-4 h-4"
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
            <button
              className="lg:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 py-2 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={`px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                  activeNav === category.slug
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-red-50"
                }`}
                onClick={() => setActiveNav(category.slug)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          showMobileMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="space-y-2">
            {mainNavItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <>
                    <button
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors ${
                        activeNav === item.id
                          ? "bg-red-600 text-white"
                          : "text-gray-700 hover:bg-red-50"
                      }`}
                      onClick={() => toggleSubmenu(item.id)}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeSubmenu === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Mobile Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeSubmenu === item.id
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              activeNav === subItem.id
                                ? "bg-red-600 text-white"
                                : "text-gray-700 hover:bg-red-50"
                            }`}
                            onClick={() => handleMobileNavClick(subItem.id)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`block px-4 py-3 text-sm font-medium transition-colors ${
                      activeNav === item.id
                        ? "bg-red-600 text-white"
                        : "text-gray-700 hover:bg-red-50"
                    }`}
                    onClick={() => handleMobileNavClick(item.id)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
