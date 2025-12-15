'use client';

import ReporterLayout from '@/components/ReporterLayout';
import { useState } from 'react';
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Eye,
  Heart,
  Share2,
  FileText,
  Clock,
  Trash2,
  Settings,
  Filter,
  MoreVertical
} from 'lucide-react';

interface Notification {
  id: number;
  type: 'comment' | 'like' | 'share' | 'view' | 'article' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
  userName?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'comment',
    title: 'নতুন মন্তব্য',
    message: 'আপনার "স্থানীয় নির্বাচনে ভোটার উপস্থিতি বৃদ্ধি" নিবন্ধে নতুন মন্তব্য এসেছে',
    time: '৫ মিনিট আগে',
    read: false,
    userName: 'রহিম উদ্দিন',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    type: 'like',
    title: 'নতুন লাইক',
    message: '১৫ জন আপনার সর্বশেষ নিবন্ধ পছন্দ করেছেন',
    time: '১৫ মিনিট আগে',
    read: false
  },
  {
    id: 3,
    type: 'article',
    title: 'নিবন্ধ অনুমোদিত',
    message: 'আপনার "কৃষি উৎপাদনে রেকর্ড বৃদ্ধি" নিবন্ধটি অনুমোদিত হয়েছে এবং প্রকাশিত হয়েছে',
    time: '২ ঘন্টা আগে',
    read: true
  },
  {
    id: 4,
    type: 'share',
    title: 'নিবন্ধ শেয়ার',
    message: 'আপনার নিবন্ধ ২৩ বার শেয়ার হয়েছে',
    time: '৪ ঘন্টা আগে',
    read: true
  },
  {
    id: 5,
    type: 'view',
    title: 'ভিউ মাইলস্টোন',
    message: 'অভিনন্দন! আপনার নিবন্ধ ১০,০০০ ভিউ অতিক্রম করেছে',
    time: '৬ ঘন্টা আগে',
    read: true
  },
  {
    id: 6,
    type: 'system',
    title: 'সিস্টেম আপডেট',
    message: 'নতুন ফিচার যোগ হয়েছে: উন্নত এডিটর এবং মিডিয়া ম্যানেজমেন্ট',
    time: '১ দিন আগে',
    read: true
  },
  {
    id: 7,
    type: 'comment',
    title: 'নতুন মন্তব্য',
    message: 'করিম সাহেব আপনার নিবন্ধে মন্তব্য করেছেন',
    time: '২ দিন আগে',
    read: true,
    userName: 'করিম সাহেব',
    avatar: '/api/placeholder/40/40'
  }
];

const notificationConfig = {
  comment: { icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-100' },
  like: { icon: Heart, color: 'text-red-600', bg: 'bg-red-100' },
  share: { icon: Share2, color: 'text-green-600', bg: 'bg-green-100' },
  view: { icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
  article: { icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
  system: { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-100' }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (confirm('নির্বাচিত নোটিফিকেশনগুলো মুছে দিতে চান?')) {
      setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
      setSelectedNotifications([]);
    }
  };

  return (
    <ReporterLayout title="নোটিফিকেশন">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">নোটিফিকেশন</h2>
            <p className="mt-1 text-sm text-gray-600">
              {unreadCount > 0 ? `${unreadCount} টি নতুন নোটিফিকেশন` : 'সব নোটিফিকেশন পড়া হয়েছে'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                সব পড়া হয়েছে চিহ্নিত করুন
              </button>
            )}
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings className="w-4 h-4 mr-2" />
              সেটিংস
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === 'all' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                সব ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === 'unread' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                অপঠিত ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('comment')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === 'comment' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                মন্তব্য
              </button>
              <button
                onClick={() => setFilter('article')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === 'article' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                নিবন্ধ
              </button>
              <button
                onClick={() => setFilter('system')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === 'system' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                সিস্টেম
              </button>
            </div>

            {selectedNotifications.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedNotifications.length} টি নির্বাচিত
                </span>
                <button
                  onClick={deleteSelected}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => {
              const config = notificationConfig[notification.type];
              const IconComponent = config.icon;
              const isSelected = selectedNotifications.includes(notification.id);
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  } ${isSelected ? 'bg-red-50' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt={notification.userName}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 ${config.color}`} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                            {notification.userName && (
                              <span className="text-red-600 ml-1">- {notification.userName}</span>
                            )}
                          </h4>
                          <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                পড়া হয়েছে চিহ্নিত করুন
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো নোটিফিকেশন নেই</h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? 'সব নোটিফিকেশন পড়া হয়েছে।' 
                  : 'এই ফিল্টারে কোনো নোটিফিকেশন পাওয়া যায়নি।'
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">নোটিফিকেশন সেটিংস</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">নতুন মন্তব্য</h4>
                <p className="text-xs text-gray-600">আপনার নিবন্ধে নতুন মন্তব্য এলে জানান</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">নিবন্ধ অনুমোদন</h4>
                <p className="text-xs text-gray-600">নিবন্ধ অনুমোদিত বা প্রত্যাখ্যাত হলে জানান</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">মাইলস্টোন</h4>
                <p className="text-xs text-gray-600">ভিউ এবং এনগেজমেন্ট মাইলস্টোন অর্জনে জানান</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">সিস্টেম আপডেট</h4>
                <p className="text-xs text-gray-600">নতুন ফিচার এবং সিস্টেম আপডেটের জানান</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}