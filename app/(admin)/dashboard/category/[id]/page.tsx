"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Edit,
  Tag,
  FileText,
  Eye,
  Calendar,
  User,
} from "lucide-react";

export default function SingleCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);

  // SEO optimization
  useEffect(() => {
    document.title = "Category Details - NewsBangla24 Admin";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View detailed information about a news category including articles and statistics."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "View detailed information about a news category including articles and statistics.";
      document.head.appendChild(meta);
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", "noindex, nofollow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
    }
  }, []);

  // Mock data loading - replace with actual API call
  useEffect(() => {
    const loadCategory = async () => {
      // Simulate API call
      setTimeout(() => {
        // Mock category data
        const mockCategory = {
          id: "1",
          name: "রাজনীতি",
          nameEn: "Politics",
          slug: "politics",
          description:
            "Comprehensive coverage of national and international political news, including elections, government policies, and political analysis.",
          parentCategory: "News",
          articleCount: 42,
          status: "Active",
          color: "#dc2626",
          icon: "🏛️",
          createdAt: "2024-01-15",
          lastUpdated: "2024-12-10",
        };
        setCategoryData(mockCategory);
        setLoading(false);
      }, 1000);
    };

    loadCategory();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link
            href="/dashboard/category"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <motion.div
        className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 rounded p-8 text-white shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-3 bg-white/20 backdrop-blur-sm rounded shadow"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Tag className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {categoryData.name} ({categoryData.nameEn})
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Category details and article overview
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <Link href={`/dashboard/category/edit/${categoryData.id}`}>
                <motion.button
                  className="flex items-center space-x-3 bg-white text-blue-600 px-6 py-3 rounded cursor-pointer font-bold  transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Category</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="/dashboard/category"
          className="flex items-center space-x-3 px-4 py-2  text-gray-700 rounded hover:bg-gray-50 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Categories</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Information */}
          <motion.div
            className="bg-white rounded  p-8 shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Category Information
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category Name
                  </label>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                    {categoryData.articleCount} articles
                  </span>
                </div>
                <div className="text-lg font-medium text-gray-900 mb-2">
                  {categoryData.name} ({categoryData.nameEn})
                </div>
                <div className="text-sm text-gray-500">
                  Slug: {categoryData.slug}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>
                <p className="text-gray-700 leading-relaxed">
                  {categoryData.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category Details
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Parent: {categoryData.parentCategory || "None"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Created:{" "}
                      {new Date(categoryData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Status: {categoryData.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: categoryData.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      Color: {categoryData.color}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Recent Articles */}
          <motion.div
            className="bg-white rounded  p-8 shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <FileText className="w-6 h-6 mr-3 text-green-600" />
              Recent Articles
            </motion.h3>

            <div className="space-y-4">
              {/* Mock articles - in real app, fetch from API */}
              {[
                {
                  title: "Major Political Development Analysis",
                  date: "2024-12-10",
                  status: "Published",
                },
                {
                  title: "Exclusive Interview with Prime Minister",
                  date: "2024-12-05",
                  status: "Published",
                },
                {
                  title: "Election Results and Analysis",
                  date: "2024-11-30",
                  status: "Published",
                },
              ].map((article, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                >
                  <h4 className="font-medium text-gray-900 mb-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      Published: {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        article.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category Icon */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <Tag className="w-6 h-6 mr-3 text-purple-600" />
              Category Icon
            </motion.h3>

            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                {categoryData.icon}
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Statistics
            </motion.h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Articles</span>
                <span className="font-semibold text-gray-900">
                  {categoryData.articleCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    categoryData.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {categoryData.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Updated</span>
                <span className="text-sm text-gray-900">
                  {new Date(categoryData.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
