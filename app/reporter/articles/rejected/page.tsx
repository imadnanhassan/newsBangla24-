"use client";

import Link from "next/link";
import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              প্রত্যাখ্যাত নিবন্ধ
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              পর্যালোচকের মতামত দেখুন এবং উন্নতি করে পুনরায় জমা দিন
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  মোট প্রত্যাখ্যাত
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <RefreshCw className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  পুনরায় জমা দেওয়া যাবে
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter((a) => a.canResubmit).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  মতামত পাওয়া
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter((a) => a.feedback).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="প্রত্যাখ্যাত নিবন্ধ খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg border overflow-hidden"
            >
              <div className="p-6">
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
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {article.title}
                          </h3>
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            প্রত্যাখ্যাত
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {article.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>জমা: {article.submittedAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <X className="w-4 h-4" />
                            <span>প্রত্যাখ্যান: {article.rejectedAt}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span>পর্যালোচক: {article.reviewer}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {article.canResubmit && (
                          <Link
                            href={`/reporter/articles/edit/${article.id}`}
                            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            সম্পাদনা করুন
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Rejection Details */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
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
                                আপনি এই নিবন্ধটি সম্পাদনা করে পুনরায় জমা দিতে
                                পারেন
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
          <div className="bg-white rounded-lg border p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোনো প্রত্যাখ্যাত নিবন্ধ নেই
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।"
                : "অভিনন্দন! আপনার কোনো নিবন্ধ প্রত্যাখ্যাত হয়নি।"}
            </p>
            <Link
              href="/reporter/articles/create"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              নতুন নিবন্ধ লিখুন
            </Link>
          </div>
        )}

        {/* Improvement Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            নিবন্ধ উন্নত করার টিপস
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">তথ্য যাচাই</h4>
              <p className="text-sm text-blue-700">
                সব তথ্যের বিশ্বস্ত উৎস উল্লেখ করুন এবং পরিসংখ্যান যাচাই করে নিন।
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">সংক্ষিপ্ত লেখা</h4>
              <p className="text-sm text-blue-700">
                পাঠকের আগ্রহ ধরে রাখতে সংক্ষিপ্ত এবং প্রাসঙ্গিক লেখুন।
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">ভাষা পরিশোধন</h4>
              <p className="text-sm text-blue-700">
                বানান, ব্যাকরণ এবং ভাষা পরীক্ষা করে নিন।
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">
                মূল্যবান কনটেন্ট
              </h4>
              <p className="text-sm text-blue-700">
                পাঠকের জন্য মূল্যবান তথ্য এবং অন্তর্দৃষ্টি প্রদান করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
