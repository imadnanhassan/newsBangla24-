"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Upload,
} from "lucide-react";

export default function ArticleManagementClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Mock data for news portal articles
  const articles = [
    {
      id: 1,
      title: "Breaking: Prime Minister Announces New Economic Policy",
      category: "Politics",
      reporter: "আহমেদ হাসান",
      status: "Published",
      views: 15420,
      comments: 89,
      publishDate: "2024-12-15T10:30:00",
      featured: true,
      priority: "high",
      thumbnail: "/api/placeholder/80/60",
    },
    {
      id: 2,
      title: "Bangladesh Cricket Team Wins Historic Victory",
      category: "Sports",
      reporter: "রহিমা খাতুন",
      status: "Published",
      views: 8750,
      comments: 156,
      publishDate: "2024-12-15T08:15:00",
      featured: false,
      priority: "medium",
      thumbnail: "/api/placeholder/80/60",
    },
    {
      id: 3,
      title: "New Technology Hub Opens in Dhaka",
      category: "Technology",
      reporter: "করিম উদ্দিন",
      status: "Draft",
      views: 0,
      comments: 0,
      publishDate: null,
      featured: false,
      priority: "low",
      thumbnail: "/api/placeholder/80/60",
    },
    {
      id: 4,
      title: "Flood Situation Improves in Northern Districts",
      category: "National",
      reporter: "ফাতেমা বেগম",
      status: "Review",
      views: 0,
      comments: 0,
      publishDate: null,
      featured: true,
      priority: "high",
      thumbnail: "/api/placeholder/80/60",
    },
    {
      id: 5,
      title: "Stock Market Shows Positive Trends",
      category: "Business",
      reporter: "মোহাম্মদ আলী",
      status: "Scheduled",
      views: 0,
      comments: 0,
      publishDate: "2024-12-16T09:00:00",
      featured: false,
      priority: "medium",
      thumbnail: "/api/placeholder/80/60",
    },
  ];

  const categories = [
    "Politics",
    "Sports",
    "Technology",
    "National",
    "Business",
    "Entertainment",
    "International",
  ];
  const statuses = ["Published", "Draft", "Review", "Scheduled"];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.reporter.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case "title":
        aVal = a.title.toLowerCase();
        bVal = b.title.toLowerCase();
        break;
      case "date":
        aVal = new Date(a.publishDate || 0);
        bVal = new Date(b.publishDate || 0);
        break;
      case "views":
        aVal = a.views;
        bVal = b.views;
        break;
      case "comments":
        aVal = a.comments;
        bVal = b.comments;
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
      Published: "bg-green-100 text-green-800",
      Draft: "bg-gray-100 text-gray-800",
      Review: "bg-yellow-100 text-yellow-800",
      Scheduled: "bg-blue-100 text-blue-800",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return (
      priorityStyles[priority as keyof typeof priorityStyles] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-500 to-purple-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Article Management</h1>
                <p className="text-white/80 mt-1">
                  Create and manage your news articles, drafts, and publications
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link className="cursor-pointer" href="/dashboard/article/add">
                <button className="flex items-center cursor-pointer space-x-3 bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Plus className="w-5 h-5" />
                  <span>New Article</span>
                </button>
              </Link>
              <button className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5" />
                <span>Import Articles</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
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
                Published
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                2
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
                In Review
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                1
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
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
                Drafts
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900"
                whileHover={{ scale: 1.1 }}
              >
                1
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
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
                1
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded border border-gray-100 p-6  transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Articles
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title or reporter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all"
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
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="date-desc">Date Newest</option>
            <option value="date-asc">Date Oldest</option>
            <option value="views-desc">Views High to Low</option>
            <option value="views-asc">Views Low to High</option>
            <option value="comments-desc">Comments High to Low</option>
            <option value="comments-asc">Comments Low to High</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {sortedArticles.length} articles
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
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
              {sortedArticles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-16 rounded object-cover mr-4"
                        src={article.thumbnail}
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {article.title}
                          </div>
                          {article.featured && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(
                              article.priority
                            )}`}
                          >
                            {article.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {article.reporter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                        article.status
                      )}`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 mr-1" />
                        {article.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 text-gray-400 mr-1" />
                        {article.comments}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.publishDate
                      ? new Date(article.publishDate).toLocaleDateString(
                          "bn-BD"
                        )
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        title="View Article"
                        className="p-2 text-blue-600 hover:text-blue-900 bg-blue-100 rounded-lg transition-all duration-200 "
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link href={`/dashboard/article/edit/${article.id}`}>
                        <button
                          title="Edit Article"
                          className="p-2 text-green-600 hover:text-green-900 bg-green-100 rounded-lg transition-all duration-200 "
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        title="Delete Article"
                        className="p-2 text-red-600 hover:text-red-900 bg-red-50 rounded-lg transition-all duration-200 "
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this article?"
                            )
                          ) {
                            // Handle delete
                            console.log("Delete article:", article.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
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
      <div className="bg-white px-4 py-3 flex items-center justify-between  border-gray-100 sm:px-6 rounded border  transition-all duration-300">
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
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">5</span> results
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
