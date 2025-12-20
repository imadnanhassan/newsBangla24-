"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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
  Edit,
  Trash2,
  MoreVertical,
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
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <motion.div
          className="relative overflow-hidden bg-linear-to-r from-red-500 to-red-600 rounded-lg mx-4 sm:mx-6 lg:mx-8 mt-6 sm:mt-8 mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <motion.div
                  className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg shadow"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    প্রকাশিত নিবন্ধ 📊
                  </motion.h1>
                  <motion.p
                    className="text-white/90 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    আপনার প্রকাশিত নিবন্ধ এবং তাদের পারফরম্যান্স দেখুন
                  </motion.p>
                </div>
              </div>
              <div className="shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/reporter/analytics"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-red-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg font-semibold text-sm sm:text-base"
                  >
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    বিস্তারিত অ্যানালিটিক্স
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-white/10 rounded-full -translate-y-20 sm:-translate-y-40 translate-x-20 sm:translate-x-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full translate-y-16 sm:translate-y-32 -translate-x-16 sm:-translate-x-32 animate-pulse"></div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </motion.div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "মোট প্রকাশিত",
                  value: articles.length.toString(),
                  icon: FileText,
                  color: "from-blue-500 to-blue-600",
                  bg: "bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400",
                  iconBg: "bg-blue-500",
                },
                {
                  title: "মোট ভিউ",
                  value: totalViews.toLocaleString(),
                  icon: Eye,
                  color: "from-green-500 to-green-600",
                  bg: "bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400",
                  iconBg: "bg-green-500",
                },
                {
                  title: "মোট মন্তব্য",
                  value: totalComments.toString(),
                  icon: MessageSquare,
                  color: "from-purple-500 to-purple-600",
                  bg: "bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400",
                  iconBg: "bg-purple-500",
                },
                {
                  title: "মোট শেয়ার",
                  value: totalShares.toString(),
                  icon: Share2,
                  color: "from-orange-500 to-orange-600",
                  bg: "bg-linear-to-br from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400",
                  iconBg: "bg-orange-500",
                },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className={`${stat.bg} rounded p-6 transition-all duration-300 shadow-lg`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 ${stat.iconBg} rounded flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <motion.div
                        className="ml-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <motion.p
                          className="text-sm font-medium text-gray-600"
                          whileHover={{ scale: 1.05 }}
                        >
                          {stat.title}
                        </motion.p>
                        <motion.p
                          className="text-3xl font-bold text-gray-900"
                          whileHover={{ scale: 1.05 }}
                        >
                          {stat.value}
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="প্রকাশিত নিবন্ধ খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm sm:text-base transition-all"
                  />
                </div>

                {/* Sort Filter */}
                <div className="flex justify-center sm:justify-start">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white text-sm sm:text-base transition-all"
                  >
                    <option value="date">তারিখ অনুসারে</option>
                    <option value="views">ভিউ অনুসারে</option>
                    <option value="comments">মন্তব্য অনুসারে</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden transition-all duration-300">
              <div className="divide-y divide-gray-200">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer hover:shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      {/* Article Image */}
                      {article.image && (
                        <div className="shrink-0 mx-auto sm:mx-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      )}

                      {/* Article Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left">
                                {article.title}
                              </h3>
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full self-center sm:self-auto">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                প্রকাশিত
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 text-center sm:text-left">
                              {article.excerpt}
                            </p>

                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                {article.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>প্রকাশ: {article.publishedAt}</span>
                              </div>
                              <span className="text-gray-400 hidden sm:inline">
                                •
                              </span>
                              <span>{article.readTime} পড়ার সময়</span>
                            </div>

                            {/* Performance Stats */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                              <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                <span className="text-xs sm:text-sm font-medium text-gray-900">
                                  {article.views.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ভিউ
                                </span>
                              </div>
                              <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2">
                                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                <span className="text-xs sm:text-sm font-medium text-gray-900">
                                  {article.comments}
                                </span>
                                <span className="text-xs text-gray-500">
                                  মন্তব্য
                                </span>
                              </div>
                              <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2">
                                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                                <span className="text-xs sm:text-sm font-medium text-gray-900">
                                  {article.shares}
                                </span>
                                <span className="text-xs text-gray-500">
                                  শেয়ার
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-1">
                            <motion.button
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group relative"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              title="প্রিভিউ দেখুন"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </motion.button>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/reporter/articles/edit/${article.id}`}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group relative block"
                                title="সম্পাদনা করুন"
                              >
                                <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </Link>
                            </motion.div>
                            <motion.button
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group relative"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </motion.button>
                            <motion.button
                              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 group relative"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              title="আরও অপশন"
                            >
                              <MoreVertical className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <motion.div
                  className="p-8 sm:p-12 text-center transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    কোনো প্রকাশিত নিবন্ধ নেই
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    {searchTerm
                      ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।"
                      : "আপনার এখনও কোনো নিবন্ধ প্রকাশিত হয়নি।"}
                  </p>
                  <Link
                    href="/reporter/articles/create"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg font-semibold text-sm sm:text-base"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    প্রথম নিবন্ধ লিখুন
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Performance Insights */}
            <motion.div
              className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                  পারফরম্যান্স ইনসাইট
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <motion.div
                  className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    সেরা পারফর্মার
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700 line-clamp-2">
                    "
                    {articles.sort((a, b) => b.views - a.views)[0]?.title ||
                      "কোনো নিবন্ধ নেই"}
                    " - {articles[0]?.views || 0} ভিউ
                  </p>
                </motion.div>
                <motion.div
                  className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    গড় ভিউ
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    প্রতি নিবন্ধে{" "}
                    {articles.length > 0
                      ? Math.round(totalViews / articles.length)
                      : 0}{" "}
                    ভিউ
                  </p>
                </motion.div>
                <motion.div
                  className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    এনগেজমেন্ট রেট
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    {articles.length > 0
                      ? Math.round((totalComments / totalViews) * 100)
                      : 0}
                    % মন্তব্য রেট
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
