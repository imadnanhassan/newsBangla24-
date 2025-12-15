'use client';

import { useEffect, useState } from 'react';
import { ClientSession } from '@/lib/session';
import { SessionUser } from '@/lib/session';
import { 
  FileText, 
  Camera, 
  Video, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  Upload,
  Edit,
  Save
} from 'lucide-react';

export default function ReporterDashboard() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
    setIsLoading(false);

    // Redirect if not reporter
    if (sessionUser && !['reporter'].includes(sessionUser.role)) {
      window.location.href = '/login';
    }
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

  const myArticles = [
    {
      id: 1,
      title: 'স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি',
      status: 'Published',
      views: '2.3K',
      comments: 15,
      date: '২ ঘন্টা আগে',
      category: 'রাজনীতি'
    },
    {
      id: 2,
      title: 'শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাব',
      status: 'Draft',
      views: '0',
      comments: 0,
      date: '৪ ঘন্টা আগে',
      category: 'শিক্ষা'
    },
    {
      id: 3,
      title: 'কৃষি উৎপাদনে রেকর্ড বৃদ্ধি',
      status: 'Review',
      views: '1.8K',
      comments: 8,
      date: '১ দিন আগে',
      category: 'কৃষি'
    }
  ];

  const stats = [
    {
      title: 'মোট নিবন্ধ',
      value: '47',
      change: '+3',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'প্রকাশিত',
      value: '42',
      change: '+2',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'মোট ভিউ',
      value: '125K',
      change: '+15%',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'মন্তব্য',
      value: '892',
      change: '+8%',
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600'
    }
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
              <h1 className="ml-3 text-xl font-semibold text-gray-900">রিপোর্টার ড্যাশবোর্ড</h1>
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
                <div className="mt-3 flex items-center">
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">গত সপ্তাহের তুলনায়</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">নতুন নিবন্ধ</h3>
                <p className="text-sm text-gray-600">নতুন সংবাদ লিখুন</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">ছবি আপলোড</h3>
                <p className="text-sm text-gray-600">মিডিয়া যোগ করুন</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">ভিডিও রিপোর্ট</h3>
                <p className="text-sm text-gray-600">ভিডিও সংবাদ</p>
              </div>
            </div>
          </button>
        </div>

        {/* My Articles */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">আমার নিবন্ধসমূহ</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                সব দেখুন
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {myArticles.map((article) => (
              <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{article.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                      {article.status === 'Published' ? 'প্রকাশিত' :
                       article.status === 'Draft' ? 'খসড়া' : 'পর্যালোচনায়'}
                    </span>
                    <button className="text-gray-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">সাপ্তাহিক পারফরম্যান্স</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[45, 62, 38, 75, 89, 56, 67].map((height, index) => (
              <div 
                key={index} 
                className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg hover:from-red-600 hover:to-red-500 transition-all duration-300 cursor-pointer" 
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