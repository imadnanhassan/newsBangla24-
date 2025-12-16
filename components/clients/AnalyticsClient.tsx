"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
} from "lucide-react";

export default function AnalyticsClient() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Total Page Views",
      value: "2,847,293",
      change: "+23%",
      changeType: "positive",
      icon: Eye,
    },
    {
      title: "Unique Visitors",
      value: "184,920",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Avg. Session Duration",
      value: "4m 32s",
      change: "+8%",
      changeType: "positive",
      icon: Clock,
    },
    {
      title: "Bounce Rate",
      value: "34.2%",
      change: "-5%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  const topArticles = [
    {
      title: "Breaking: Major Economic Policy Changes",
      views: 45620,
      change: "+15%",
    },
    {
      title: "Technology Trends Shaping the Future",
      views: 38940,
      change: "+8%",
    },
    {
      title: "Sports Update: Championship Results",
      views: 32150,
      change: "+22%",
    },
    { title: "Health & Wellness: New Research", views: 28730, change: "+5%" },
    {
      title: "Political Analysis: Election Updates",
      views: 25680,
      change: "+12%",
    },
  ];

  const trafficSources = [
    { source: "Direct", percentage: 45, visitors: 83214 },
    { source: "Search Engines", percentage: 32, visitors: 59174 },
    { source: "Social Media", percentage: 15, visitors: 27738 },
    { source: "Referrals", percentage: 8, visitors: 14794 },
  ];

  const deviceStats = [
    { device: "Desktop", percentage: 52, icon: Monitor },
    { device: "Mobile", percentage: 41, icon: Smartphone },
    { device: "Tablet", percentage: 7, icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Track your website performance and user engagement
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="bg-gradient-to-r from-primary to-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-red-700 hover:to-red-700 transition-all flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const colors = ["blue", "green", "purple", "orange"];
          const color = colors[index % colors.length];
          const colorClasses = {
            blue: "bg-gradient-to-br from-blue-500 to-blue-600",
            green: "bg-gradient-to-br from-green-500 to-green-600",
            purple: "bg-gradient-to-br from-purple-500 to-purple-600",
            orange: "bg-gradient-to-br from-orange-500 to-orange-600",
          };

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${
                    colorClasses[color as keyof typeof colorClasses]
                  }`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
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
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Traffic Overview
            </h3>
            <div className="flex space-x-2">
              <button className="text-xs px-4 py-2 bg-gradient-to-r from-primary to-red-600 text-white rounded-full font-medium hover:opacity-90 transition-all">
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
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-primary to-red-400 rounded-t-xl hover:from-red-700 hover:to-red-500 transition-all duration-300 cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
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
        <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Device Statistics
          </h3>
          <div className="space-y-4">
            {deviceStats.map((device, index) => {
              const IconComponent = device.icon;
              return (
                <div key={index} className="flex items-center justify-between">
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
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-10">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Sources and Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
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
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Articles */}
        <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Performing Articles
          </h3>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {article.views.toLocaleString()} views
                  </p>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {article.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
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
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-500">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-500">Pages/Session</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">2m 34s</div>
            <div className="text-sm text-gray-500">Avg. Session</div>
          </div>
        </div>
      </div>
    </div>
  );
}
