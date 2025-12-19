"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  MoreVertical,
  FileText,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { ReporterLayout } from "@/components/reporter/layout";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  status: "draft" | "pending" | "published" | "rejected";
  category: string;
  views: string;
  comments: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি পেয়েছে",
    excerpt:
      "এবারের স্থানীয় সরকার নির্বাচনে ভোটার উপস্থিতি গত নির্বাচনের তুলনায় উল্লেখযোগ্য হারে বৃদ্ধি পেয়েছে...",
    status: "published",
    category: "রাজনীতি",
    views: "2.3K",
    comments: 15,
    createdAt: "২০২৪-০১-১৫",
    updatedAt: "২ ঘন্টা আগে",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    title: "শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাবনা",
    excerpt:
      "শিক্ষা মন্ত্রণালয় থেকে নতুন শিক্ষা সংস্কার প্রস্তাবনা উপস্থাপন করা হয়েছে যা আগামী বছর থেকে কার্যকর হবে...",
    status: "draft",
    category: "শিক্ষা",
    views: "0",
    comments: 0,
    createdAt: "২০২৪-০১-১৪",
    updatedAt: "৪ ঘন্টা আগে",
  },
  {
    id: 3,
    title: "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি অর্জন",
    excerpt:
      "এ বছর দেশের কৃষি উৎপাদনে রেকর্ড পরিমাণ বৃদ্ধি অর্জিত হয়েছে। বিশেষ করে ধান ও গমের উৎপাদন...",
    status: "pending",
    category: "কৃষি",
    views: "1.8K",
    comments: 8,
    createdAt: "২০২৪-০১-১৩",
    updatedAt: "১ দিন আগে",
    image: "/api/placeholder/300/200",
  },
  {
    id: 4,
    title: "প্রযুক্তি খাতে নতুন বিনিয়োগ",
    excerpt:
      "দেশের প্রযুক্তি খাতে বিদেশি বিনিয়োগ বৃদ্ধি পেয়েছে। বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট এবং...",
    status: "rejected",
    category: "প্রযুক্তি",
    views: "856",
    comments: 3,
    createdAt: "২০২৪-০১-১২",
    updatedAt: "২ দিন আগে",
  },
  {
    id: 5,
    title: "স্বাস্থ্য সেবায় নতুন উদ্যোগ",
    excerpt:
      "গ্রামীণ এলাকায় স্বাস্থ্য সেবা পৌঁছে দিতে সরকার নতুন উদ্যোগ গ্রহণ করেছে। মোবাইল হেলথ ইউনিট...",
    status: "published",
    category: "স্বাস্থ্য",
    views: "3.1K",
    comments: 22,
    createdAt: "২০২৪-০১-১১",
    updatedAt: "৩ দিন আগে",
    image: "/api/placeholder/300/200",
  },
];

