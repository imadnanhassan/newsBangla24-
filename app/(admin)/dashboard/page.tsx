'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  Calendar,
  BarChart3,
  Plus,
  Settings,
  Download,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Zap,
  Video,
  Bell,
  Shield,
  Rss,
  Activity,
  Globe,
  Star
} from 'lucide-react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Articles',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: '18,492',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Page Views',
      value: '847K',
      change: '+23%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Comments',
      value: '4,621',
      change: '-3%',
      changeType: 'negative',
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Breaking News',
      value: '12',
      change: '+5%',
      changeType: 'positive',
      icon: Zap,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Live Streams',
      value: '3',
      change: '+2',
      changeType: 'positive',
      icon: Rss,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Video Content',
      value: '156',
      change: '+18%',
      changeType: 'positive',
      icon: Video,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Notifications',
      value: '45',
      change: '+7%',
      changeType: 'positive',
      icon: Bell,
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'Breaking: Major Economic Policy Changes Announced',
      author: 'John Doe',
      status: 'Published',
      views: '12.5K',
      comments: 45,
      category: 'Politics',
      date: '2 hours ago'
    },
    {
      id: 2,
      title: 'Technology Trends Shaping the Future',
      author: 'Jane Smith',
      status: 'Draft',
      views: '8.2K',
      comments: 23,
      category: 'Technology',
      date: '4 hours ago'
    },
    {
      id: 3,
      title: 'Sports Update: Championship Results',
      author: 'Mike Johnson',
      status: 'Published',
      views: '15.7K',
      comments: 67,
      category: 'Sports',
      date: '6 hours ago'
    },
    {
      id: 4,
      title: 'Health & Wellness: New Research Findings',
      author: 'Sarah Wilson',
      status: 'Review',
      views: '9.3K',
      comments: 12,
      category: 'Health',
      date: '8 hours ago'
    }
  ];

  const quickStats = [
    { label: 'Pending Moderation', value: '8', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Scheduled Posts', value: '15', color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Reporters', value: '24', color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Trending Topics', value: '6', color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const systemAlerts = [
    { type: 'warning', message: 'Server storage at 85% capacity', time: '10 min ago' },
    { type: 'info', message: 'New user registration spike detected', time: '1 hour ago' },
    { type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
  ];

  const topCategories = [
    { name: 'Politics', articles: 342, percentage: 28 },
    { name: 'Technology', articles: 287, percentage: 24 },
    { name: 'Sports', articles: 198, percentage: 16 },
    { name: 'Business', articles: 156, percentage: 13 },
    { name: 'Entertainment', articles: 134, percentage: 11 },
    { name: 'Health', articles: 98, percentage: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your news portal.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-8 h-8 rounded-full ${stat.bg} flex items-center justify-center`}>
                <Activity className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Overview</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full font-medium">Views</button>
              <button className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">Users</button>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[65, 78, 52, 89, 94, 76, 85].map((height, index) => (
              <div 
                key={index} 
                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer" 
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-3">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.articles}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Average Load Time</span>
              </div>
              <span className="text-sm font-bold text-green-600">1.2s</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-900">User Satisfaction</span>
              </div>
              <span className="text-sm font-bold text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Server Uptime</span>
              </div>
              <span className="text-sm font-bold text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-gray-900">Security Score</span>
              </div>
              <span className="text-sm font-bold text-green-600">A+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Articles</h3>
            <Link href="/dashboard/article" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{article.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>By {article.author}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{article.comments}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                    article.status === 'Published' ? 'bg-green-100 text-green-800' :
                    article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {article.status}
                  </span>
                  <button className="text-gray-400 hover:text-blue-600">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/article/add" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">New Article</h4>
              <p className="text-xs text-gray-500">Create content</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/breaking" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Breaking News</h4>
              <p className="text-xs text-gray-500">Urgent alerts</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/live" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Rss className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Live Stream</h4>
              <p className="text-xs text-gray-500">Go live</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/analytics" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Analytics</h4>
              <p className="text-xs text-gray-500">View reports</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
