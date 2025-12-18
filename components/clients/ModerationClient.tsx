"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Shield,
  AlertTriangle,
  Eye,
  Check,
  X,
  Flag,
  MessageSquare,
  User,
  Clock,
  FileText,
  Settings,
  Filter,
  Search,
} from "lucide-react";
import {
  ModerationItem,
  ModerationStats,
  ModerationGuidelines,
} from "@/types/moderation";
import {
  dummyModerationQueue,
  dummyModerationStats,
  dummyModerationGuidelines,
  getModerationItemsByStatus,
  getModerationItemsByPriority,
} from "@/lib/dummy-moderation";

export default function ModerationClient() {
  const [moderationQueue, setModerationQueue] =
    useState<ModerationItem[]>(dummyModerationQueue);
  const [stats] = useState<ModerationStats>(dummyModerationStats);
  const [guidelines] = useState<ModerationGuidelines>(
    dummyModerationGuidelines
  );
  const [filter, setFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredQueue = moderationQueue.filter((item) => {
    const matchesStatus = filter === "all" || item.status === filter;
    const matchesPriority =
      priorityFilter === "all" || item.priority === priorityFilter;
    const matchesSearch =
      searchTerm === "" ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reportReason.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      reviewed: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      critical: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      priorityStyles[priority as keyof typeof priorityStyles] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case "article":
        return <FileText className="w-5 h-5 text-green-600" />;
      case "user":
        return <User className="w-5 h-5 text-purple-600" />;
      case "post":
        return <Flag className="w-5 h-5 text-orange-600" />;
      default:
        return <Flag className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "low":
        return <Check className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleApprove = (id: number) => {
    setModerationQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "approved" as const,
              reviewedAt: new Date().toISOString(),
              reviewer: "admin",
            }
          : item
      )
    );
  };

  const handleReject = (id: number) => {
    if (
      confirm(
        "Are you sure you want to reject this content? This action will remove or hide the reported content."
      )
    ) {
      setModerationQueue((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "rejected" as const,
                reviewedAt: new Date().toISOString(),
                reviewer: "admin",
              }
            : item
        )
      );
    }
  };

  const handleViewDetails = (item: ModerationItem) => {
    alert(
      `Content Details:\n\nType: ${item.type}\nAuthor: ${
        item.author
      }\nContent: ${item.content}\nReport Reason: ${
        item.reportReason
      }\nReported By: ${item.reportedBy}\nPriority: ${item.priority}\nStatus: ${
        item.status
      }\nCreated: ${new Date(item.createdAt).toLocaleString()}${
        item.reviewedAt
          ? `\nReviewed: ${new Date(item.reviewedAt).toLocaleString()}`
          : ""
      }`
    );
  };

  const handleBulkAction = (action: string) => {
    alert(
      `${action} - This would perform bulk moderation actions on selected items`
    );
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-red-500 to-pink-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Content Moderation</h1>
                <p className="text-white/80 mt-1">
                  Review and moderate reported content to maintain community
                  standards
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleBulkAction("Bulk Approve")}
                className="flex items-center space-x-3 bg-white text-red-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Check className="w-5 h-5" />
                <span>Bulk Actions</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
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
                Pending Review
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.pendingReview}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
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
                Critical Issues
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.criticalIssues}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
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
                Approved Today
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.approvedToday}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
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
                Rejected Today
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {stats.rejectedToday}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Content
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by content, author, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary transition-all"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="reviewed">Reviewed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary transition-all"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
                setPriorityFilter("all");
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2.5 rounded font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Moderation Queue Table */}
      <div className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQueue.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        by {item.author}
                        {item.article && ` in "${item.article}"`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(item.type)}
                      <span className="ml-2 text-sm font-medium capitalize">
                        {item.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPriorityIcon(item.priority)}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm text-gray-900">
                        Reason: {item.reportReason}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Reported by: {item.reportedBy}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(item)}
                        title="View Details"
                        className="p-2 text-blue-600 hover:text-blue-900 bg-blue-100 rounded-lg transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            title="Approve Content"
                            className="p-2 text-green-600 hover:text-green-900 bg-green-100 rounded-lg transition-all duration-200"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            title="Reject Content"
                            className="p-2 text-red-600 hover:text-red-900 bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
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

      {/* Moderation Guidelines */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Moderation Guidelines
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-red-600 mb-3 flex items-center">
              <X className="w-5 h-5 mr-2" />
              Content to Reject
            </h3>
            <ul className="space-y-2">
              {guidelines.rejectContent.map((item, index) => (
                <motion.li
                  key={index}
                  className="text-sm text-gray-600 flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-red-500 mr-2">•</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-600 mb-3 flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Content to Approve
            </h3>
            <ul className="space-y-2">
              {guidelines.approveContent.map((item, index) => (
                <motion.li
                  key={index}
                  className="text-sm text-gray-600 flex items-start"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-green-500 mr-2">•</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Priority Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(guidelines.priorityLevels).map(
              ([level, description], index) => (
                <motion.div
                  key={level}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {getPriorityIcon(level)}
                  <div>
                    <span className="font-medium capitalize text-gray-900">
                      {level}:
                    </span>
                    <span className="text-sm text-gray-600 ml-1">
                      {description}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
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
              <span className="font-medium">{filteredQueue.length}</span> of{" "}
              <span className="font-medium">{filteredQueue.length}</span>{" "}
              moderation items
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
