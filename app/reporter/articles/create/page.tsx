'use client';

import ReporterLayout from '@/components/ReporterLayout';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  Quote,
  ArrowLeft,
  Calendar,
  Tag,
  Globe
} from 'lucide-react';

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishDate: string;
  status: 'draft' | 'pending';
}

const categories = [
  'রাজনীতি', 'অর্থনীতি', 'খেলাধুলা', 'বিনোদন', 'প্রযুক্তি', 
  'শিক্ষা', 'স্বাস্থ্য', 'কৃষি', 'আন্তর্জাতিক', 'জাতীয়'
];

export default function CreateArticlePage() {
  const [article, setArticle] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: '',
    publishDate: '',
    status: 'draft'
  });

  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field: keyof ArticleForm, value: string) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !article.tags.includes(tagInput.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = (status: 'draft' | 'pending') => {
    setArticle(prev => ({ ...prev, status }));
    // Here you would typically send the data to your API
    console.log('Saving article:', { ...article, status });
    alert(status === 'draft' ? 'খসড়া সংরক্ষিত হয়েছে!' : 'পর্যালোচনার জন্য পাঠানো হয়েছে!');
  };

  return (
    <ReporterLayout title="নতুন নিবন্ধ লিখুন">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/reporter/articles"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">নতুন নিবন্ধ</h1>
              <p className="text-sm text-gray-600">আপনার সংবাদ লিখুন এবং প্রকাশ করুন</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? 'সম্পাদনা' : 'প্রিভিউ'}
            </button>
            <button
              onClick={() => handleSave('draft')}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Save className="w-4 h-4 mr-2" />
              খসড়া সংরক্ষণ
            </button>
            <button
              onClick={() => handleSave('pending')}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              পর্যালোচনার জন্য পাঠান
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!isPreview ? (
              <>
                {/* Title */}
                <div className="bg-white rounded-lg border p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    শিরোনাম *
                  </label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="আপনার নিবন্ধের শিরোনাম লিখুন..."
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-lg border p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    সংক্ষিপ্ত বিবরণ
                  </label>
                  <textarea
                    value={article.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="নিবন্ধের সংক্ষিপ্ত বিবরণ লিখুন..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-lg border">
                  <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <List className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <Quote className="w-4 h-4" />
                      </button>
                      <div className="border-l border-gray-300 h-6 mx-2"></div>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <textarea
                      value={article.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="আপনার নিবন্ধের মূল বিষয়বস্তু লিখুন..."
                      rows={15}
                      className="w-full border-0 focus:ring-0 resize-none text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Preview Mode */
              <div className="bg-white rounded-lg border p-8">
                <div className="prose max-w-none">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {article.title || 'শিরোনাম'}
                  </h1>
                  
                  {article.excerpt && (
                    <p className="text-lg text-gray-600 mb-6 font-medium">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {article.content || 'নিবন্ধের বিষয়বস্তু এখানে দেখানো হবে...'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ফিচার ইমেজ</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">ছবি আপলোড করুন</p>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  ফাইল নির্বাচন করুন
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">বিভাগ</h3>
              <select
                value={article.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ট্যাগ</h3>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="ট্যাগ যোগ করুন..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  যোগ করুন
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Publish Settings */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">প্রকাশনা সেটিংস</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    প্রকাশের তারিখ
                  </label>
                  <input
                    type="datetime-local"
                    value={article.publishDate}
                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>সবার জন্য দৃশ্যমান</span>
                </div>
              </div>
            </div>

            {/* Article Stats */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">নিবন্ধ পরিসংখ্যান</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">শব্দ সংখ্যা:</span>
                  <span className="font-medium">{article.content.split(' ').filter(word => word.length > 0).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">অক্ষর সংখ্যা:</span>
                  <span className="font-medium">{article.content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">পড়ার সময়:</span>
                  <span className="font-medium">
                    {Math.ceil(article.content.split(' ').filter(word => word.length > 0).length / 200)} মিনিট
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}