'use client';

import { useState } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  Share2,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { ReporterLayout } from '@/components/reporter/layout';

interface AnalyticsData {
  totalViews: number;
  totalComments: number;
  totalShares: number;
  totalReaders: number;
  viewsChange: number;
  commentsChange: number;
  sharesChange: number;
  readersChange: number;
}

const mockAnalytics: AnalyticsData = {
  totalViews: 125430,
  totalComments: 892,
  totalShares: 1247,
  totalReaders: 45230,
  viewsChange: 15.2,
  commentsChange: 8.7,
  sharesChange: -2.3,
  readersChange: 12.8
};

const weeklyData = [
  { day: 'সোম', views: 4500, comments: 45, shares: 23 },
  { day: 'মঙ্গল', views: 6200, comments: 62, shares: 31 },
  { day: 'বুধ', views: 3800, comments: 38, shares: 19 },
  { day: 'বৃহ', views: 7500, comments: 75, shares: 42 },
  { day: 'শুক্র', views: 8900, comments: 89, shares: 56 },
  { day: 'শনি', views: 5600, comments: 56, shares: 28 },
  { day: 'রবি', views: 6700, comments: 67, shares: 34 }
];

const topArticles = [
  {
    id: 1,
    title: 'স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি',
    views: 12450,
    comments: 156,
    shares: 89,
    readTime: '3.2 মিনিট',
    publishDate: '২ দিন আগে'
  },
  {
    id: 2,
    title: 'কৃষি উৎপাদনে রেকর্ড বৃদ্ধি অর্জন',
    views: 8930,
    comments: 98,
    shares: 67,
    readTime: '2.8 মিনিট',
    publishDate: '৪ দিন আগে'
  },
  {
    id: 3,
    title: 'স্বাস্থ্য সেবায় নতুন উদ্যোগ',
    views: 7650,
    comments: 87,
    shares: 54,
    readTime: '4.1 মিনিট',
    publishDate: '১ সপ্তাহ আগে'
  },
  {
    id: 4,
    title: 'শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাবনা',
    views: 6420,
    comments: 76,
    shares: 43,
    readTime: '3.5 মিনিট',
    publishDate: '১০ দিন আগে'
  }
];

const deviceStats = [
  { device: 'মোবাইল', percentage: 68, icon: Smartphone, color: 'bg-blue-500' },
  { device: 'ডেস্কটপ', percentage: 24, icon: Monitor, color: 'bg-green-500' },
  { device: 'ট্যাবলেট', percentage: 8, icon: Tablet, color: 'bg-purple-500' }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-3 flex items-center">
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-500 ml-1">গত সপ্তাহের তুলনায়</span>
      </div>
    </div>
  );

  return (
    <ReporterLayout title="অ্যানালিটিক্স">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">পারফরম্যান্স অ্যানালিটিক্স</h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার নিবন্ধের পারফরম্যান্স এবং পাঠক এনগেজমেন্ট দেখুন
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
            title="মোট ভিউ"
            value={mockAnalytics.totalViews}
            change={mockAnalytics.viewsChange}
            icon={Eye}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="মোট মন্তব্য"
            value={mockAnalytics.totalComments}
            change={mockAnalytics.commentsChange}
            icon={MessageSquare}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="মোট শেয়ার"
            value={mockAnalytics.totalShares}
            change={mockAnalytics.sharesChange}
            icon={Share2}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="মোট পাঠক"
            value={mockAnalytics.totalReaders}
            change={mockAnalytics.readersChange}
            icon={Users}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Performance Chart */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">সাপ্তাহিক পারফরম্যান্স</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-8 text-sm text-gray-600 font-medium">{day.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(day.views / Math.max(...weeklyData.map(d => d.views))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {(day.views / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Statistics */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">ডিভাইস পরিসংখ্যান</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {deviceStats.map((device) => {
                const DeviceIcon = device.icon;
                return (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${device.color} flex items-center justify-center`}>
                        <DeviceIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${device.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                        {device.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">সেরা পারফরমিং নিবন্ধ</h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {topArticles.map((article, index) => (
              <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {article.title}
                    </h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{article.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">{article.shares}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-600">{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{article.publishDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">গড় পড়ার সময়</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">৩.৪ মিনিট</div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+০.৩ মিনিট</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">বাউন্স রেট</h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">২৮%</div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">-৫%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">রিটার্ন রিডার</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">৪২%</div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+৭%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}