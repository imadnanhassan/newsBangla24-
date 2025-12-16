"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article, Category } from "@/types";

interface BangladeshSectionProps {
  articles: any[];
  categories: Category[];
}

export default function BangladeshSection({
  articles,
  categories,
}: BangladeshSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter articles based on search and category
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let result = [...articles];

      // Filter by category
      if (selectedCategory !== "all") {
        result = result.filter(
          (article) => article.category.slug === selectedCategory
        );
      }

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          (article) =>
            article.title.toLowerCase().includes(term) ||
            article.excerpt.toLowerCase().includes(term) ||
            (article.content?.toLowerCase().includes(term) ?? false)
        );
      }

      setFilteredArticles(result);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [articles, searchTerm, selectedCategory]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            বাংলাদেশ
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">সব বিভাগ</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600">লোড হচ্ছে...</p>
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">কোনো খবর পাওয়া যায়নি</p>
            <p className="text-sm text-gray-500 mt-1">
              আপনার অনুসন্ধান মানদণ্ড পরিবর্তন করার চেষ্টা করুন
            </p>
          </div>
        )}

        {/* Articles grid - Prothom Alo Style */}
        {!isLoading && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group border-b border-gray-200 pb-4 hover:shadow-sm transition-all"
              >
                <Link href={`/article/${article.slug}`} className="block">
                  <div className="flex gap-3">
                    <div className="relative aspect-video w-24 shrink-0 rounded overflow-hidden">
                      <Image
                        src={article.featuredImage || "/placeholder.png"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                          {article.category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            article.publishedAt || ""
                          ).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-red-600">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* View more button */}
        {!isLoading && filteredArticles.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/categories/country-news"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <span>আরও দেখুন</span>
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
        )}
      </div>
    </section>
  );
}
