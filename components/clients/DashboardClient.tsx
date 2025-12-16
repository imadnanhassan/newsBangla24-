"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Settings,
  Download,
  ArrowUpRight,
  Zap,
  Video,
  Bell,
  Shield,
  Rss,
  Activity,
  Globe,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function DashboardClient() {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Articles",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: FileText,
      color: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Active Users",
      value: "18,492",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "bg-gradient-to-br from-emerald-400 via-green-500 to-green-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      title: "Page Views",
      value: "847K",
      change: "+23%",
      changeType: "positive",
      icon: Eye,
      color: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Comments",
      value: "4,621",
      change: "-3%",
      changeType: "negative",
      icon: MessageSquare,
      color: "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      title: "Breaking News",
      value: "12",
      change: "+5%",
      changeType: "positive",
      icon: Zap,
      color: "bg-gradient-to-br from-red-400 via-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Live Streams",
      value: "3",
      change: "+2",
      changeType: "positive",
      icon: Rss,
      color: "bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
    {
      title: "Video Content",
      value: "156",
      change: "+18%",
      changeType: "positive",
      icon: Video,
      color: "bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      title: "Notifications",
      value: "45",
      change: "+7%",
      changeType: "positive",
      icon: Bell,
      color: "bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
    },
  ];

  const recentArticles = [
    {
      id: 1,
      title: "Breaking: Major Economic Policy Changes Announced",
      author: "John Doe",
      status: "Published",
      views: "12.5K",
      comments: 45,
      category: "Politics",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Technology Trends Shaping the Future",
      author: "Jane Smith",
      status: "Draft",
      views: "8.2K",
      comments: 23,
      category: "Technology",
      date: "4 hours ago",
    },
    {
      id: 3,
      title: "Sports Update: Championship Results",
      author: "Mike Johnson",
      status: "Published",
      views: "15.7K",
      comments: 67,
      category: "Sports",
      date: "6 hours ago",
    },
    {
      id: 4,
      title: "Health & Wellness: New Research Findings",
      author: "Sarah Wilson",
      status: "Review",
      views: "9.3K",
      comments: 12,
      category: "Health",
      date: "8 hours ago",
    },
  ];

  const quickStats = [
    {
      label: "Pending Moderation",
      value: "8",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Scheduled Posts",
      value: "15",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Active Reporters",
      value: "24",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Trending Topics",
      value: "6",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "Server storage at 85% capacity",
      time: "10 min ago",
    },
    {
      type: "info",
      message: "New user registration spike detected",
      time: "1 hour ago",
    },
    {
      type: "success",
      message: "Backup completed successfully",
      time: "2 hours ago",
    },
  ];

  const topCategories = [
    { name: "Politics", articles: 342, percentage: 28 },
    { name: "Technology", articles: 287, percentage: 24 },
    { name: "Sports", articles: 198, percentage: 16 },
    { name: "Business", articles: 156, percentage: 13 },
    { name: "Entertainment", articles: 134, percentage: 11 },
    { name: "Health", articles: 98, percentage: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto px-4">
              Here's what's happening with your NewsBangla24 portal today. Stay
              updated with the latest analytics and manage your content
              effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
              Dashboard Overview
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Monitor your news portal performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm w-full sm:w-auto"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl shadow-lg ${stat.bgColor} ${stat.borderColor} border-2 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2"
                    >
                      {stat.title}
                    </motion.p>
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + index * 0.1,
                        type: "spring",
                      }}
                      className="text-3xl sm:text-4xl font-black text-gray-900 mb-3"
                    >
                      {stat.value}
                    </motion.p>
                    <div className="flex items-center">
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      />
                      <span
                        className={`text-sm font-bold ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-600 ml-1">
                        vs last week
                      </span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                    }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${stat.color} flex items-center justify-center shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
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
                bg: "bg-gradient-to-br from-yellow-400 to-yellow-500",
                border: "border-yellow-300",
              },
              {
                bg: "bg-gradient-to-br from-blue-400 to-blue-500",
                border: "border-blue-300",
              },
              {
                bg: "bg-gradient-to-br from-green-400 to-green-500",
                border: "border-green-300",
              },
              {
                bg: "bg-gradient-to-br from-purple-400 to-purple-500",
                border: "border-purple-300",
              },
            ];
            const colorScheme = colors[index % colors.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className={`rounded-xl shadow-lg ${colorScheme.bg} ${colorScheme.border} border-2 p-4 sm:p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wide opacity-90">
                      {stat.label}
                    </p>
                    <p className="text-xl sm:text-2xl font-black mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shadow-md">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-xl shadow-lg border-2 border-indigo-300 p-6 sm:p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Traffic Overview</h3>
              <div className="flex space-x-2">
                <button className="text-sm px-3 sm:px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors">
                  Views
                </button>
                <button className="text-sm px-3 sm:px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                  Users
                </button>
              </div>
            </div>
            <div className="h-48 sm:h-64 flex items-end justify-between space-x-2">
              {[65, 78, 52, 89, 94, 76, 85].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 bg-white/30 rounded-t-lg hover:bg-white/40 transition-all duration-300 cursor-pointer shadow-md"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-white/80 mt-4 font-medium">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-xl shadow-lg border-2 border-orange-300 p-6 sm:p-8 text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-6">System Alerts</h3>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-white/10 border-l-4"
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
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-white/70 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Top Categories */}
          <div className="bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-xl shadow-lg border-2 border-teal-300 p-6 sm:p-8 text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-6">
              Top Categories
            </h3>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-semibold">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-white/80">
                        {category.articles} articles
                      </span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div
                        className="bg-white/60 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 rounded-xl shadow-lg border-2 border-rose-300 p-6 sm:p-8 text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-6">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm font-medium">Average Load Time</span>
                </div>
                <span className="text-lg font-bold text-green-300">1.2s</span>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm font-medium">User Satisfaction</span>
                </div>
                <span className="text-lg font-bold text-green-300">94%</span>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm font-medium">Server Uptime</span>
                </div>
                <span className="text-lg font-bold text-green-300">99.9%</span>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm font-medium">Security Score</span>
                </div>
                <span className="text-lg font-bold text-green-300">A+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-gradient-to-br from-slate-400 via-gray-500 to-slate-600 rounded-xl shadow-lg border-2 border-slate-300 p-6 sm:p-8 text-white mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold">Recent Articles</h3>
            <Link
              href="/dashboard/article"
              className="text-sm text-white/80 hover:text-white font-semibold flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-white/20">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="py-6 sm:py-8 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-semibold mb-3">
                      {article.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm mb-3">
                      <span>By {article.author}</span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full font-medium">
                        {article.category}
                      </span>
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm font-semibold">
                          {article.views}
                        </span>
                        <span className="text-xs text-white/70">views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm font-semibold">
                          {article.comments}
                        </span>
                        <span className="text-xs text-white/70">comments</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <span
                      className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full whitespace-nowrap ${
                        article.status === "Published"
                          ? "bg-green-500/80 text-white"
                          : article.status === "Draft"
                          ? "bg-yellow-500/80 text-white"
                          : "bg-blue-500/80 text-white"
                      }`}
                    >
                      {article.status}
                    </span>
                    <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Link
            href="/dashboard/article/add"
            className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-xl shadow-lg border-2 border-green-300 p-4 sm:p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  New Article
                </h4>
                <p className="text-sm text-white/80">Create content</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/breaking"
            className="bg-gradient-to-br from-red-400 via-rose-500 to-pink-500 rounded-xl shadow-lg border-2 border-red-300 p-4 sm:p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  Breaking News
                </h4>
                <p className="text-sm text-white/80">Urgent alerts</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/live"
            className="bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-xl shadow-lg border-2 border-purple-300 p-4 sm:p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                <Rss className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  Live Stream
                </h4>
                <p className="text-sm text-white/80">Go live</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-xl shadow-lg border-2 border-cyan-300 p-4 sm:p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  Analytics
                </h4>
                <p className="text-sm text-white/80">View reports</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
