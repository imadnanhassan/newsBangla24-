'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  MoreVertical,
  FileText
} from 'lucide-react';
import { ReporterLayout } from '@/components/reporter/layout';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  category: string;
  views: string;
  comments: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি পেয়েছে',
    excerpt: 'এবারের স্থানীয় সরকার নির্বাচনে ভোটার উপস্থিতি গত নির্বাচনের তুলনায় উল্লেখযোগ্য হারে বৃদ্ধি পেয়েছে...',
    status: 'published',
    category: 'রাজনীতি',
    views: '2.3K',
    comments: 15,
    createdAt: '২০২৪-০১-১৫',
    updatedAt: '২ ঘন্টা আগে',
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: 'শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাবনা',
    excerpt: 'শিক্ষা মন্ত্রণালয় থেকে নতুন শিক্ষা সংস্কার প্রস্তাবনা উপস্থাপন করা হয়েছে যা আগামী বছর থেকে কার্যকর হবে...',
    status: 'draft',
    category: 'শিক্ষা',
    views: '0',
    comments: 0,
    createdAt: '২০২৪-০১-১৪',
    updatedAt: '৪ ঘন্টা আগে'
  },
  {
    id: 3,
    title: 'কৃষি উৎপাদনে রেকর্ড বৃদ্ধি অর্জন',
    excerpt: 'এ বছর দেশের কৃষি উৎপাদনে রেকর্ড পরিমাণ বৃদ্ধি অর্জিত হয়েছে। বিশেষ করে ধান ও গমের উৎপাদন...',
    status: 'pending',
    category: 'কৃষি',
    views: '1.8K',
    comments: 8,
    createdAt: '২০২৪-০১-১৩',
    updatedAt: '১ দিন আগে',
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    title: 'প্রযুক্তি খাতে নতুন বিনিয়োগ',
    excerpt: 'দেশের প্রযুক্তি খাতে বিদেশি বিনিয়োগ বৃদ্ধি পেয়েছে। বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট এবং...',
    status: 'rejected',
    category: 'প্রযুক্তি',
    views: '856',
    comments: 3,
    createdAt: '২০২৪-০১-১২',
    updatedAt: '২ দিন আগে'
  },
  {
    id: 5,
    title: 'স্বাস্থ্য সেবায় নতুন উদ্যোগ',
    excerpt: 'গ্রামীণ এলাকায় স্বাস্থ্য সেবা পৌঁছে দিতে সরকার নতুন উদ্যোগ গ্রহণ করেছে। মোবাইল হেলথ ইউনিট...',
    status: 'published',
    category: 'স্বাস্থ্য',
    views: '3.1K',
    comments: 22,
    createdAt: '২০২৪-০১-১১',
    updatedAt: '৩ দিন আগে',
    image: '/api/placeholder/300/200'
  }
];

const statusConfig = {
  draft: { label: 'খসড়া', color: 'bg-yellow-100 text-yellow-800', icon: Edit },
  pending: { label: 'পর্যালোচনায়', color: 'bg-blue-100 text-blue-800', icon: Clock },
  published: { label: 'প্রকাশিত', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'প্রত্যাখ্যাত', color: 'bg-red-100 text-red-800', icon: AlertCircle }
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = ['সব', 'রাজনীতি', 'শিক্ষা', 'কৃষি', 'প্রযুক্তি', 'স্বাস্থ্য', 'খেলাধুলা', 'বিনোদন'];

  return (
    <ReporterLayout title="নিবন্ধ পরিচালনা">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">আমার নিবন্ধসমূহ</h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার সব নিবন্ধ এক জায়গায় পরিচালনা করুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/articles/create"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              নতুন নিবন্ধ
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট নিবন্ধ</p>
                <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">প্রকাশিত</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">পর্যালোচনায়</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Edit className="w-8 h-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">খসড়া</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="নিবন্ধ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="draft">খসড়া</option>
              <option value="pending">পর্যালোচনায়</option>
              <option value="published">প্রকাশিত</option>
              <option value="rejected">প্রত্যাখ্যাত</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">সব বিভাগ</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredArticles.map((article) => {
              const StatusIcon = statusConfig[article.status].icon;
              return (
                <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Article Image */}
                    {article.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded">
                              {article.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{article.createdAt}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{article.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{article.comments}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center space-x-3 ml-4">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusConfig[article.status].color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[article.status].label}
                          </span>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <Link
                              href={`/reporter/articles/edit/${article.id}`}
                              className="p-1 text-gray-400 hover:text-green-600 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো নিবন্ধ পাওয়া যায়নি</h3>
              <p className="text-gray-600 mb-4">
                আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ খুঁজে পাওয়া যায়নি।
              </p>
              <Link
                href="/reporter/articles/create"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                প্রথম নিবন্ধ লিখুন
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              মোট <span className="font-medium">{filteredArticles.length}</span> টি নিবন্ধ দেখানো হচ্ছে
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                পূর্বের
              </button>
              <button className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                পরের
              </button>
            </div>
          </div>
        )}
      </div>
    </ReporterLayout>
  );
}