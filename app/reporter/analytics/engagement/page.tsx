"use client";

import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
} from "lucide-react";

interface EngagementData {
  totalComments: number;
  totalLikes: number;
  totalShares: number;
  totalInteractions: number;
  commentsChange: number;
  likesChange: number;
  sharesChange: number;
  interactionsChange: number;
}

const mockEngagementData: EngagementData = {
  totalComments: 1200,
  totalLikes: 5000,
  totalShares: 300,
  totalInteractions: 6500,
  commentsChange: 15.2,
  likesChange: 8.7,
  sharesChange: -2.3,
  interactionsChange: 12.8,
};

const weeklyEngagement = [
  { day: "সোম", comments: 45, likes: 120, shares: 8 },
  { day: "মঙ্গল", comments: 62, likes: 180, shares: 12 },
  { day: "বুধ", comments: 38, likes: 95, shares: 6 },
  { day: "বৃহ", comments: 75, likes: 220, shares: 15 },
  { day: "শুক্র", comments: 89, likes: 280, shares: 18 },
  { day: "শনি", comments: 56, likes: 160, shares: 10 },
  { day: "রবি", comments: 67, likes: 190, shares: 13 },
];

const topEngagingArticles = [
  {
    id: 1,
    title: "স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি",
    comments: 156,
    likes: 450,
    shares: 89,
    engagement: 695,
    publishedAt: "২ দিন আগে",
  },
  {
    id: 2,
    title: "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি অর্জন",
    comments: 98,
    likes: 320,
    shares: 67,
    engagement: 485,
    publishedAt: "৪ দিন আগে",
  },
  {
    id: 3,
    title: "স্বাস্থ্য সেবায় নতুন উদ্যোগ",
    comments: 87,
    likes: 290,
    shares: 54,
    engagement: 431,
    publishedAt: "১ সপ্তাহ আগে",
  },
];

const engagementByCategory = [
  {
    category: "রাজনীতি",
    comments: 450,
    likes: 1200,
    shares: 120,
    percentage: 35,
  },
  {
    category: "খেলাধুলা",
    comments: 320,
    likes: 980,
    shares: 85,
    percentage: 25,
  },
  {
    category: "প্রযুক্তি",
    comments: 280,
    likes: 850,
    shares: 65,
    percentage: 20,
  },
  {
    category: "স্বাস্থ্য",
    comments: 150,
    likes: 420,
    shares: 30,
    percentage: 12,
  },
  {
    category: "অন্যান্য",
    comments: 100,
    likes: 300,
    shares: 25,
    percentage: 8,
  },
];

export default function EngagementPage() {
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
    <ReporterLayout title="এনগেজমেন্ট অ্যানালিটিক্স">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              এনগেজমেন্ট অ্যানালিটিক্স
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              পাঠকদের সাথে আপনার ইন্টার্যাকশন এবং এনগেজমেন্ট দেখুন
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="মোট মন্তব্য"
            value={mockEngagementData.totalComments}
            change={mockEngagementData.commentsChange}
            icon={MessageSquare}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="মোট লাইক"
            value={mockEngagementData.totalLikes}
            change={mockEngagementData.likesChange}
            icon={Heart}
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
          <StatCard
            title="মোট শেয়ার"
            value={mockEngagementData.totalShares}
            change={mockEngagementData.sharesChange}
            icon={Share2}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="মোট ইন্টার্যাকশন"
            value={mockEngagementData.totalInteractions}
            change={mockEngagementData.interactionsChange}
            icon={Activity}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Engagement Chart */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                সাপ্তাহিক এনগেজমেন্ট
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {weeklyEngagement.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-8 text-sm text-gray-600 font-medium">
                    {day.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (day.comments /
                                Math.max(
                                  ...weeklyEngagement.map((d) => d.comments)
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {day.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement by Category */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                বিভাগ অনুসারে এনগেজমেন্ট
              </h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {engagementByCategory.map((category) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {category.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Engaging Articles */}
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                সেরা এনগেজিং নিবন্ধ
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {topEngagingArticles.map((article, index) => (
              <div
                key={article.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-8 h-8 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {article.title}
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">
                          {article.comments}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600">{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{article.shares}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">
                          {article.engagement}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {article.publishedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                গড় মন্তব্য/নিবন্ধ
              </h3>
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {Math.round(mockEngagementData.totalComments / 5)}
              </div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+২.১</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                এনগেজমেন্ট রেট
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {Math.round(
                  (mockEngagementData.totalInteractions / 10000) * 100
                )}
                %
              </div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  +০.৫%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                শেয়ার রেট
              </h3>
              <Share2 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {(
                  (mockEngagementData.totalShares /
                    mockEngagementData.totalInteractions) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 font-medium">-০.২%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
