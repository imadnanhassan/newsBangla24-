"use client";

import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  Eye,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Clock,
  Users,
  Globe,
} from "lucide-react";

interface ViewsData {
  totalViews: number;
  todayViews: number;
  averageViews: number;
  viewsChange: number;
  todayChange: number;
  averageChange: number;
}

const mockViewsData: ViewsData = {
  totalViews: 10000,
  todayViews: 500,
  averageViews: 333,
  viewsChange: 15.2,
  todayChange: 8.7,
  averageChange: -2.3,
};

const hourlyViews = [
  { hour: "০০", views: 20 },
  { hour: "০১", views: 15 },
  { hour: "০২", views: 10 },
  { hour: "০৩", views: 8 },
  { hour: "০৪", views: 12 },
  { hour: "০৫", views: 18 },
  { hour: "০৬", views: 35 },
  { hour: "০৭", views: 55 },
  { hour: "০৮", views: 80 },
  { hour: "০৯", views: 95 },
  { hour: "১০", views: 110 },
  { hour: "১১", views: 125 },
  { hour: "১২", views: 140 },
  { hour: "১৩", views: 130 },
  { hour: "১৪", views: 120 },
  { hour: "১৫", views: 115 },
  { hour: "১৬", views: 105 },
  { hour: "১৭", views: 95 },
  { hour: "১৮", views: 85 },
  { hour: "১৯", views: 70 },
  { hour: "২০", views: 60 },
  { hour: "২১", views: 45 },
  { hour: "২২", views: 35 },
  { hour: "২৩", views: 25 },
];

const topViewedArticles = [
  {
    id: 1,
    title: "স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি",
    views: 2340,
    publishedAt: "২ দিন আগে",
    readTime: "3.2 মিনিট",
  },
  {
    id: 2,
    title: "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি",
    views: 1800,
    publishedAt: "৪ দিন আগে",
    readTime: "2.8 মিনিট",
  },
  {
    id: 3,
    title: "স্বাস্থ্য সেবায় নতুন উদ্যোগ",
    views: 1650,
    publishedAt: "১ সপ্তাহ আগে",
    readTime: "4.1 মিনিট",
  },
];

export default function ViewsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {value.toLocaleString()}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-3 flex items-center">
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span
          className={`text-sm font-medium ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-500 ml-1">গত সপ্তাহের তুলনায়</span>
      </div>
    </div>
  );

  return (
    <ReporterLayout title="ভিউ অ্যানালিটিক্স">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              ভিউ অ্যানালিটিক্স
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার নিবন্ধের ভিউ এবং পাঠক পরিসংখ্যান দেখুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="7d">গত ৭ দিন</option>
              <option value="30d">গত ৩০ দিন</option>
              <option value="90d">গত ৯০ দিন</option>
              <option value="1y">গত ১ বছর</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="মোট ভিউ"
            value={mockViewsData.totalViews}
            change={mockViewsData.viewsChange}
            icon={Eye}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="আজকের ভিউ"
            value={mockViewsData.todayViews}
            change={mockViewsData.todayChange}
            icon={Calendar}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="গড় ভিউ/নিবন্ধ"
            value={mockViewsData.averageViews}
            change={mockViewsData.averageChange}
            icon={BarChart3}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Views Chart */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                আজকের ঘণ্টাভিত্তিক ভিউ
              </h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64 flex items-end justify-between space-x-1">
              {hourlyViews.map((hour, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="relative w-full flex items-end justify-center mb-2">
                    <div
                      className="w-full bg-linear-to-t from-blue-500 via-blue-400 to-blue-300 rounded-t-lg hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 transition-all duration-300 cursor-pointer"
                      style={{
                        height: `${
                          (hour.views /
                            Math.max(...hourlyViews.map((h) => h.views))) *
                          200
                        }px`,
                      }}
                    ></div>
                    <div className="absolute -top-6 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {hour.views}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {hour.hour}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Viewed Articles */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                সর্বাধিক ভিউড নিবন্ধ
              </h3>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topViewedArticles.map((article, index) => (
                <div key={article.id} className="flex items-center space-x-4">
                  <div className="shrink-0 w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{article.views.toLocaleString()} ভিউ</span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                পিক ভিউ টাইম
              </h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ১২:০০ - ১৪:০০
              </div>
              <p className="text-sm text-gray-600 mt-1">দুপুরের সময়</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">গড় সেশন</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">৩.২ মিনিট</div>
              <p className="text-sm text-gray-600 mt-1">প্রতি ভিউ</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                বাউন্স রেট
              </h3>
              <TrendingDown className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">২৮%</div>
              <p className="text-sm text-green-600 mt-1">-৫% ↓</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                রিটার্ন ভিজিটর
              </h3>
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">৪২%</div>
              <p className="text-sm text-green-600 mt-1">+৭% ↑</p>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
