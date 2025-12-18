"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Flag,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Trash2,
  Edit,
} from "lucide-react";
import { Comment } from "@/types/comment";
import { dummyComments } from "@/lib/dummy-comments";

export default function CommentsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [comments, setComments] = useState<Comment[]>(dummyComments);

  // Action handlers
  const handleApproveComment = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, status: "approved" } : comment
      )
    );
    // In a real app, this would make an API call
    console.log("Approved comment:", commentId);
  };

  const handleRejectComment = (commentId: number) => {
    if (confirm("Are you sure you want to reject this comment?")) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, status: "rejected" }
            : comment
        )
      );
      // In a real app, this would make an API call
      console.log("Rejected comment:", commentId);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this comment? This action cannot be undone."
      )
    ) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      // In a real app, this would make an API call
      console.log("Deleted comment:", commentId);
    }
  };

  const handleViewComment = (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      alert(
        `Comment Details:\n\nAuthor: ${comment.author}\nEmail: ${comment.email}\nContent: ${comment.content}\nArticle: ${comment.article}\nStatus: ${comment.status}\nDate: ${comment.date}`
      );
    }
  };

  const handleBulkActions = () => {
    alert(
      "Bulk actions feature would allow selecting multiple comments and performing actions on them."
    );
  };

  const statuses = ["approved", "pending", "flagged"];

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.article.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case "date":
        aVal = new Date(a.date);
        bVal = new Date(b.date);
        break;
      case "author":
        aVal = a.author.toLowerCase();
        bVal = b.author.toLowerCase();
        break;
      case "likes":
        aVal = a.likes;
        bVal = b.likes;
        break;
      case "replies":
        aVal = a.replies;
        bVal = b.replies;
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
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      flagged: "bg-red-100 text-red-800",
      rejected: "bg-gray-100 text-gray-800",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "flagged":
        return <Flag className="w-5 h-5 text-red-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-500 to-purple-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Comments Management</h1>
                <p className="text-white/80 mt-1">
                  Moderate and manage user comments across all articles
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-3 bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Filter className="w-5 h-5" />
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
        <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
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
                Total Comments
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {comments.length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
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
                Pending Review
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {comments.filter((c) => c.status === "pending").length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
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
                Approved
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {comments.filter((c) => c.status === "approved").length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Flag className="w-6 h-6 text-white" />
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
                Flagged
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                {comments.filter((c) => c.status === "flagged").length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Comments
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by content, author, or article..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary transition-all"
            >
              <option value="all">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2.5 rounded font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split("-");
              setSortBy(by);
              setSortOrder(order);
            }}
            className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="date-desc">Date Newest</option>
            <option value="date-asc">Date Oldest</option>
            <option value="author-asc">Author A-Z</option>
            <option value="author-desc">Author Z-A</option>
            <option value="likes-desc">Likes High to Low</option>
            <option value="likes-asc">Likes Low to High</option>
            <option value="replies-desc">Replies High to Low</option>
            <option value="replies-asc">Replies Low to High</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {sortedComments.length} comments
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
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
              {sortedComments.map((comment, index) => (
                <tr
                  key={comment.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-900 truncate">
                        {comment.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        Article: {comment.article}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {comment.author}
                        </div>
                        <div className="text-sm text-gray-500">
                          {comment.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(comment.status)}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                          comment.status
                        )}`}
                      >
                        {comment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 text-green-400 mr-1" />
                        {comment.likes}
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="w-4 h-4 text-red-400 mr-1" />
                        {comment.dislikes}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 text-blue-400 mr-1" />
                        {comment.replies}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        title="View Comment"
                        className="p-2 text-blue-600 hover:text-blue-900 bg-blue-100 rounded-lg transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        title="Approve Comment"
                        className="p-2 text-green-600 hover:text-green-900 bg-green-100 rounded-lg transition-all duration-200"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        title="Reject Comment"
                        className="p-2 text-red-600 hover:text-red-900 bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        title="More Actions"
                        className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <span className="font-medium">{sortedComments.length}</span> of{" "}
              <span className="font-medium">{sortedComments.length}</span>{" "}
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
