"use client";

import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";

export default function ImprovedMasonryGrid({
  articles,
  title = "আরও পড়ুন",
  category = "all",
}: {
  articles: Article[];
  title?: string;
  category?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6 border-b border-red-600 pb-3">
          <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            {title}
          </h2>
          <Link
            href={`/categories/${category}`}
            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
          >
            <span>সব দেখুন</span>
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

        {/* Improved Masonry Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First column - large featured article */}
          <div className="lg:col-span-1">
            <article className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <Link href={`/article/${articles[0].slug}`} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={articles[0].image || "/placeholder.png"}
                    alt={articles[0].title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                      {articles[0].category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(
                        articles[0].publishedAt || ""
                      ).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-red-600">
                    {articles[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {articles[0].excerpt}
                  </p>
                </div>
              </Link>
            </article>
          </div>

          {/* Second column - medium articles */}
          <div className="lg:col-span-1 space-y-6">
            {articles.slice(1, 4).map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <Link href={`/article/${article.slug}`} className="block">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.png"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        {article.category.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.publishedAt || "").toLocaleDateString(
                          "bn-BD",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-red-600">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Third column - small articles list */}
          <div className="lg:col-span-1 space-y-4">
            {articles.slice(4, 8).map((article) => (
              <article
                key={article.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                <Link href={`/article/${article.slug}`} className="block">
                  <div className="flex gap-3 p-3">
                    <div className="relative aspect-video w-24 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.png"}
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
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
