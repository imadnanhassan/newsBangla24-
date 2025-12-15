'use client';

import { useState } from 'react';
import { TrendingUp, Eye, MessageSquare, Share2, Clock, ArrowUp, ArrowDown } from 'lucide-react';

const TrendingPage = () => {
  const [trendingArticles, setTrendingArticles] = useState([
    {
      id: 1,
      title: 'Major Economic Policy Changes Announced',
      category: 'Politics',
      views: 45230,
      comments: 156,
      shares: 89,
      trend: 'up',
      trendPercentage: 23,
      publishedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Technology Summit Reveals Future Innovations',
      category: 'Technology',
      views: 38750,
      comments: 203,
      shares: 145,
      trend: 'up',
      trendPercentage: 18,
      publishedAt: '2024-01-15T08:15:00Z'
    },
    {
      id: 3,
      title: 'Sports Championship Final Results',
      category: 'Sports',
      views: 52100,
      comments: 89,
      shares: 67,
      trend: 'down',
      trendPercentage: -5,
      publishedAt: '2024-01-14T20:45:00Z'
    }
  ]);

  const [trendingTopics, setTrendingTopics] = useState([
    { topic: 'Economic Policy', mentions: 1250, trend: 'up' },
    { topic: 'Technology Summit', mentions: 980, trend: 'up' },
    { topic: 'Championship Final', mentions: 756, trend: 'down' },
    { topic: 'Climate Change', mentions: 645, trend: 'up' },
    { topic: 'Healthcare Reform', mentions: 523, trend: 'up' }
  ]);

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <ArrowUp className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trending</h1>
            <p className="text-gray-600">Monitor trending topics and popular content</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trending Articles</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Engagement</p>
              <p className="text-2xl font-bold text-gray-900">156K</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hot Topics</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Viral Content</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Articles */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Trending Articles</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {trendingArticles.map((article, index) => (
              <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {article.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{article.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>{article.shares}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(article.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(article.trend)}`}>
                        {Math.abs(article.trendPercentage)}% {article.trend === 'up' ? 'increase' : 'decrease'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Hot Topics</h2>
          </div>
          <div className="p-6 space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{topic.topic}</p>
                    <p className="text-sm text-gray-500">{topic.mentions} mentions</p>
                  </div>
                </div>
                {getTrendIcon(topic.trend)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Trending Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">2.5M</div>
            <div className="text-sm text-gray-600">Total Impressions</div>
            <div className="flex items-center justify-center mt-1">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">12% increase</span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">45.2K</div>
            <div className="text-sm text-gray-600">Engagement Rate</div>
            <div className="flex items-center justify-center mt-1">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">8% increase</span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">1.8K</div>
            <div className="text-sm text-gray-600">Shares Today</div>
            <div className="flex items-center justify-center mt-1">
              <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
              <span className="text-xs text-red-600">3% decrease</span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Trending Score</div>
            <div className="flex items-center justify-center mt-1">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">5% increase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;