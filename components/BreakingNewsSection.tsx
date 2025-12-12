"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { articles } from "@/lib/data";

export default function BreakingNewsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Get breaking news articles
  const breakingNews = articles
    .filter((article) => article.category?.slug === "breaking-news")
    .slice(0, 8); // Increased from 5 to 8 for better marquee effect

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const items = marquee.querySelectorAll("a");
    if (items.length === 0) return;

    let totalWidth = 0;
    items.forEach((item: Element) => {
      totalWidth += (item as HTMLElement).offsetWidth + 32; // 32px for gap-8 (Tailwind gap-8 = 2rem = 32px)
    });

    const duration = Math.max(20, totalWidth / 50); // 50px per second
    marquee.style.animationDuration = `${duration}s`;

    // Pause on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [breakingNews.length]);

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-3 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-sm">ব্রেকিং</span>
            </div>
            <span className="font-semibold">ব্রেকিং নিউজ</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div
              ref={marqueeRef}
              className={`flex gap-8 animate-marquee ${
                isPaused ? "animation-paused" : ""
              }`}
              style={{
                width: "fit-content",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {breakingNews.concat(breakingNews).map((article, index) => (
                <Link
                  key={`${article.id}-${index}`}
                  href={`/article/${article.slug}`}
                  className="flex items-center gap-3 whitespace-nowrap hover:underline transition-colors hover:font-semibold"
                >
                  <span className="text-sm">{article.title}</span>
                  <span className="text-xs opacity-75">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleTimeString(
                          "bn-BD",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      : "সময় না পাওয়া"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <button className="shrink-0 bg-white text-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
            সব ব্রেকিং →
          </button>
        </div>
      </div>
    </div>
  );
}
