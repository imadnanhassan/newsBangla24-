"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Video,
  Upload,
  Play,
  Eye,
  Clock,
  Edit,
  Trash2,
  Filter,
  Plus,
  Search,
  Sparkles,
  X,
  AlertCircle,
} from "lucide-react";
import { useAdminActions } from "@/lib/hooks/useAdminActions";

export default function VideoNewsPage() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Economic Policy Analysis",
      description:
        "In-depth analysis of the new economic policies and their impact",
      duration: "12:45",
      views: 15420,
      status: "published",
      category: "Politics",
      uploadDate: "2024-01-15",
      thumbnail: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Technology Innovation Summit",
      description: "Highlights from the annual technology innovation summit",
      duration: "8:30",
      views: 8750,
      status: "processing",
      category: "Technology",
      uploadDate: "2024-01-14",
      thumbnail: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Sports Championship Highlights",
      description: "Best moments from the championship final match",
      duration: "15:20",
      views: 25680,
      status: "published",
      category: "Sports",
      uploadDate: "2024-01-13",
      thumbnail: "/api/placeholder/300/200",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    deleteModalOpen,
    deleteConfig,
    handleDeleteConfirm,
    handleDeleteCancel,
    confirmDelete,
  } = useAdminActions();

  // SEO optimization
  useEffect(() => {
    document.title = "Video News Management - NewsBangla24 Admin";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Manage video news content for NewsBangla24. Upload, edit, and organize video stories efficiently."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Manage video news content for NewsBangla24. Upload, edit, and organize video stories efficiently.";
      document.head.appendChild(meta);
    }

    // Set robots meta tag for admin pages
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", "noindex, nofollow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
    }

    // Set keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute(
        "content",
        "video news, multimedia content, NewsBangla24, admin panel, video management"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content =
        "video news, multimedia content, NewsBangla24, admin panel, video management";
      document.head.appendChild(meta);
    }
  }, []);

  // Handle modal open/close with body scroll lock
  useEffect(() => {
    if (deleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteModalOpen]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || video.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <motion.div
        className="relative overflow-hidden bg-linear-to-r from-purple-600 via-purple-500 to-pink-500 rounded p-8 text-white shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-3 bg-white/20 backdrop-blur-sm rounded shadow"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Video className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Video News
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Manage video content and multimedia stories
                </motion.p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link className="cursor-pointer" href="/dashboard/video/add">
                <motion.button className="flex items-center cursor-pointer space-x-3 bg-white text-purple-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Plus className="w-5 h-5" />
                  <span>Upload Video</span>
                </motion.button>
              </Link>
              <motion.button className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5" />
                <span>Import Videos</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
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
                Total Videos
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                {videos.length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
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
                Total Views
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                {videos
                  .reduce((sum, video) => sum + video.views, 0)
                  .toLocaleString()}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
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
                Watch Time
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                45.2K
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
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
                Processing
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                {videos.filter((v) => v.status === "processing").length}
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
              Search Videos
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, description..."
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
              <option value="published">Published</option>
              <option value="processing">Processing</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2.5 rounded font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300 group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-video bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Play className="w-16 h-16 text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-sm ${getStatusColor(
                    video.status
                  )}`}
                >
                  {video.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <motion.h3
                className="font-bold text-xl text-gray-900 mb-3 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {video.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-4 leading-relaxed line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {video.description}
              </motion.p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  {video.category}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {video.views.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(video.uploadDate).toLocaleDateString("bn-BD")}
                </span>
                <div className="flex items-center space-x-2">
                  <Link href={`/dashboard/video/${video.id}`}>
                    <button
                      title="View Video"
                      className="p-2 text-blue-600 hover:text-blue-900 bg-blue-100 rounded-lg transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href={`/dashboard/video/edit/${video.id}`}>
                    <button
                      title="Edit Video"
                      className="p-2 text-green-600 hover:text-green-900 bg-green-100 rounded-lg transition-all duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    title="Delete Video"
                    className="p-2 text-red-600 hover:text-red-900 bg-red-50 rounded-lg transition-all duration-200"
                    onClick={() =>
                      confirmDelete({
                        itemName: video.title,
                        itemType: "video",
                        additionalInfo: `${video.views.toLocaleString()} views will be affected`,
                        onConfirm: async () => {
                          // Simulate API call
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          setVideos(videos.filter((v) => v.id !== video.id));
                          console.log("Deleting video:", video.id);
                        },
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && deleteConfig && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleDeleteCancel}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Video className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Delete {deleteConfig.itemType}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDeleteCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-900">
                      "{deleteConfig.itemName}"
                    </span>
                    ?
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Permission Required</p>
                      <p>
                        You need <strong>Administrator</strong> or{" "}
                        <strong>Content Manager</strong> permissions to delete
                        {deleteConfig.itemType}s. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                {deleteConfig.additionalInfo && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div className="text-sm text-red-800">
                        <p className="font-medium mb-1">Warning</p>
                        <p>{deleteConfig.additionalInfo}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleDeleteCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete {deleteConfig.itemType}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
