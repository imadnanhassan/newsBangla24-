"use client";

import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import { StatsCard, QuickActionCard } from "@/components/reporter/dashboard";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Camera,
  Video,
  CheckCircle,
  Plus,
  Eye,
  MessageSquare,
  Edit,
  TrendingUp,
  Award,
  BarChart3,
  Download,
  ArrowUpRight,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Globe,
  Star,
  Shield,
} from "lucide-react";

export default function StReporterDashboardClient() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedTab, setSelectedTab] = useState("views");

  const myArticles = [
    {
      id: 1,
      title: "স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি",
      status: "Published",
      views: "2.3K",
      comments: 15,
      date: "২ ঘন্টা আগে",
      category: "রাজনীতি",
    },
    {
      id: 2,
      title: "শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাব",
      status: "Draft",
      views: "0",
      comments: 0,
      date: "৪ ঘন্টা আগে",
      category: "শিক্ষা",
    },
    {
      id: 3,
      title: "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি",
      status: "Review",
      views: "1.8K",
      comments: 8,
      date: "১ দিন আগে",
      category: "কৃষি",
    },
  ];

  const stats = [
    {
      title: "মোট নিবন্ধ",
      value: "47",
      change: "+3",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "প্রকাশিত",
      value: "42",
      change: "+2",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      title: "মোট ভিউ",
      value: "125K",
      change: "+15%",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "মন্তব্য",
      value: "892",
      change: "+8%",
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const trafficData: Record<string, number[]> = {
    views: [65, 78, 52, 89, 94, 76, 85],
    users: [45, 68, 72, 59, 84, 66, 75],
  };

  const quickStats = [
    {
      label: "খসড়া নিবন্ধ",
      value: "5",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "পর্যালোচনায়",
      value: "3",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "প্রত্যাখ্যাত",
      value: "2",
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      label: "সক্রিয় প্রকল্প",
      value: "8",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "২টি নিবন্ধ পর্যালোচনার জন্য অপেক্ষমান",
      time: "১০ মিনিট আগে",
    },
    {
      type: "info",
      message: "আপনার নিবন্ধে নতুন মন্তব্য এসেছে",
      time: "৩০ মিনিট আগে",
    },
    {
      type: "success",
      message: "নতুন নিবন্ধ সফলভাবে প্রকাশিত হয়েছে",
      time: "২ ঘন্টা আগে",
    },
  ];

  const topCategories = [
    { name: "রাজনীতি", articles: 12, percentage: 25 },
    { name: "খেলা", articles: 9, percentage: 19 },
    { name: "শিক্ষা", articles: 7, percentage: 15 },
    { name: "স্বাস্থ্য", articles: 6, percentage: 13 },
    { name: "বিনোদন", articles: 5, percentage: 10 },
    { name: "অর্থনীতি", articles: 4, percentage: 8 },
  ];

  return (
    <ReporterLayout title="ড্যাশবোর্ড">
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <div className="bg-linear-to-r from-red-500 via-red-600 to-red-700 text-white">
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                স্বাগতম, রিপোর্টার! 👋
              </h1>
              <p className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto px-4">
                আজ আপনার সংবাদ জগতে নতুন কিছু তৈরি করুন এবং আপনার পাঠকদের আকৃষ্ট
                করুন।
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                ড্যাশবোর্ড ওভারভিউ
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                আপনার সংবাদ প্রকাশনার কর্মক্ষমতা নিরীক্ষণ করুন
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm w-full sm:w-auto"
              >
                <option value="24h">গত ২৪ ঘন্টা</option>
                <option value="7d">গত ৭ দিন</option>
                <option value="30d">গত ৩০ দিন</option>
                <option value="90d">গত ৯০ দিন</option>
              </select>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-all shadow-lg flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                রিপোর্ট ডাউনলোড
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const bgClasses = [
                "bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400",
                "bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400",
                "bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400",
                "bg-linear-to-br from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400",
              ];
              const iconBgs = [
                "bg-blue-500",
                "bg-green-500",
                "bg-purple-500",
                "bg-orange-500",
              ];

              return (
                <motion.div
                  key={index}
                  className={`${bgClasses[index]} rounded p-6 transition-all duration-300`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 ${iconBgs[index]} rounded-lg flex items-center justify-center`}
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
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.title}
                      </motion.p>
                      <motion.p
                        className="text-3xl font-bold text-gray-900"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-sm font-bold text-green-600">
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">
                          গত সপ্তাহ থেকে
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {quickStats.map((stat, index) => {
              const colors = [
                {
                  bg: "bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400",
                  iconBg: "bg-yellow-500",
                },
                {
                  bg: "bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400",
                  iconBg: "bg-blue-500",
                },
                {
                  bg: "bg-linear-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400",
                  iconBg: "bg-red-500",
                },
                {
                  bg: "bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400",
                  iconBg: "bg-green-500",
                },
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <motion.div
                  key={index}
                  className={`rounded p-6 transition-all duration-300 ${colorScheme.bg}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 ${colorScheme.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="ml-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <motion.p
                        className="text-sm font-medium text-gray-600"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.label}
                      </motion.p>
                      <motion.p
                        className="text-xl sm:text-2xl font-bold text-gray-900 mt-2"
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Traffic Chart */}
            <div className="lg:col-span-2 bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-bold">
                  ট্র্যাফিক ওভারভিউ
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTab("views")}
                    className={`text-sm px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === "views"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ভিউ
                  </button>
                  <button
                    onClick={() => setSelectedTab("users")}
                    className={`text-sm px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === "users"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ইউজার
                  </button>
                </div>
              </div>
              <div className="h-48 sm:h-64 flex items-end justify-between space-x-2">
                {trafficData[selectedTab].map((height, index) => (
                  <motion.div
                    key={`${selectedTab}-${index}`}
                    className={`flex-1 ${
                      selectedTab === "views"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } rounded-t-lg transition-all duration-300 cursor-pointer shadow-md`}
                    initial={{ height: "0%" }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  ></motion.div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-4 font-medium">
                <span>সোম</span>
                <span>মঙ্গল</span>
                <span>বুধ</span>
                <span>বৃহ</span>
                <span>শুক্র</span>
                <span>শনি</span>
                <span>রবি</span>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                সিস্টেম অ্যালার্ট
              </h3>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-gray-50 border-l-4"
                    style={{
                      borderLeftColor:
                        alert.type === "warning"
                          ? "#fbbf24"
                          : alert.type === "info"
                          ? "#60a5fa"
                          : "#34d399",
                    }}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories and Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Top Categories */}
            <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                শীর্ষ ক্যাটাগরি
              </h3>
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">
                          {category.name}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {category.articles} নিবন্ধ
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                পারফরম্যান্স মেট্রিক্স
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <span className="text-sm font-medium">গড় লোড টাইম</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">1.2s</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                    <span className="text-sm font-medium">পাঠক সন্তুষ্টি</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">94%</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    <span className="text-sm font-medium">সার্ভার আপটাইম</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    99.9%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <span className="text-sm font-medium">নিরাপত্তা স্কোর</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">A+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold">
                সাম্প্রতিক নিবন্ধ
              </h3>
              <Link
                href="/reporter/articles"
                className="text-sm text-red-600 hover:text-red-800 font-semibold flex items-center"
              >
                সব দেখুন
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {myArticles.map((article) => (
                <div
                  key={article.id}
                  className="py-6 sm:py-8 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <img
                      className="h-12 w-16 rounded object-cover mr-4"
                      src="/api/placeholder/80/60"
                      alt=""
                    />
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-semibold mb-3">
                        {article.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm mb-3">
                        <span>আপনি</span>
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                          {article.category}
                        </span>
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <span className="text-sm font-semibold">
                            {article.views}
                          </span>
                          <span className="text-xs text-gray-500">ভিউ</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <span className="text-sm font-semibold">
                            {article.comments}
                          </span>
                          <span className="text-xs text-gray-500">মন্তব্য</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <span
                        className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full whitespace-nowrap ${
                          article.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : article.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {article.status === "Published"
                          ? "প্রকাশিত"
                          : article.status === "Draft"
                          ? "খসড়া"
                          : "পর্যালোচনায়"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link
              href="/reporter/articles/create"
              className="bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 rounded shadow-lg p-4 sm:p-6 text-white hover:shadow transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    নতুন নিবন্ধ
                  </h4>
                  <p className="text-sm text-white/80">সংবাদ লিখুন</p>
                </div>
              </div>
            </Link>

            <Link
              href="/reporter/media/upload"
              className="bg-linear-to-br from-green-400 via-green-500 to-green-600 rounded shadow p-4 sm:p-6 text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    ছবি আপলোড
                  </h4>
                  <p className="text-sm text-white/80">মিডিয়া যোগ করুন</p>
                </div>
              </div>
            </Link>

            <Link
              href="/reporter/media/videos"
              className="bg-linear-to-br from-purple-400 via-purple-500 to-purple-600 rounded shadow p-4 sm:p-6 text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <Video className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    ভিডিও রিপোর্ট
                  </h4>
                  <p className="text-sm text-white/80">ভিডিও সংবাদ</p>
                </div>
              </div>
            </Link>

            <Link
              href="/reporter/analytics"
              className="bg-linear-to-br from-red-400 via-red-500 to-red-600 rounded shadow p-4 sm:p-6 text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    অ্যানালিটিক্স
                  </h4>
                  <p className="text-sm text-white/80">রিপোর্ট দেখুন</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
