"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  AlertTriangle,
} from "lucide-react";

const BreakingNewsClient = () => {
  const [breakingNews, setBreakingNews] = useState([
    {
      id: 1,
      title: "Major Economic Policy Announced",
      content:
        "Government announces new economic reforms affecting multiple sectors...",
      priority: "high",
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      expiresAt: "2024-01-16T10:30:00Z",
    },
    {
      id: 2,
      title: "Breaking: Technology Summit Begins",
      content:
        "International technology summit kicks off with major announcements...",
      priority: "medium",
      status: "scheduled",
      createdAt: "2024-01-15T09:15:00Z",
      expiresAt: "2024-01-15T18:00:00Z",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-red-500 to-orange-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Breaking News Management</h1>
                <p className="text-white/80 mt-1">
                  Create and manage urgent news alerts that capture immediate
                  attention
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-3 bg-white text-red-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow  transform hover:-translate-y-0.5">
              <Plus className="w-5 h-5" />
              <span>Create Alert</span>
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="bg-linear-to-br from-red-50 to-red-100 p-6 rounded shadow  transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Active Alerts</p>
              <p className="text-3xl font-bold text-red-900">3</p>
            </div>
            <div className="p-4 bg-red-200 rounded">
              <AlertTriangle className="w-7 h-7 text-red-700" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded shadow  transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Scheduled</p>
              <p className="text-3xl font-bold text-blue-900">2</p>
            </div>
            <div className="p-4 bg-blue-200 rounded">
              <Clock className="w-7 h-7 text-blue-700" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded shadow  transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">
                Today's Alerts
              </p>
              <p className="text-3xl font-bold text-green-900">5</p>
            </div>
            <div className="p-4 bg-green-200 rounded">
              <Zap className="w-7 h-7 text-green-700" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded shadow  transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Total Views</p>
              <p className="text-3xl font-bold text-purple-900">12.5K</p>
            </div>
            <div className="p-4 bg-purple-200 rounded">
              <Eye className="w-7 h-7 text-purple-700" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Breaking News List */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-linear-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Zap className="w-5 h-5 text-red-500 mr-2" />
              Recent Breaking News
            </h2>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
              {breakingNews.length} alerts
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {breakingNews.map((news, index) => (
            <motion.div
              key={news.id}
              className="p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer group border-l-4 border-transparent hover:border-red-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {news.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                        news.priority
                      )}`}
                    >
                      {news.priority}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        news.status
                      )}`}
                    >
                      {news.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{news.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                    <span>
                      Created: {new Date(news.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Expires: {new Date(news.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {breakingNews.length === 0 && (
          <div className="p-12 text-center">
            <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Breaking News
            </h3>
            <p className="text-gray-500">
              Create your first breaking news alert to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakingNewsClient;
