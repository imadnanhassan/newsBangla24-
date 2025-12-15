'use client';

import { useState } from 'react';
import { Rss, Radio, Users, Eye, Play, Pause, Settings } from 'lucide-react';

const LiveNewsPage = () => {
  const [liveFeeds, setLiveFeeds] = useState([
    {
      id: 1,
      title: 'Parliament Session Live',
      description: 'Live coverage of today\'s parliamentary proceedings',
      status: 'live',
      viewers: 1250,
      duration: '02:45:30',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Economic Summit 2024',
      description: 'International economic summit with world leaders',
      status: 'scheduled',
      viewers: 0,
      scheduledTime: '15:00',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Sports Championship Final',
      description: 'Live coverage of the championship final match',
      status: 'ended',
      viewers: 5420,
      duration: '03:20:15',
      thumbnail: '/api/placeholder/300/200'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 border-red-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ended': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <Radio className="w-4 h-4 text-red-600 animate-pulse" />;
      case 'scheduled': return <Play className="w-4 h-4 text-blue-600" />;
      case 'ended': return <Pause className="w-4 h-4 text-gray-600" />;
      default: return <Pause className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Rss className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live News</h1>
            <p className="text-gray-600">Manage live streams and real-time coverage</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          <Radio className="w-4 h-4" />
          <span>Start Live Stream</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Live Now</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Radio className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Viewers</p>
              <p className="text-2xl font-bold text-gray-900">6.7K</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Peak Viewers</p>
              <p className="text-2xl font-bold text-gray-900">12.3K</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Live Feeds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {liveFeeds.map((feed) => (
          <div key={feed.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute top-3 left-3">
                <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(feed.status)}`}>
                  {getStatusIcon(feed.status)}
                  <span className="capitalize">{feed.status}</span>
                </span>
              </div>
              {feed.status === 'live' && (
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Users className="w-3 h-3" />
                  <span>{feed.viewers.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{feed.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{feed.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {feed.status === 'live' && <span>Duration: {feed.duration}</span>}
                  {feed.status === 'scheduled' && <span>Starts: {feed.scheduledTime}</span>}
                  {feed.status === 'ended' && <span>Duration: {feed.duration}</span>}
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Radio className="w-5 h-5 text-red-600" />
            <span className="font-medium">Start Emergency Broadcast</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Play className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Schedule Live Event</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Stream Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveNewsPage;