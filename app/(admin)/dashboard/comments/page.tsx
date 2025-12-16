"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Check,
  X,
  Flag,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const comments = [
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      content: "This is a great article! Very informative and well-written.",
      article: "Breaking: Major Economic Policy Changes Announced",
      status: "approved",
      date: "2024-01-15",
      likes: 12,
      dislikes: 2,
      replies: 3,
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com",
      content:
        "I disagree with some points mentioned in this article. The analysis seems biased.",
      article: "Technology Trends Shaping the Future",
      status: "pending",
      date: "2024-01-14",
      likes: 5,
      dislikes: 8,
      replies: 1,
    },
    {
      id: 3,
      author: "Mike Johnson",
      email: "mike@example.com",
      content: "Excellent coverage of the championship! Keep up the good work.",
      article: "Sports Update: Championship Results",
      status: "approved",
      date: "2024-01-13",
      likes: 25,
      dislikes: 0,
      replies: 7,
    },
    {
      id: 4,
      author: "Anonymous User",
      email: "spam@fake.com",
      content: "This is spam content with inappropriate language and links.",
      article: "Health & Wellness: New Research Findings",
      status: "flagged",
      date: "2024-01-12",
      likes: 0,
      dislikes: 15,
      replies: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.article.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
            Comments Management
          </h1>
          <p className="text-gray-600">Moderate and manage user comments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border-3 border-blue-100 p-6 hover:border-blue-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Comments
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">4,621</p>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-green-600">+12%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-3 border-yellow-100 p-6 hover:border-yellow-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Review
              </p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
            </div>
            <div className="w-14 h-14 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Filter className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-yellow-600">
              Needs attention
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-3 border-green-100 p-6 hover:border-green-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Approved Today
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">156</p>
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center">
              <Check className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-green-600">+8%</span>
            <span className="text-sm text-gray-500 ml-2">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-3 border-red-100 p-6 hover:border-red-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Flagged</p>
              <p className="text-3xl font-bold text-red-600 mt-2">7</p>
            </div>
            <div className="w-14 h-14 bg-red-500 rounded-lg flex items-center justify-center">
              <Flag className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-red-600">
              Requires review
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
            Showing {filteredComments.length} of {comments.length} comments
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-white rounded-2xl border-3 border-gray-100 hover:border-primary/30 transition-all duration-300">
        <div className="px-6 py-4 border-b-3 border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {comment.author}
                      </h4>
                      <p className="text-sm text-gray-500">{comment.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        comment.status
                      )}`}
                    >
                      {comment.status}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{comment.content}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {comment.date}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </span>
                    <span className="flex items-center">
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      {comment.dislikes}
                    </span>
                    <span>{comment.replies} replies</span>
                  </div>

                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Article:</span>{" "}
                      {comment.article}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
