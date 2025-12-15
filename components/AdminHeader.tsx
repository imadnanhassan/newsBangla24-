'use client';

import { useState } from 'react';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  FileText
} from 'lucide-react';

const AdminHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'New article submitted', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Comment awaiting moderation', time: '5 min ago', type: 'warning' },
    { id: 3, title: 'System backup completed', time: '1 hour ago', type: 'success' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between ml-12 lg:ml-0">
        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles, users, categories..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <button className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-500/25">
            <Plus className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">New Article</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors relative rounded-xl hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 ${
                          notification.type === 'info' ? 'bg-blue-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="py-2">
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <User className="w-4 h-4 mr-3" />
                    Profile Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;