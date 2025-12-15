'use client';

import ReporterLayout from '@/components/ReporterLayout';
import Link from 'next/link';
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
  Award
} from 'lucide-react';

export default function ReporterDashboard() {

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
    <ReporterLayout title="ড্যাশবোর্ড">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">স্বাগতম, রিপোর্টার!</h2>
              <p className="text-red-100 text-lg">আজ আপনার সংবাদ জগতে নতুন কিছু তৈরি করুন</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                    <span className="text-sm text-slate-500">গত সপ্তাহের তুলনায়</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/reporter/articles/create" className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">নতুন নিবন্ধ</h3>
                  <p className="text-slate-600 font-medium">নতুন সংবাদ লিখুন</p>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                আপনার পরবর্তী গুরুত্বপূর্ণ সংবাদ তৈরি করুন
              </div>
            </div>
          </Link>

          <Link href="/reporter/media/upload" className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-green-600 transition-colors">ছবি আপলোড</h3>
                  <p className="text-slate-600 font-medium">মিডিয়া যোগ করুন</p>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                আপনার সংবাদের জন্য ছবি ও ভিডিও আপলোড করুন
              </div>
            </div>
          </Link>

          <Link href="/reporter/media/videos" className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">ভিডিও রিপোর্ট</h3>
                  <p className="text-slate-600 font-medium">ভিডিও সংবাদ</p>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                ভিডিও রিপোর্ট তৈরি ও সম্পাদনা করুন
              </div>
            </div>
          </Link>
        </div>

        {/* My Articles */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
          <div className="px-8 py-6 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">আমার নিবন্ধসমূহ</h3>
                <p className="text-slate-600 font-medium">সাম্প্রতিক প্রকাশিত সংবাদ</p>
              </div>
              <Link href="/reporter/articles" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg">
                সব দেখুন
              </Link>
            </div>
          </div>
          <div className="divide-y divide-slate-200/50">
            {myArticles.map((article) => (
              <div key={article.id} className="p-8 hover:bg-slate-50/50 transition-all duration-200 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{article.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                      <span className="bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1 rounded-full font-medium">{article.category}</span>
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        <span>{article.date}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-semibold text-slate-700">{article.views}</span>
                        <span className="text-xs text-slate-500">ভিউ</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-slate-700">{article.comments}</span>
                        <span className="text-xs text-slate-500">মন্তব্য</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl ${
                      article.status === 'Published' ? 'bg-green-100 text-green-700 border border-green-200' :
                      article.status === 'Draft' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {article.status === 'Published' ? '✓ প্রকাশিত' :
                       article.status === 'Draft' ? '📝 খসড়া' : '⏳ পর্যালোচনায়'}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">সাপ্তাহিক পারফরম্যান্স</h3>
              <p className="text-slate-600 font-medium">আপনার সংবাদের পাঠক সংখ্যা</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              <span className="text-slate-600 font-medium">দৈনিক ভিউ</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-3">
            {[
              { height: 45, day: 'সোম', value: '2.1K' },
              { height: 62, day: 'মঙ্গল', value: '3.2K' },
              { height: 38, day: 'বুধ', value: '1.8K' },
              { height: 75, day: 'বৃহ', value: '4.1K' },
              { height: 89, day: 'শুক্র', value: '5.2K' },
              { height: 56, day: 'শনি', value: '2.9K' },
              { height: 67, day: 'রবি', value: '3.7K' }
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex items-end justify-center mb-2">
                  <div 
                    className="w-full bg-gradient-to-t from-red-500 via-red-400 to-red-300 rounded-t-2xl hover:from-red-600 hover:via-red-500 hover:to-red-400 transition-all duration-500 cursor-pointer shadow-lg group-hover:shadow-xl relative overflow-hidden" 
                    style={{ height: `${item.height * 2}px` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute -top-8 bg-slate-900 text-white px-2 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0">
                    {item.value}
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{item.day}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-slate-600">গড় বৃদ্ধি:</span>
                  <span className="font-bold text-green-600">+12.5%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-600">মোট ভিউ:</span>
                  <span className="font-bold text-slate-900">23.0K</span>
                </div>
              </div>
              <Link href="/reporter/analytics" className="text-blue-600 hover:text-blue-700 font-semibold">
                বিস্তারিত দেখুন →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}