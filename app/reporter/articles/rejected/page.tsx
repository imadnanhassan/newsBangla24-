"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import ReporterLayout from "@/components/reporter/layout/ReporterLayout";
import {
  AlertCircle,
  Search,
  Edit,
  RefreshCw,
  MessageSquare,
  Calendar,
  FileText,
  X,
  AlertTriangle,
  BarChart3,
  TrendingUp,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  submittedAt: string;
  rejectedAt: string;
  reviewer: string;
  reason: string;
  feedback: string;
  canResubmit: boolean;
  image?: string;
}

const mockRejectedArticles: Article[] = [
  {
    id: 1,
    title: "প্রযুক্তি খাতে নতুন বিনিয়োগ",
    excerpt:
      "দেশের প্রযুক্তি খাতে বিদেশি বিনিয়োগ বৃদ্ধি পেয়েছে। বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট...",
    category: "প্রযুক্তি",
    submittedAt: "২০২৪-০১-১২",
    rejectedAt: "২০২৪-০১-১৪",
    reviewer: "কাজী রহমান",
    reason: "তথ্য যাচাই করা যায়নি",
    feedback:
      "আপনার নিবন্ধে উল্লেখিত পরিসংখ্যানগুলোর উৎস যাচাই করা যায়নি। অনুগ্রহ করে বিশ্বস্ত উৎস থেকে তথ্য যোগ করুন এবং পুনরায় জমা দিন।",
    canResubmit: true,
  },
  {
    id: 2,
    title: "শিক্ষা সংস্কার প্রস্তাব",
    excerpt:
      "শিক্ষা মন্ত্রণালয় নতুন শিক্ষা সংস্কার প্রস্তাব উপস্থাপন করেছে...",
    category: "শিক্ষা",
    submittedAt: "২০২৪-০১-০৮",
    rejectedAt: "২০২৪-০১-১০",
    reviewer: "সাবিনা ইয়াসমিন",
    reason: "সম্পাদনা প্রয়োজন",
    feedback:
      "নিবন্ধটি খুব দীর্ঘ এবং বিস্তারিত। অনুগ্রহ করে সংক্ষিপ্ত করে এবং আরও ফোকাসড করে লিখুন।",
    canResubmit: true,
    image: "/api/placeholder/300/200",
  },
];

export default function RejectedPage() {
  const [articles, setArticles] = useState<Article[]>(mockRejectedArticles);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ReporterLayout title="প্রত্যাখ্যাত নিবন্ধ">
      <div className="min-h-screen bg-gray-50">
        <motion.div
          className="relative overflow-hidden bg-linear-to-r from-orange-500 via-red-500 to-red-600 rounded-lg mx-4 sm:mx-6 lg:mx-8 mt-6 sm:mt-8 mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
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
                  <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    প্রত্যাখ্যাত নিবন্ধ ⚠️
                  </motion.h1>
                  <motion.p
                    className="text-white/90 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    পর্যালোচকের মতামত দেখুন এবং উন্নতি করে পুনরায় জমা দিন
                  </motion.p>
                </div>
              </div>
              <div className="shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/reporter/articles/create"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-all shadow-lg font-semibold text-sm sm:text-base"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    নতুন নিবন্ধ লিখুন
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
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg border shadow-sm">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                      মোট প্রত্যাখ্যাত
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {articles.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg border shadow-sm">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                      পুনরায় জমা দেওয়া যাবে
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {articles.filter((a) => a.canResubmit).length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg border shadow-sm">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                      মতামত পাওয়া
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {articles.filter((a) => a.feedback).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="প্রত্যাখ্যাত নিবন্ধ খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-4 sm:space-y-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg border shadow-sm overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
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
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 mb-4">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left">
                                {article.title}
                              </h3>
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full self-center sm:self-auto">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                প্রত্যাখ্যাত
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 text-center sm:text-left">
                              {article.excerpt}
                            </p>

                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 text-xs sm:text-sm text-gray-500">
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                {article.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>জমা: {article.submittedAt}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>প্রত্যাখ্যান: {article.rejectedAt}</span>
                              </div>
                              <span className="text-gray-400 hidden sm:inline">
                                •
                              </span>
                              <span>পর্যালোচক: {article.reviewer}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center sm:justify-end">
                            {article.canResubmit && (
                              <Link
                                href={`/reporter/articles/edit/${article.id}`}
                                className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg text-sm font-semibold"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                সম্পাদনা করুন
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Rejection Details */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 shrink-0" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-red-900 mb-2">
                                প্রত্যাখ্যানের কারণ: {article.reason}
                              </h4>
                              <p className="text-sm text-red-800 mb-3">
                                {article.feedback}
                              </p>
                              {article.canResubmit && (
                                <div className="flex items-center space-x-2 text-xs text-red-700">
                                  <RefreshCw className="w-3 h-3" />
                                  <span>
                                    আপনি এই নিবন্ধটি সম্পাদনা করে পুনরায় জমা
                                    দিতে পারেন
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="bg-white rounded-lg border shadow-sm p-8 sm:p-12 text-center">
                <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  কোনো প্রত্যাখ্যাত নিবন্ধ নেই
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
                  {searchTerm
                    ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।"
                    : "অভিনন্দন! আপনার কোনো নিবন্ধ প্রত্যাখ্যাত হয়নি।"}
                </p>
                <Link
                  href="/reporter/articles/create"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg font-semibold text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  নতুন নিবন্ধ লিখুন
                </Link>
              </div>
            )}

            {/* Improvement Tips */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4">
                নিবন্ধ উন্নত করার টিপস
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    তথ্য যাচাই
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    সব তথ্যের বিশ্বস্ত উৎস উল্লেখ করুন এবং পরিসংখ্যান যাচাই করে
                    নিন।
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    সংক্ষিপ্ত লেখা
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    পাঠকের আগ্রহ ধরে রাখতে সংক্ষিপ্ত এবং প্রাসঙ্গিক লেখুন।
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    ভাষা পরিশোধন
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    বানান, ব্যাকরণ এবং ভাষা পরীক্ষা করে নিন।
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                    মূল্যবান কনটেন্ট
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    পাঠকের জন্য মূল্যবান তথ্য এবং অন্তর্দৃষ্টি প্রদান করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
