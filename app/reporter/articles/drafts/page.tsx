"use client";

import Link from "next/link";
import { useState } from "react";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">খসড়া নিবন্ধ</h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার অসম্পূর্ণ নিবন্ধগুলো পরিচালনা করুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/articles/create"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              নতুন নিবন্ধ
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-amber-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট খসড়া</p>
                <p className="text-2xl font-bold text-gray-900">
                  {drafts.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">এই সপ্তাহে</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    drafts.filter((d) => {
                      const draftDate = new Date(d.createdAt);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return draftDate >= weekAgo;
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Edit className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">সম্পাদিত</p>
                <p className="text-2xl font-bold text-gray-900">
                  {drafts.filter((d) => d.updatedAt !== d.createdAt).length}
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
              placeholder="খসড়া নিবন্ধ খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Drafts List */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredDrafts.map((draft) => (
              <div
                key={draft.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Article Image */}
                  {draft.image && (
                    <div className="flex-shrink-0">
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
              </div>
            ))}
          </div>

          {filteredDrafts.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো খসড়া নিবন্ধ পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো খসড়া নিবন্ধ খুঁজে পাওয়া যায়নি।"
                  : "আপনার কোনো খসড়া নিবন্ধ নেই।"}
              </p>
              <Link
                href="/reporter/articles/create"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                প্রথম খসড়া তৈরি করুন
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">
            দ্রুত কাজ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/reporter/articles/create"
              className="flex items-center p-4 bg-white rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors"
            >
              <Plus className="w-8 h-8 text-amber-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">নতুন নিবন্ধ</h4>
                <p className="text-sm text-gray-600">খসড়া হিসেবে শুরু করুন</p>
              </div>
            </Link>
            <div className="flex items-center p-4 bg-white rounded-lg border border-amber-200">
              <FileText className="w-8 h-8 text-amber-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">ব্যাকআপ</h4>
                <p className="text-sm text-gray-600">সব খসড়া ব্যাকআপ</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg border border-amber-200">
              <Edit className="w-8 h-8 text-amber-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">টেমপ্লেট</h4>
                <p className="text-sm text-gray-600">নিবন্ধ টেমপ্লেট ব্যবহার</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
