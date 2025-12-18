"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Image,
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  Edit,
  FolderPlus,
  Video,
  FileText,
  Music,
  Sparkles,
} from "lucide-react";

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);

  const mediaFiles = [
    {
      id: 1,
      name: "breaking-news-banner.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      url: "/api/placeholder/300/200",
      category: "News Images",
    },
    {
      id: 2,
      name: "sports-championship.mp4",
      type: "video",
      size: "45.2 MB",
      duration: "3:24",
      uploadDate: "2024-01-14",
      url: "/api/placeholder/300/200",
      category: "Sports Videos",
    },
    {
      id: 3,
      name: "interview-audio.mp3",
      type: "audio",
      size: "8.7 MB",
      duration: "12:45",
      uploadDate: "2024-01-13",
      url: "/api/placeholder/300/200",
      category: "Interviews",
    },
    {
      id: 4,
      name: "economic-report.pdf",
      type: "document",
      size: "1.2 MB",
      pages: "24 pages",
      uploadDate: "2024-01-12",
      url: "/api/placeholder/300/200",
      category: "Reports",
    },
    {
      id: 5,
      name: "political-rally.jpg",
      type: "image",
      size: "3.1 MB",
      dimensions: "2048x1536",
      uploadDate: "2024-01-11",
      url: "/api/placeholder/300/200",
      category: "Politics",
    },
    {
      id: 6,
      name: "tech-conference.jpg",
      type: "image",
      size: "2.8 MB",
      dimensions: "1800x1200",
      uploadDate: "2024-01-10",
      url: "/api/placeholder/300/200",
      category: "Technology",
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="w-6 h-6" />;
      case "video":
        return <Video className="w-6 h-6" />;
      case "audio":
        return <Music className="w-6 h-6" />;
      case "document":
        return <FileText className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "text-green-600 bg-green-100";
      case "video":
        return "text-blue-600 bg-blue-100";
      case "audio":
        return "text-purple-600 bg-purple-100";
      case "document":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredFiles = mediaFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectFile = (id: number) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id));
    }
  };

  const handleViewFile = (file: any) => {
    // For images and documents, open in new tab
    if (file.type === "image" || file.type === "document") {
      window.open(file.url, "_blank");
    } else if (file.type === "video" || file.type === "audio") {
      // For media files, you might want to open in a modal or media player
      // For now, we'll open in new tab as well
      window.open(file.url, "_blank");
    }
  };

  const handleDownloadFile = async (file: any) => {
    try {
      // Create a temporary anchor element for download
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_blank";

      // For cross-origin files, we might need to fetch and create a blob
      // This is a simplified version - in production you'd handle CORS properly
      if (file.url.startsWith("http")) {
        // For external URLs, open in new tab (browsers handle download)
        window.open(file.url, "_blank");
      } else {
        // For local files, trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Show success message (you might want to use a toast library)
      console.log(`Downloading ${file.name}`);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const handleDeleteFile = (fileId: number) => {
    setFileToDelete(fileId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      // Remove from selected files if it was selected
      setSelectedFiles((prev) => prev.filter((id) => id !== fileToDelete));

      // In a real app, you would make an API call here
      console.log(`Deleting file with ID: ${fileToDelete}`);

      // Show success message
      alert("File deleted successfully!");

      setShowDeleteConfirm(false);
      setFileToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setFileToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return;

    const confirmMessage = `Are you sure you want to delete ${selectedFiles.length} selected file(s)? This action cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      // Remove all selected files
      setSelectedFiles([]);

      // In a real app, you would make API calls here
      console.log(`Bulk deleting files: ${selectedFiles.join(", ")}`);

      // Show success message
      alert(`${selectedFiles.length} file(s) deleted successfully!`);
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                <Image className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Media Library
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Manage images, videos, audio files, and documents
                </motion.p>
              </div>
            </div>
            <div className="flex space-x-3">
              <motion.button className="flex items-center cursor-pointer space-x-3 bg-white text-purple-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5" />
                <span>Upload Files</span>
              </motion.button>
              <motion.button className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <FolderPlus className="w-5 h-5" />
                <span>New Folder</span>
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
        <motion.div
          className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Images</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {mediaFiles.filter((f) => f.type === "image").length}
              </p>
            </div>
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <Image className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500 font-medium">
              12.4 MB total
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Videos</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {mediaFiles.filter((f) => f.type === "video").length}
              </p>
            </div>
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500 font-medium">
              45.2 MB total
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Audio</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {mediaFiles.filter((f) => f.type === "audio").length}
              </p>
            </div>
            <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500 font-medium">
              8.7 MB total
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Documents</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {mediaFiles.filter((f) => f.type === "document").length}
              </p>
            </div>
            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500 font-medium">
              1.2 MB total
            </span>
          </div>
        </motion.div>
      </div>

      {/* Filters and Controls */}
      <motion.div
        className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <Search className="w-6 h-6 mr-3 text-purple-600" />
          Search & Filter
        </motion.h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-all w-64 text-md font-normal placeholder-gray-400"
              />
            </div>
            <select className="border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-all text-md font-normal">
              <option>All Types</option>
              <option>Images</option>
              <option>Videos</option>
              <option>Audio</option>
              <option>Documents</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            {selectedFiles.length > 0 && (
              <motion.div
                className="flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-purple-800 font-semibold">
                    {selectedFiles.length} file
                    {selectedFiles.length > 1 ? "s" : ""} selected
                  </span>
                </div>
                <motion.button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium shadow-md"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete All</span>
                </motion.button>
              </motion.div>
            )}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
              <motion.button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white shadow-md text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white shadow-md text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Media Grid/List */}
      <motion.div
        className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <FileText className="w-6 h-6 mr-3 text-green-600" />
          Media Files
        </motion.h3>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                className="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                  {file.type === "image" ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${getFileTypeColor(
                        file.type
                      )}`}
                    >
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  {/* Selection overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                      className="w-5 h-5 text-purple-600 bg-white border-2 border-white rounded focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${getFileTypeColor(
                        file.type
                      )}`}
                    >
                      {file.type}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 truncate mb-2 text-sm">
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 font-medium">
                    {file.category}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-medium">{file.size}</span>
                    <span className="font-medium">{file.uploadDate}</span>
                  </div>

                  {file.dimensions && (
                    <p className="text-xs text-gray-500 font-medium">
                      {file.dimensions}
                    </p>
                  )}
                  {file.duration && (
                    <p className="text-xs text-gray-500 font-medium">
                      {file.duration}
                    </p>
                  )}
                  {file.pages && (
                    <p className="text-xs text-gray-500 font-medium">
                      {file.pages}
                    </p>
                  )}
                </div>

                {/* Enhanced Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleViewFile(file)}
                          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          title="View File"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleDownloadFile(file)}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-200 text-sm font-medium"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Download File"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => handleDeleteFile(file.id)}
                        className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Delete File"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === filteredFiles.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getFileTypeColor(
                            file.type
                          )}`}
                        >
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {file.name}
                          </div>
                          {file.dimensions && (
                            <div className="text-sm text-gray-500">
                              {file.dimensions}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFileTypeColor(
                          file.type
                        )}`}
                      >
                        {file.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={() => handleViewFile(file)}
                          className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200 text-sm font-medium border border-blue-200"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          title="View File"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleDownloadFile(file)}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 text-sm font-medium border border-green-200"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Download File"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteFile(file.id)}
                          className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 text-sm font-medium border border-red-200"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Delete File"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete File
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this file? This action cannot be
              undone.
            </p>
            <div className="flex space-x-3">
              <motion.button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
