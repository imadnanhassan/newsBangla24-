"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Users,
  UserCheck,
  FileText,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Sparkles,
  AlertCircle,
  X,
} from "lucide-react";
import { useAdminActions } from "@/lib/hooks/useAdminActions";

export default function ReporterManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    deleteModalOpen,
    deleteConfig,
    handleDeleteConfirm,
    handleDeleteCancel,
    confirmDelete,
  } = useAdminActions();

  // SEO optimization
  useEffect(() => {
    document.title = "Reporter Management - NewsBangla24 Admin";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Manage reporters and journalists for NewsBangla24. Monitor performance, assign roles, and organize editorial staff efficiently."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Manage reporters and journalists for NewsBangla24. Monitor performance, assign roles, and organize editorial staff efficiently.";
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
        "reporters, journalists, editorial staff, NewsBangla24, admin panel, staff management"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content =
        "reporters, journalists, editorial staff, NewsBangla24, admin panel, staff management";
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

  // Mock data for news portal reporters
  const reporters = [
    {
      id: 1,
      name: "আহমেদ হাসান",
      nameEn: "Ahmed Hasan",
      email: "ahmed.hasan@newsportal.com",
      phone: "+880 1712-345678",
      designation: "Senior Reporter",
      department: "Politics",
      status: "Active",
      articlesCount: 156,
      joinDate: "2022-03-15",
      lastActive: "2024-12-15T10:30:00",
      avatar: "/api/placeholder/40/40",
      location: "Dhaka",
      specialization: ["Politics", "Economics"],
    },
    {
      id: 2,
      name: "রহিমা খাতুন",
      nameEn: "Rahima Khatun",
      email: "rahima.khatun@newsportal.com",
      phone: "+880 1812-345678",
      designation: "Sports Reporter",
      department: "Sports",
      status: "Active",
      articlesCount: 89,
      joinDate: "2023-01-20",
      lastActive: "2024-12-15T08:15:00",
      avatar: "/api/placeholder/40/40",
      location: "Chittagong",
      specialization: ["Cricket", "Football"],
    },
    {
      id: 3,
      name: "করিম উদ্দিন",
      nameEn: "Karim Uddin",
      email: "karim.uddin@newsportal.com",
      phone: "+880 1912-345678",
      designation: "Tech Reporter",
      department: "Technology",
      status: "Inactive",
      articlesCount: 67,
      joinDate: "2023-06-10",
      lastActive: "2024-12-10T14:20:00",
      avatar: "/api/placeholder/40/40",
      location: "Sylhet",
      specialization: ["Technology", "Innovation"],
    },
  ];

  const filteredReporters = reporters.filter((reporter) => {
    const matchesSearch =
      reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporter.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporter.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === "all" || reporter.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <motion.div
        className="relative overflow-hidden bg-linear-to-r from-teal-600 via-teal-500 to-cyan-500 rounded p-8 text-white shadow"
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
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Reporter Management
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Manage reporters, journalists, and editorial staff
                </motion.p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link className="cursor-pointer" href="/dashboard/reporter/add">
                <motion.button className="flex items-center cursor-pointer space-x-3 bg-white text-teal-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Plus className="w-5 h-5" />
                  <span>Add Reporter</span>
                </motion.button>
              </Link>
              <motion.button className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Sparkles className="w-5 h-5" />
                <span>Import Staff</span>
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
        <motion.div className="bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
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
                Total Reporters
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                {reporters.length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
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
                Active
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                {reporters.filter((r) => r.status === "Active").length}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
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
                Total Articles
              </motion.p>
              <motion.p
                className="text-3xl font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                {reporters.reduce((sum, r) => sum + r.articlesCount, 0)}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400 rounded p-6 transition-all duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
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
                Top Performer
              </motion.p>
              <motion.p
                className="text-lg font-bold text-gray-900 mt-1"
                whileHover={{ scale: 1.1 }}
              >
                আহমেদ হাসান
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Reporters
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2.5 rounded font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-100 text-blue-700 px-4 py-2.5 rounded font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
              Export List
            </button>
          </div>
        </div>
      </div>

      {/* Reporters Table */}
      <motion.div
        className="bg-white rounded border border-gray-100 overflow-hidden transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredReporters.map((reporter, index) => (
                <motion.tr
                  key={reporter.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <motion.img
                        className="h-12 w-12 rounded-full border-2 border-gray-200"
                        src={reporter.avatar}
                        alt={reporter.name}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">
                          {reporter.name}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {reporter.designation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {reporter.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reporter.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {reporter.department}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reporter.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {reporter.articlesCount} articles
                    </div>
                    <div className="text-sm text-gray-500">
                      {reporter.specialization.slice(0, 2).join(", ")}
                      {reporter.specialization.length > 2 && "..."}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        reporter.status === "Active"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {reporter.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                    {new Date(reporter.lastActive).toLocaleDateString("bn-BD")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link href={`/dashboard/reporter/${reporter.id}`}>
                        <button
                          title="View Reporter"
                          className="p-2 text-blue-600 hover:text-blue-900 bg-blue-100 rounded-lg transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/dashboard/reporter/edit/${reporter.id}`}>
                        <button
                          title="Edit Reporter"
                          className="p-2 text-green-600 hover:text-green-900 bg-green-100 rounded-lg transition-all duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        title="Delete Reporter"
                        className="p-2 text-red-600 hover:text-red-900 bg-red-50 rounded-lg transition-all duration-200"
                        onClick={() =>
                          confirmDelete({
                            itemName: reporter.name,
                            itemType: "reporter",
                            additionalInfo: `${reporter.articlesCount} articles will be affected`,
                            onConfirm: async () => {
                              // Simulate API call
                              await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                              );
                              console.log("Deleting reporter:", reporter.id);
                            },
                          })
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
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
                    <Users className="w-7 h-7 text-red-600" />
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
                        <strong>HR Manager</strong> permissions to delete
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
