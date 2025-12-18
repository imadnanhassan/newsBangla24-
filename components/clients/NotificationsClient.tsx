"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Bell,
  Send,
  Users,
  Eye,
  Settings,
  Plus,
  Filter,
  Check,
  X,
  Clock,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import {
  Notification,
  NotificationStats,
  NotificationAnalytics,
} from "@/types/notification";
import {
  dummyNotifications,
  dummyNotificationStats,
  dummyNotificationAnalytics,
} from "@/lib/dummy-notifications";

export default function NotificationsClient() {
  const [notifications] = useState<Notification[]>(dummyNotifications);
  const [stats] = useState<NotificationStats>(dummyNotificationStats);
  const [analytics] = useState<NotificationAnalytics>(
    dummyNotificationAnalytics
  );
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => notif.status === filter);

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case "date":
        const aDate = a.sentAt || a.scheduledAt || a.createdAt || "";
        const bDate = b.sentAt || b.scheduledAt || b.createdAt || "";
        aVal = new Date(aDate).getTime();
        bVal = new Date(bDate).getTime();
        break;
      case "recipients":
        aVal = a.recipients;
        bVal = b.recipients;
        break;
      case "openRate":
        aVal = a.openRate;
        bVal = b.openRate;
        break;
      default:
        return 0;
    }
    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      sent: "bg-green-100 text-green-800 border-green-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getTypeBadge = (type: string) => {
    const typeStyles = {
      breaking: "bg-red-100 text-red-800",
      digest: "bg-blue-100 text-blue-800",
      sports: "bg-green-100 text-green-800",
      weather: "bg-yellow-100 text-yellow-800",
      general: "bg-purple-100 text-purple-800",
    };
    return (
      typeStyles[type as keyof typeof typeStyles] || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-5 h-5 text-green-600" />;
      case "scheduled":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "draft":
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
      case "failed":
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const handleSendNotification = (id: number) => {
    alert(`Send notification ${id} - This would trigger the sending process`);
  };

  const handleCancelNotification = (id: number) => {
    if (
      confirm("Are you sure you want to cancel this scheduled notification?")
    ) {
      alert(
        `Cancel notification ${id} - This would remove the scheduled notification`
      );
    }
  };

  const handleCreateNotification = () => {
    alert("Create new notification - This would open a notification composer");
  };

  const handleQuickAction = (action: string) => {
    alert(`${action} - This would trigger the respective quick action`);
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-500 to-indigo-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Notifications Management</h1>
                <p className="text-white/80 mt-1">
                  Create and manage push notifications and alerts for users
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateNotification}
                className="flex items-center space-x-3 bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span>Create Notification</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Total Sent
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {formatNumber(stats.totalSent)}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Subscribers
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {formatNumber(stats.subscribers)}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Open Rate
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.openRate}%
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.p
                className="text-sm font-medium text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                Scheduled
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.scheduled}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", "sent", "scheduled", "draft", "failed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    filter === status
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("-");
                setSortBy(by);
                setSortOrder(order);
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="date-desc">Date Newest</option>
              <option value="date-asc">Date Oldest</option>
              <option value="recipients-desc">Recipients High to Low</option>
              <option value="recipients-asc">Recipients Low to High</option>
              <option value="openRate-desc">Open Rate High to Low</option>
              <option value="openRate-asc">Open Rate Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedNotifications.map((notification, index) => (
                <tr
                  key={notification.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {notification.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(
                        notification.type
                      )}`}
                    >
                      {notification.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(notification.status)}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                          notification.status
                        )}`}
                      >
                        {notification.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      {notification.recipients.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.status === "sent" ? (
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-blue-400 mr-1" />
                        {notification.openRate}% open rate
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.sentAt &&
                      `Sent: ${new Date(notification.sentAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}`}
                    {notification.scheduledAt &&
                      `Scheduled: ${new Date(
                        notification.scheduledAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`}
                    {notification.createdAt &&
                      `Created: ${new Date(
                        notification.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {notification.status === "draft" && (
                        <button
                          onClick={() =>
                            handleSendNotification(notification.id)
                          }
                          title="Send Notification"
                          className="p-2 text-blue-600 hover:text-blue-900 bg-blue-100 rounded-lg transition-all duration-200"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      {notification.status === "scheduled" && (
                        <button
                          onClick={() =>
                            handleCancelNotification(notification.id)
                          }
                          title="Cancel Notification"
                          className="p-2 text-red-600 hover:text-red-900 bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        title="Settings"
                        className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Notification Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics.totalDeliveries)}
            </div>
            <div className="text-sm text-gray-600">Total Deliveries</div>
            <div className="flex items-center justify-center mt-2">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Send className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">
                  {analytics.deliveryChange}% increase
                </span>
              </motion.div>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {analytics.averageOpenRate}%
            </div>
            <div className="text-sm text-gray-600">Average Open Rate</div>
            <div className="flex items-center justify-center mt-2">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Eye className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">
                  {analytics.openRateChange}% increase
                </span>
              </motion.div>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {analytics.clickThroughRate}%
            </div>
            <div className="text-sm text-gray-600">Click Through Rate</div>
            <div className="flex items-center justify-center mt-2">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {analytics.clickRateChange >= 0 ? (
                  <Eye className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span
                  className={`text-xs ${
                    analytics.clickRateChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {Math.abs(analytics.clickRateChange)}%{" "}
                  {analytics.clickRateChange >= 0 ? "increase" : "decrease"}
                </span>
              </motion.div>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {analytics.bounceRate}%
            </div>
            <div className="text-sm text-gray-600">Bounce Rate</div>
            <div className="flex items-center justify-center mt-2">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <AlertTriangle className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">
                  {Math.abs(analytics.bounceRateChange)}% decrease
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleQuickAction("Send Breaking News Alert")}
            className="flex items-center space-x-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <Bell className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-900">
              Send Breaking News Alert
            </span>
          </button>
          <button
            onClick={() => handleQuickAction("Schedule Daily Digest")}
            className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <Send className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-900">
              Schedule Daily Digest
            </span>
          </button>
          <button
            onClick={() => handleQuickAction("Notification Settings")}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <Settings className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-900">
              Notification Settings
            </span>
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-gray-100 sm:px-6 rounded border transition-all duration-300">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{sortedNotifications.length}</span>{" "}
              of{" "}
              <span className="font-medium">{sortedNotifications.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
