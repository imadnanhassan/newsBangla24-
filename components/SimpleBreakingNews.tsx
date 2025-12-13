"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { articles } from "@/lib/data";

export default function SimpleBreakingNews() {
  // Get breaking news articles
  const breakingNews = articles
    .filter((article) => article.category?.slug === "breaking-news")
    .slice(0, 8); // Get top 8 breaking news items for marquee

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0">
            <span className="text-red-600 font-bold text-xs">ব্রেকিং</span>
          </div>
          <h3 className="font-bold text-lg">ব্রেকিং নিউজ</h3>
        </div>

        {/* Marquee container with images and titles */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {breakingNews.map((article, index) => (
              <div
                key={article.id}
                className="flex items-center mx-4 shrink-0"
                style={{ width: "300px" }}
              >
                <div className="flex gap-3 items-center bg-white/10 p-2 rounded-lg">
                  <img
                    src={
                      article.image_url ||
                      "https://picsum.photos/80/60?random=1"
                    }
                    alt={article.title}
                    className="w-20 h-15 object-cover rounded-md shrink-0"
                    width={80}
                    height={60}
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/article/${article.slug}`}
                      className="hover:text-red-200 transition-colors"
                    >
                      <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                        {article.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {breakingNews.map((article, index) => (
              <div
                key={`dup-${article.id}`}
                className="flex items-center mx-4 shrink-0"
                style={{ width: "300px" }}
              >
                <div className="flex gap-3 items-center bg-white/10 p-2 rounded-lg">
                  <img
                    src={
                      article.image_url ||
                      "https://picsum.photos/80/60?random=1"
                    }
                    alt={article.title}
                    className="w-20 h-15 object-cover rounded-md shrink-0"
                    width={80}
                    height={60}
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/article/${article.slug}`}
                      className="hover:text-red-200 transition-colors"
                    >
                      <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                        {article.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
