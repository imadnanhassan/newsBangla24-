'use client';

import { useEffect, useState } from 'react';
import { ClientSession } from '@/lib/session';
import { SessionUser } from '@/lib/session';
import { 
  Bookmark, 
  Heart, 
  MessageSquare, 
  Eye, 
  Clock, 
  Bell,
  Settings,
  User,
  Share2
} from 'lucide-react';

export default function UserDashboard() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    ClientSession.clearSession();
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const savedArticles = [
    {
      id: 1,
      title: 'অর্থনৈতিক নীতিতে বড় পরিবর্তন ঘোষণা',
      category: 'অর্থনীতি',
      readTime: '৫ মিনিট',
      savedDate: '২ দিন আগে',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'প্রযুক্তি খাতে নতুন উদ্ভাবন',
      category: 'প্রযুক্তি',
      readTime: '৩ মিনিট',
      savedDate: '৩ দিন আগে',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'খেলাধুলায় নতুন রেকর্ড',
      category: 'খেলাধুলা',
      readTime: '৪ মিনিট',
      savedDate: '১ সপ্তাহ আগে',
      image: '/api/placeholder/300/200'
    }
  ];

  const recentActivity = [
    {
      type: 'comment',
      title: 'শিক্ষা ব্যবস্থায় সংস্কার প্রয়োজন',
      action: 'মন্তব্য করেছেন',
      time: '২ ঘন্টা আগে'
    },
    {
      type: 'like',
      title: 'স্বাস্থ্য সেবায় উন্নতি',
      action: 'পছন্দ করেছেন',
      time: '৫ ঘন্টা আগে'
    },
    {
      type: 'save',
      title: 'পরিবেশ রক্ষায় নতুন পদক্ষেপ',
      action: 'সংরক্ষণ করেছেন',
      time: '১ দিন আগে'
    }
  ];

  const stats = [
    {
      title: 'সংরক্ষিত নিবন্ধ',
      value: '24',
      icon: Bookmark,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'পছন্দের নিবন্ধ',
      value: '67',
      icon: Heart,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'মন্তব্য',
      value: '43',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'পঠিত নিবন্ধ',
      value: '156',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const preferences = [
    { category: 'রাজনীতি', enabled: true },
    { category: 'অর্থনীতি', enabled: true },
    { category: 'খেলাধুলা', enabled: false },
    { category: 'প্রযুক্তি', enabled: true },
    { category: 'বিনোদন', enabled: false },
    { category: 'স্বাস্থ্য', enabled: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">নিউজ</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">ব্যবহারকারী ড্যাশবোর্ড</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">স্বাগতম, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Articles */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">সংরক্ষিত নিবন্ধ</h3>
            </div>
            <div className="p-6 space-y-4">
              {savedArticles.map((article) => (
                <div key={article.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{article.category}</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                      <span>{article.savedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-red-600">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">সাম্প্রতিক কার্যকলাপ</h3>
              </div>
              <div className="p-6 space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'comment' ? 'bg-blue-500' :
                      activity.type === 'like' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.action} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading Preferences */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">পছন্দের বিষয়</h3>
              </div>
              <div className="p-6 space-y-3">
                {preferences.map((pref, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{pref.category}</span>
                    <button className={`w-10 h-6 rounded-full transition-colors ${
                      pref.enabled ? 'bg-red-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        pref.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">দ্রুত কার্যক্রম</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">বিজ্ঞপ্তি সেটিংস</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">প্রোফাইল আপডেট</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">অ্যাকাউন্ট সেটিংস</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reading Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">পঠন পরিসংখ্যান</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[30, 45, 25, 60, 80, 35, 55].map((height, index) => (
              <div 
                key={index} 
                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer" 
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-3">
            <span>সোম</span>
            <span>মঙ্গল</span>
            <span>বুধ</span>
            <span>বৃহ</span>
            <span>শুক্র</span>
            <span>শনি</span>
            <span>রবি</span>
          </div>
        </div>
      </main>
    </div>
  );
}