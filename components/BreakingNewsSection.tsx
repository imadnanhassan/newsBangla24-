"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { articles } from "@/lib/data";

export default function BreakingNewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Get breaking news articles
  const breakingNews = articles
    .filter((article) => article.category?.slug === "breaking-news")
    .slice(0, 5); // Get top 5 breaking news items

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && breakingNews.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % breakingNews.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isAutoPlaying, breakingNews.length]);

  if (breakingNews.length === 0) return null;

  // Format time for Bengali display
  const formatBengaliTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-linear-to-r from-red-600 to-red-700 text-white py-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
              <span className="text-red-600 font-bold text-sm">ব্রেকিং</span>
            </div>
            <h2 className="text-xl font-bold">ব্রেকিং নিউজ</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              title={isAutoPlaying ? "পজ করুন" : "প্লে করুন"}
            >
              {isAutoPlaying ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="flex gap-1">
              <button
                onClick={() => {
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + breakingNews.length) % breakingNews.length
                  );
                  setIsAutoPlaying(false);
                }}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
                disabled={currentSlide === 0}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setCurrentSlide((prev) => (prev + 1) % breakingNews.length);
                  setIsAutoPlaying(false);
                }}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
                disabled={currentSlide === breakingNews.length - 1}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider container */}
        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {breakingNews.map((article, index) => (
              <div key={article.id} className="w-full shrink-0 px-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <img
                        src={
                          article.image_url ||
                          "https://picsum.photos/96/80?random=1"
                        }
                        alt={article.title}
                        className="w-24 h-20 object-cover rounded-md"
                        width={96}
                        height={80}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/article/${article.slug}`}
                        className="block hover:text-red-200 transition-colors"
                      >
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-red-100 mt-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="bg-red-500 px-2 py-1 rounded">
                          {article.category?.name}
                        </span>
                        <span className="opacity-80">
                          {article.publishedAt
                            ? formatBengaliTime(article.publishedAt)
                            : "সময় না পাওয়া"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {breakingNews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className="mt-3 text-right">
          <Link
            href="/categories/breaking-news"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            সব ব্রেকিং নিউজ
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-full bg-white/5 opacity-50 -skew-x-12 -ml-16"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-white/5 opacity-50 skew-x-12 -mr-16"></div>
    </div>
  );
}
