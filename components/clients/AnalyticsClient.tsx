"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BarChart3, Download, Activity, Target, Zap } from "lucide-react";
import { AnalyticsData } from "@/types/analytics";
import { dummyAnalyticsData, formatNumber } from "@/lib/dummy-analytics";

export default function AnalyticsClient() {
  const [analyticsData] = useState<AnalyticsData>(dummyAnalyticsData);
  const [timeRange, setTimeRange] = useState("7d");
  const [sortBy, setSortBy] = useState("views");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedTopArticles = [...analyticsData.topArticles].sort((a, b) => {
    if (sortBy === "views") {
      return sortOrder === "asc" ? a.views - b.views : b.views - a.views;
    }
    return 0;
  });

  const sortedTrafficSources = [...analyticsData.trafficSources].sort(
    (a, b) => {
      return sortOrder === "asc"
        ? a.visitors - b.visitors
        : b.visitors - a.visitors;
    }
  );

  const handleExportReport = () => {
    alert(
      "Export functionality - This would generate and download an analytics report"
    );
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // In a real app, this would fetch data for the selected time range
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-green-500 to-teal-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <p className="text-white/80 mt-1">
                  Comprehensive insights into website performance and user
                  behavior
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="24h" className="text-gray-900">
                  Last 24 Hours
                </option>
                <option value="7d" className="text-gray-900">
                  Last 7 Days
                </option>
                <option value="30d" className="text-gray-900">
                  Last 30 Days
                </option>
                <option value="90d" className="text-gray-900">
                  Last 90 Days
                </option>
              </select>
              <button
                onClick={handleExportReport}
                className="flex items-center space-x-3 bg-white text-green-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const colors = ["green", "blue", "purple", "orange"];
          const color = colors[index % colors.length];

          return (
            <motion.div
              key={index}
              className={`bg-linear-to-br from-${color}-200 to-${color}-300 hover:from-${color}-300 hover:to-${color}-400 rounded p-6 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 bg-${color}-500 rounded-lg flex items-center justify-center mr-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
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
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      from last period
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview Chart */}
        <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Traffic Overview
            </h3>
            <div className="flex space-x-2">
              <button className="text-xs px-4 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all">
                Views
              </button>
              <button className="text-xs px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
                Users
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 52, 89, 94, 76, 85, 92, 68, 81, 95, 73, 88, 91].map(
              (height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-green-500 rounded-t-lg hover:bg-green-700 transition-all duration-300 cursor-pointer"
                  style={{ height: `${height}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                ></motion.div>
              )
            )}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-3">
            <span>Jan 1</span>
            <span>Jan 7</span>
            <span>Jan 14</span>
            <span>Today</span>
          </div>
        </div>

        {/* Device Statistics */}
        <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Device Statistics
          </h3>
          <div className="space-y-4">
            {analyticsData.deviceStats.map((device, index) => {
              const IconComponent = device.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {device.device}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      ></motion.div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-10">
                      {device.percentage}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Sources and Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Traffic Sources
            </h3>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("-");
                setSortBy(by);
                setSortOrder(order);
              }}
              className="text-xs px-3 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="visitors-desc">Most Visitors</option>
              <option value="visitors-asc">Least Visitors</option>
            </select>
          </div>
          <div className="space-y-4">
            {sortedTrafficSources.map((source, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {source.source}
                    </span>
                    <span className="text-sm text-gray-500">
                      {source.visitors.toLocaleString()} visitors
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Articles Table */}
        <div className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Performing Articles
              </h3>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [by, order] = e.target.value.split("-");
                  setSortBy(by);
                  setSortOrder(order);
                }}
                className="text-xs px-3 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="views-desc">Most Views</option>
                <option value="views-asc">Least Views</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTopArticles.map((article, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">
                        {article.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Real-time Activity
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="text-center p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-3xl font-bold text-green-600">
              {formatNumber(analyticsData.realTimeActivity.activeUsers)}
            </div>
            <div className="text-sm text-gray-500">Active Users</div>
          </motion.div>
          <motion.div
            className="text-center p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-3xl font-bold text-blue-600">
              {analyticsData.realTimeActivity.pagesPerSession}
            </div>
            <div className="text-sm text-gray-500">Pages/Session</div>
          </motion.div>
          <motion.div
            className="text-center p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-3xl font-bold text-purple-600">
              {analyticsData.realTimeActivity.avgSessionTime}
            </div>
            <div className="text-sm text-gray-500">Avg. Session</div>
          </motion.div>
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
              Showing analytics data for the selected time period
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