const statusConfig = {
  draft: { label: "খসড়া", color: "bg-yellow-100 text-yellow-800", icon: Edit },
  pending: {
    label: "পর্যালোচনায়",
    color: "bg-blue-100 text-blue-800",
    icon: Clock,
  },
  published: {
    label: "প্রকাশিত",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  rejected: {
    label: "প্রত্যাখ্যাত",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [
    "সব",
    "রাজনীতি",
    "শিক্ষা",
    "কৃষি",
    "প্রযুক্তি",
    "স্বাস্থ্য",
    "খেলাধুলা",
    "বিনোদন",
  ];

  return (
    <ReporterLayout title="নিবন্ধ পরিচালনা">
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <div className="bg-linear-to-r from-red-500 via-red-600 to-red-700 text-white">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                  আমার নিবন্ধসমূহ 📝
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-red-100 max-w-2xl">
                  আপনার সব নিবন্ধ এক জায়গায় পরিচালনা করুন এবং তাদের অগ্রগতি
                  নিরীক্ষণ করুন
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/reporter/articles/create"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-all shadow-lg font-semibold text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  নতুন নিবন্ধ
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "মোট নিবন্ধ",
                  value: articles.length.toString(),
                  icon: FileText,
                  color: "from-blue-500 to-blue-600",
                  bg: "bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400",
                  iconBg: "bg-blue-500",
                },
                {
                  title: "প্রকাশিত",
                  value: articles
                    .filter((a) => a.status === "published")
                    .length.toString(),
                  icon: CheckCircle,
                  color: "from-green-500 to-green-600",
                  bg: "bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400",
                  iconBg: "bg-green-500",
                },
                {
                  title: "পর্যালোচনায়",
                  value: articles
                    .filter((a) => a.status === "pending")
                    .length.toString(),
                  icon: Clock,
                  color: "from-orange-500 to-orange-600",
                  bg: "bg-linear-to-br from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400",
                  iconBg: "bg-orange-500",
                },
                {
                  title: "খসড়া",
                  value: articles
                    .filter((a) => a.status === "draft")
                    .length.toString(),
                  icon: Edit,
                  color: "from-yellow-500 to-yellow-600",
                  bg: "bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400",
                  iconBg: "bg-yellow-500",
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
            <div className="bg-white p-4 sm:p-6 rounded border border-gray-100 shadow-sm">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="নিবন্ধ খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-sm sm:text-base"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm bg-white text-sm sm:text-base"
                  >
                    <option value="all">সব স্ট্যাটাস</option>
                    <option value="draft">খসড়া</option>
                    <option value="pending">পর্যালোচনায়</option>
                    <option value="published">প্রকাশিত</option>
                    <option value="rejected">প্রত্যাখ্যাত</option>
                  </select>

                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm bg-white text-sm sm:text-base"
                  >
                    <option value="all">সব বিভাগ</option>
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className="bg-white rounded shadow border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredArticles.map((article, index) => {
                  const StatusIcon = statusConfig[article.status].icon;
                  return (
                    <motion.div
                      key={article.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Article Image */}
                        {article.image && (
                          <div className="shrink-0 mx-auto sm:mx-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded shadow-sm"
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
                                <span
                                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full self-center sm:self-auto ${
                                    statusConfig[article.status].color
                                  }`}
                                >
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusConfig[article.status].label}
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
                                  <span>তৈরি: {article.createdAt}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>{article.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>{article.comments}</span>
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
                  );
                })}
              </div>

              {filteredArticles.length === 0 && (
                <motion.div
                  className="p-12 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    কোনো নিবন্ধ পাওয়া যায়নি
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {searchTerm ||
                    statusFilter !== "all" ||
                    categoryFilter !== "all"
                      ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।"
                      : "আপনার এখনও কোনো নিবন্ধ নেই। নতুন নিবন্ধ তৈরি করে শুরু করুন।"}
                  </p>
                  <Link
                    href="/reporter/articles/create"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg font-semibold"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {searchTerm ||
                    statusFilter !== "all" ||
                    categoryFilter !== "all"
                      ? "নতুন নিবন্ধ তৈরি করুন"
                      : "প্রথম নিবন্ধ লিখুন"}
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Performance Insights */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                  পারফরম্যান্স ইনসাইট
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    সেরা পারফর্মার
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700 line-clamp-2">
                    "
                    {articles.sort(
                      (a, b) => parseInt(b.views) - parseInt(a.views)
                    )[0]?.title || "কোনো নিবন্ধ নেই"}
                    " - {articles[0]?.views || 0} ভিউ
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    গড় ভিউ
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    প্রতি নিবন্ধে{" "}
                    {articles.length > 0
                      ? Math.round(
                          articles.reduce(
                            (sum, a) => sum + parseInt(a.views),
                            0
                          ) / articles.length
                        )
                      : 0}{" "}
                    ভিউ
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200 sm:col-span-2 lg:col-span-1">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    এনগেজমেন্ট রেট
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    {articles.length > 0
                      ? Math.round(
                          (articles.reduce((sum, a) => sum + a.comments, 0) /
                            articles.reduce(
                              (sum, a) => sum + parseInt(a.views),
                              0
                            )) *
                            100
                        )
                      : 0}
                    % মন্তব্য রেট
                  </p>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {filteredArticles.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow border border-gray-100">
                <p className="text-sm text-gray-700 text-center sm:text-left">
                  মোট{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredArticles.length}
                  </span>{" "}
                  টি নিবন্ধ দেখানো হচ্ছে
                </p>
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
                    পূর্বের
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    1
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    পরের
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
