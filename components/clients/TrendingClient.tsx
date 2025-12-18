"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Eye,
  MessageSquare,
  Share2,
  Clock,
  ArrowUp,
  ArrowDown,
  Filter,
  BarChart3,
} from "lucide-react";
import {
  TrendingArticle,
  TrendingTopic,
  TrendingStats,
  TrendingAnalytics,
} from "@/types/trending";
import {
  dummyTrendingArticles,
  dummyTrendingTopics,
  dummyTrendingStats,
  dummyTrendingAnalytics,
} from "@/lib/dummy-trending";

export default function TrendingClient() {
  const [articles] = useState<TrendingArticle[]>(dummyTrendingArticles);
  const [topics] = useState<TrendingTopic[]>(dummyTrendingTopics);
  const [stats] = useState<TrendingStats>(dummyTrendingStats);
  const [analytics] = useState<TrendingAnalytics>(dummyTrendingAnalytics);
  const [sortBy, setSortBy] = useState("views");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedArticles = [...articles].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case "views":
        aVal = a.views;
        bVal = b.views;
        break;
      case "comments":
        aVal = a.comments;
        bVal = b.comments;
        break;
      case "shares":
        aVal = a.shares;
        bVal = b.shares;
        break;
      case "trend":
        aVal = a.trendPercentage;
        bVal = b.trendPercentage;
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

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <ArrowUp className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-orange-500 to-red-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Trending Analytics</h1>
                <p className="text-white/80 mt-1">
                  Monitor trending topics and popular content performance
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-3 bg-white text-orange-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics Report</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-linear-to-br from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Trending Articles
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.totalArticles}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Total Engagement
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {formatNumber(stats.totalEngagement)}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Hot Topics
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.hotTopics}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Viral Content
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.viralContent}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split("-");
              setSortBy(by);
              setSortOrder(order);
            }}
            className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="views-desc">Views High to Low</option>
            <option value="views-asc">Views Low to High</option>
            <option value="comments-desc">Comments High to Low</option>
            <option value="comments-asc">Comments Low to High</option>
            <option value="shares-desc">Shares High to Low</option>
            <option value="shares-asc">Shares Low to High</option>
            <option value="trend-desc">Trend % High to Low</option>
            <option value="trend-asc">Trend % Low to High</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {sortedArticles.length} trending articles
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Articles Table */}
        <div className="lg:col-span-2 bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedArticles.map((article, index) => (
                  <tr
                    key={article.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-orange-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {article.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-blue-400 mr-1" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 text-green-400 mr-1" />
                          {article.comments}
                        </div>
                        <div className="flex items-center">
                          <Share2 className="w-4 h-4 text-purple-400 mr-1" />
                          {article.shares}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTrendIcon(article.trend)}
                        <span
                          className={`ml-1 text-sm font-medium ${getTrendColor(
                            article.trend
                          )}`}
                        >
                          {Math.abs(article.trendPercentage)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded border border-gray-100 transition-all duration-300">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Hot Topics</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{topic.topic}</p>
                      <p className="text-sm text-gray-500">
                        {topic.mentions.toLocaleString()} mentions
                      </p>
                    </div>
                  </div>
                  {getTrendIcon(topic.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Analytics */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Trending Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics.totalImpressions)}
            </div>
            <div className="text-sm text-gray-600">Total Impressions</div>
            <div className="flex items-center justify-center mt-2">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">
                {analytics.impressionChange}% increase
              </span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics.engagementRate)}
            </div>
            <div className="text-sm text-gray-600">Engagement Rate</div>
            <div className="flex items-center justify-center mt-2">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">
                {analytics.engagementChange}% increase
              </span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics.sharesToday)}
            </div>
            <div className="text-sm text-gray-600">Shares Today</div>
            <div className="flex items-center justify-center mt-2">
              {analytics.sharesChange >= 0 ? (
                <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              ) : (
                <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
              )}
              <span
                className={`text-xs ${
                  analytics.sharesChange >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {Math.abs(analytics.sharesChange)}%{" "}
                {analytics.sharesChange >= 0 ? "increase" : "decrease"}
              </span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {analytics.trendingScore}%
            </div>
            <div className="text-sm text-gray-600">Trending Score</div>
            <div className="flex items-center justify-center mt-2">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">
                {analytics.scoreChange}% increase
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-gray-100 sm:px-6 rounded border transition-all duration-300">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{sortedArticles.length}</span> of{" "}
              <span className="font-medium">{sortedArticles.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
