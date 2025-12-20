"use client";

import Link from "next/link";
import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import { motion } from "framer-motion";
import {
  Clock,
  Search,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Filter,
  Plus,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  submittedAt: string;
  reviewer?: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  comments?: string;
  image?: string;
}

const mockPendingArticles: Article[] = [
  {
    id: 1,
    title: "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি অর্জন",
    excerpt:
      "এ বছর দেশের কৃষি উৎপাদনে রেকর্ড পরিমাণ বৃদ্ধি অর্জিত হয়েছে। বিশেষ করে ধান ও গমের উৎপাদন...",
    category: "কৃষি",
    submittedAt: "২০২৪-০১-১৩",
    reviewer: "আহমেদ হোসেন",
    status: "reviewing",
    comments: "চমৎকার লেখা! কিছু ছোটখাটো সম্পাদনা প্রয়োজন।",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    title: "প্রযুক্তি খাতে নতুন বিনিয়োগ",
    excerpt:
      "দেশের প্রযুক্তি খাতে বিদেশি বিনিয়োগ বৃদ্ধি পেয়েছে। বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট...",
    category: "প্রযুক্তি",
    submittedAt: "২০২৪-০১-১২",
    status: "pending",
  },
  {
    id: 3,
    title: "স্বাস্থ্য সেবায় নতুন উদ্যোগ",
    excerpt:
      "গ্রামীণ এলাকায় স্বাস্থ্য সেবা পৌঁছে দিতে সরকার নতুন উদ্যোগ গ্রহণ করেছে...",
    category: "স্বাস্থ্য",
    submittedAt: "২০২৪-০১-১১",
    reviewer: "সাবিনা ইয়াসমিন",
    status: "reviewing",
    comments: "খুবই গুরুত্বপূর্ণ বিষয়। আরও বিস্তারিত তথ্য যোগ করা যেতে পারে।",
  },
];

const statusConfig = {
  pending: {
    label: "অপেক্ষমান",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  reviewing: {
    label: "পর্যালোচনায়",
    color: "bg-yellow-100 text-yellow-700",
    icon: AlertCircle,
  },
  approved: {
    label: "অনুমোদিত",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  rejected: {
    label: "প্রত্যাখ্যাত",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

export default function PendingPage() {
  const [articles, setArticles] = useState<Article[]>(mockPendingArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.reviewer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case "title":
        aVal = a.title.toLowerCase();
        bVal = b.title.toLowerCase();
        break;
      case "date":
        aVal = new Date(a.submittedAt);
        bVal = new Date(b.submittedAt);
        break;
      default:
        return 0;
    }
    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return (
    <ReporterLayout title="পর্যালোচনায় নিবন্ধ">
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <motion.div
          className="relative overflow-hidden bg-linear-to-r from-orange-500 to-red-500 rounded-lg mx-4 sm:mx-6 lg:mx-8 mt-6 sm:mt-8 mb-6 sm:mb-8 text-white shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                  পর্যালোচনায় নিবন্ধ ⏳
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl">
                  আপনার জমা দেওয়া নিবন্ধগুলোর পর্যালোচনা অবস্থা দেখুন
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-white/10 rounded-full -translate-y-20 sm:-translate-y-40 translate-x-20 sm:translate-x-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full translate-y-16 sm:translate-y-32 -translate-x-16 sm:-translate-x-32 animate-pulse"></div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </motion.div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "মোট পর্যালোচনায়",
                  value: articles.length,
                  icon: FileText,
                  color: "from-blue-500 to-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  title: "পর্যালোচনায়",
                  value: articles.filter((a) => a.status === "reviewing")
                    .length,
                  icon: Clock,
                  color: "from-yellow-500 to-yellow-600",
                  bg: "bg-yellow-50",
                },
                {
                  title: "অনুমোদিত",
                  value: articles.filter((a) => a.status === "approved").length,
                  icon: CheckCircle,
                  color: "from-green-500 to-green-600",
                  bg: "bg-green-50",
                },
                {
                  title: "প্রত্যাখ্যাত",
                  value: articles.filter((a) => a.status === "rejected").length,
                  icon: AlertCircle,
                  color: "from-red-500 to-red-600",
                  bg: "bg-red-50",
                },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className={`bg-linear-to-br ${stat.color} rounded p-6 transition-all duration-300`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-current" />
                      </div>
                      <motion.div
                        className="ml-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <motion.p
                          className="text-sm font-medium text-white/80"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.title}
                        </motion.p>
                        <motion.p
                          className="text-3xl font-bold text-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.value}
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Search */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="পর্যালোচনায় নিবন্ধ খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm sm:text-base transition-all"
                />
              </div>
            </motion.div>

            {/* Articles List */}
            <motion.div
              className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="divide-y divide-gray-200">
                {filteredArticles.map((article, index) => {
                  const StatusIcon = statusConfig[article.status].icon;
                  return (
                    <motion.div
                      key={article.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.005 }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Article Image */}
                        {article.image && (
                          <div className="shrink-0">
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
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                              </p>

                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                  {article.category}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>জমা: {article.submittedAt}</span>
                                </div>
                                {article.reviewer && (
                                  <div className="flex items-center space-x-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>পর্যালোচক: {article.reviewer}</span>
                                  </div>
                                )}
                              </div>

                              {/* Status and Comments */}
                              <div className="flex items-start space-x-3">
                                <span
                                  className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                                    statusConfig[article.status].color
                                  }`}
                                >
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusConfig[article.status].label}
                                </span>
                                {article.comments && (
                                  <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-sm text-blue-800">
                                      <strong>মন্তব্য:</strong>{" "}
                                      {article.comments}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-4">
                              <Link
                                href={`/reporter/articles/edit/${article.id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="সম্পাদনা"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                                title="প্রিভিউ"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    কোনো পর্যালোচনায় নিবন্ধ নেই
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm
                      ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।"
                      : "আপনার কোনো নিবন্ধ পর্যালোচনায় নেই।"}
                  </p>
                  <Link
                    href="/reporter/articles/create"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    নতুন নিবন্ধ লিখুন
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Guidelines */}
            <motion.div
              className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.h3
                className="text-lg sm:text-xl font-bold text-blue-900 mb-4 sm:mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" />
                পর্যালোচনা প্রক্রিয়া
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                {[
                  {
                    step: "১",
                    title: "জমা দেওয়া",
                    description:
                      "নিবন্ধ জমা দেওয়ার পর এটি পর্যালোচনার জন্য অপেক্ষা করে",
                  },
                  {
                    step: "২",
                    title: "পর্যালোচনা",
                    description:
                      "সম্পাদকরা নিবন্ধ পর্যালোচনা করেন এবং প্রয়োজনীয় পরিবর্তন সাজেস্ট করেন",
                  },
                  {
                    step: "৩",
                    title: "প্রকাশনা",
                    description: "অনুমোদিত নিবন্ধগুলো ওয়েবসাইটে প্রকাশিত হয়",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 hover:shadow-md transition-all duration-300 p-2 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 shadow">
                      <span className="text-blue-600 font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
