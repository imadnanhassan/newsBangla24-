"use client";

import Link from "next/link";
import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  CheckCircle,
  Search,
  Eye,
  MessageSquare,
  Share2,
  TrendingUp,
  Calendar,
  FileText,
  ExternalLink,
  BarChart3,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  views: number;
  comments: number;
  shares: number;
  readTime: string;
  url: string;
  image?: string;
}

const mockPublishedArticles: Article[] = [
  {
    id: 1,
    title: "স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি",
    excerpt:
      "এবারের স্থানীয় সরকার নির্বাচনে ভোটার উপস্থিতি গত নির্বাচনের তুলনায় উল্লেখযোগ্য হারে বৃদ্ধি পেয়েছে...",
    category: "রাজনীতি",
    publishedAt: "২০২৪-০১-১৫",
    views: 2340,
    comments: 15,
    shares: 8,
    readTime: "3.2 মিনিট",
    url: "/article/local-election-voter-turnout",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    title: "স্বাস্থ্য সেবায় নতুন উদ্যোগ",
    excerpt:
      "গ্রামীণ এলাকায় স্বাস্থ্য সেবা পৌঁছে দিতে সরকার নতুন উদ্যোগ গ্রহণ করেছে। মোবাইল হেলথ ইউনিট...",
    category: "স্বাস্থ্য",
    publishedAt: "২০২৪-০১-১১",
    views: 3100,
    comments: 22,
    shares: 12,
    readTime: "4.1 মিনিট",
    url: "/article/health-services-initiative",
  },
  {
    id: 3,
    title: "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি",
    excerpt:
      "এ বছর দেশের কৃষি উৎপাদনে রেকর্ড পরিমাণ বৃদ্ধি অর্জিত হয়েছে। বিশেষ করে ধান ও গমের উৎপাদন...",
    category: "কৃষি",
    publishedAt: "২০২৪-০১-১৩",
    views: 1800,
    comments: 8,
    shares: 5,
    readTime: "2.8 মিনিট",
    url: "/article/agriculture-production-record",
    image: "/api/placeholder/300/200",
  },
];

export default function PublishedPage() {
  const [articles, setArticles] = useState<Article[]>(mockPublishedArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "views" | "comments">("date");

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.views - a.views;
        case "comments":
          return b.comments - a.comments;
        case "date":
        default:
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
      }
    });

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalComments = articles.reduce(
    (sum, article) => sum + article.comments,
    0
  );
  const totalShares = articles.reduce(
    (sum, article) => sum + article.shares,
    0
  );

  return (
    <ReporterLayout title="প্রকাশিত নিবন্ধ">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              প্রকাশিত নিবন্ধ
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার প্রকাশিত নিবন্ধ এবং তাদের পারফরম্যান্স দেখুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/analytics"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              বিস্তারিত অ্যানালিটিক্স
            </Link>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  মোট প্রকাশিত
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ভিউ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalViews.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট মন্তব্য</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalComments}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Share2 className="w-8 h-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট শেয়ার</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalShares}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="প্রকাশিত নিবন্ধ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="date">তারিখ অনুসারে</option>
              <option value="views">ভিউ অনুসারে</option>
              <option value="comments">মন্তব্য অনুসারে</option>
            </select>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Article Image */}
                  {article.image && (
                    <div className="flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {article.title}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            প্রকাশিত
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {article.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>প্রকাশ: {article.publishedAt}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span>{article.readTime} পড়ার সময়</span>
                        </div>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {article.views.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">ভিউ</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {article.comments}
                            </span>
                            <span className="text-xs text-gray-500">
                              মন্তব্য
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Share2 className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {article.shares}
                            </span>
                            <span className="text-xs text-gray-500">
                              শেয়ার
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="নিবন্ধ দেখুন"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/reporter/articles/edit/${article.id}`}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          title="সম্পাদনা"
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো প্রকাশিত নিবন্ধ নেই
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।"
                  : "আপনার এখনও কোনো নিবন্ধ প্রকাশিত হয়নি।"}
              </p>
              <Link
                href="/reporter/articles/create"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                প্রথম নিবন্ধ লিখুন
              </Link>
            </div>
          )}
        </div>

        {/* Performance Insights */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-900">
              পারফরম্যান্স ইনসাইট
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">
                সেরা পারফর্মার
              </h4>
              <p className="text-sm text-green-700">
                "
                {articles.sort((a, b) => b.views - a.views)[0]?.title ||
                  "কোনো নিবন্ধ নেই"}
                " - {articles[0]?.views || 0} ভিউ
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">গড় ভিউ</h4>
              <p className="text-sm text-green-700">
                প্রতি নিবন্ধে{" "}
                {articles.length > 0
                  ? Math.round(totalViews / articles.length)
                  : 0}{" "}
                ভিউ
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">
                এনগেজমেন্ট রেট
              </h4>
              <p className="text-sm text-green-700">
                {articles.length > 0
                  ? Math.round((totalComments / totalViews) * 100)
                  : 0}
                % মন্তব্য রেট
              </p>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
