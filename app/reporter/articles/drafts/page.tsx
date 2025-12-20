"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
  MoreVertical,
  Clock,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

const mockDrafts: Article[] = [
  {
    id: 1,
    title: "শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাবনা",
    excerpt:
      "শিক্ষা মন্ত্রণালয় থেকে নতুন শিক্ষা সংস্কার প্রস্তাবনা উপস্থাপন করা হয়েছে যা আগামী বছর থেকে কার্যকর হবে...",
    category: "শিক্ষা",
    createdAt: "২০২৪-০১-১৪",
    updatedAt: "৪ ঘন্টা আগে",
  },
  {
    id: 2,
    title: "প্রযুক্তি খাতে নতুন বিনিয়োগ",
    excerpt:
      "দেশের প্রযুক্তি খাতে বিদেশি বিনিয়োগ বৃদ্ধি পেয়েছে। বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট এবং...",
    category: "প্রযুক্তি",
    createdAt: "২০২৪-০১-১২",
    updatedAt: "২ দিন আগে",
  },
  {
    id: 3,
    title: "স্বাস্থ্য সেবায় নতুন উদ্যোগ",
    excerpt:
      "গ্রামীণ এলাকায় স্বাস্থ্য সেবা পৌঁছে দিতে সরকার নতুন উদ্যোগ গ্রহণ করেছে...",
    category: "স্বাস্থ্য",
    createdAt: "২০২৪-০১-১০",
    updatedAt: "৫ দিন আগে",
    image: "/api/placeholder/300/200",
  },
];

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Article[]>(mockDrafts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ReporterLayout title="খসড়া নিবন্ধ">
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <motion.div
          className="relative overflow-hidden bg-linear-to-r from-amber-500 to-yellow-500 rounded-lg mx-4 sm:mx-6 lg:mx-8 mt-6 sm:mt-8 mb-6 sm:mb-8 text-white shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                  খসড়া নিবন্ধ 📝
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl">
                  আপনার অসম্পূর্ণ নিবন্ধগুলো পরিচালনা করুন
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/reporter/articles/create"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg font-semibold text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  নতুন নিবন্ধ
                </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div className="bg-linear-to-br from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 p-4 rounded  shadow-sm transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <motion.div
                    className="ml-3 sm:ml-4 min-w-0 flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.p
                      className="text-sm font-medium text-gray-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      মোট খসড়া
                    </motion.p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold text-gray-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      {drafts.length}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 p-4 rounded shadow-sm transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <motion.div
                    className="ml-3 sm:ml-4 min-w-0 flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.p
                      className="text-sm font-medium text-gray-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      এই সপ্তাহে
                    </motion.p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold text-gray-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      {
                        drafts.filter((d) => {
                          const draftDate = new Date(d.createdAt);
                          const weekAgo = new Date();
                          weekAgo.setDate(weekAgo.getDate() - 7);
                          return draftDate >= weekAgo;
                        }).length
                      }
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 p-4 rounded  shadow-sm transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                    <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <motion.div
                    className="ml-3 sm:ml-4 min-w-0 flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.p
                      className="text-sm font-medium text-gray-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      সম্পাদিত
                    </motion.p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold text-gray-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      {drafts.filter((d) => d.updatedAt !== d.createdAt).length}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="খসড়া নিবন্ধ খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm sm:text-base transition-all"
                />
              </div>
            </div>

            {/* Drafts List */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
              <div className="divide-y divide-gray-200">
                {filteredDrafts.map((draft, index) => (
                  <motion.div
                    key={draft.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Article Image */}
                      {draft.image && (
                        <div className="shrink-0">
                          <img
                            src={draft.image}
                            alt={draft.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Article Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {draft.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {draft.excerpt}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                                খসড়া
                              </span>
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                {draft.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>তৈরি: {draft.createdAt}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>আপডেট: {draft.updatedAt}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2 ml-4">
                            <Link
                              href={`/reporter/articles/edit/${draft.id}`}
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
                            <button
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                              title="আরও"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredDrafts.length === 0 && (
                <motion.div
                  className="p-8 sm:p-12 text-center transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    কোনো খসড়া নিবন্ধ পাওয়া যায়নি
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    {searchTerm
                      ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো খসড়া নিবন্ধ খুঁজে পাওয়া যায়নি।"
                      : "আপনার কোনো খসড়া নিবন্ধ নেই।"}
                  </p>
                  <Link
                    href="/reporter/articles/create"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all shadow-lg font-semibold text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    প্রথম খসড়া তৈরি করুন
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            <motion.div
              className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 sm:p-6 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-4">
                দ্রুত কাজ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/reporter/articles/create"
                    className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-amber-200 hover:bg-amber-50 hover:shadow-md transition-all duration-300 "
                  >
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">নতুন নিবন্ধ</h4>
                      <p className="text-sm text-gray-600">
                        খসড়া হিসেবে শুরু করুন
                      </p>
                    </div>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-amber-200 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">ব্যাকআপ</h4>
                    <p className="text-sm text-gray-600">সব খসড়া ব্যাকআপ</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-amber-200 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <Edit className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">টেমপ্লেট</h4>
                    <p className="text-sm text-gray-600">
                      নিবন্ধ টেমপ্লেট ব্যবহার
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
