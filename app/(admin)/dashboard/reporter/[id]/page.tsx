"use client";

"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Eye,
  Clock,
  Tag,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

export default function SingleReporterPage({
  params,
}: {
  params: { id: string };
}) {
  const [loading, setLoading] = useState(true);

  // SEO optimization and loading
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);

    // SEO optimization (only run on client side)
    if (typeof window !== "undefined") {
      document.title = "Reporter Details - NewsBangla24 Admin";
    }

    return () => clearTimeout(timer);
  }, []);
  // Mock data - in a real app, this would come from an API or database
  const reporters = [
    {
      id: "1",
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
      avatar: "/api/placeholder/150/150",
      location: "Dhaka",
      specialization: ["Politics", "Economics"],
      bio: "Experienced senior reporter specializing in political affairs and economic analysis. Has covered major political events and economic policy changes for over 5 years.",
      performance: {
        monthlyArticles: 12,
        averageViews: 15420,
        rating: 4.8,
        awards: 3,
      },
    },
    {
      id: "2",
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
      avatar: "/api/placeholder/150/150",
      location: "Chittagong",
      specialization: ["Cricket", "Football"],
      bio: "Passionate sports journalist covering cricket and football. Known for in-depth match analysis and player interviews.",
      performance: {
        monthlyArticles: 8,
        averageViews: 8750,
        rating: 4.6,
        awards: 1,
      },
    },
  ];

  const reporter = reporters.find((r) => r.id === params.id);

  if (!reporter) {
    notFound();
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                  Reporter Details
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {reporter.name} - Professional Profile
                </motion.p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                className="cursor-pointer"
                href={`/dashboard/reporter/edit/${reporter.id}`}
              >
                <motion.button className="flex items-center cursor-pointer space-x-3 bg-white text-teal-600 px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Edit className="w-5 h-5" />
                  <span>Edit Reporter</span>
                </motion.button>
              </Link>
              <Link className="cursor-pointer" href="/dashboard/reporter">
                <motion.button className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to List</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </motion.div>

      <motion.div
        className="bg-white rounded border border-gray-100 p-6 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{reporter.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(reporter.joinDate).toLocaleDateString("bn-BD")}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last active{" "}
                {new Date(reporter.lastActive).toLocaleDateString("bn-BD")}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  reporter.status === "Active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {reporter.status}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                {reporter.designation}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                {reporter.department}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Users className="w-6 h-6 mr-3 text-teal-600" />
              Professional Profile
            </motion.h3>
            <div className="flex items-start space-x-6">
              <motion.img
                src={reporter.avatar}
                alt={reporter.name}
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {reporter.nameEn}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {reporter.bio}
                </p>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Email Address
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {reporter.email}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Phone Number
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {reporter.phone}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {reporter.location}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Briefcase className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Department
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {reporter.department}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Specialization */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Tag className="w-6 h-6 mr-3 text-orange-600" />
              Areas of Specialization
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {reporter.specialization.map((spec, index) => (
                <motion.span
                  key={index}
                  className="bg-linear-to-r from-teal-100 to-teal-200 text-teal-800 px-4 py-2 rounded-full text-sm font-bold border border-teal-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {spec}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
              Performance Overview
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                className="text-center p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {reporter.performance.monthlyArticles}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Monthly Articles
                </div>
              </motion.div>
              <motion.div
                className="text-center p-6 bg-linear-to-br from-green-50 to-green-100 rounded-xl border border-green-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {reporter.performance.averageViews.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Avg. Views
                </div>
              </motion.div>
              <motion.div
                className="text-center p-6 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {reporter.performance.rating}
                </div>
                <div className="text-sm text-gray-600 font-medium">Rating</div>
              </motion.div>
              <motion.div
                className="text-center p-6 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {reporter.performance.awards}
                </div>
                <div className="text-sm text-gray-600 font-medium">Awards</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <TrendingUp className="w-6 h-6 mr-3 text-teal-600" />
              Quick Stats
            </motion.h3>
            <div className="space-y-6">
              <motion.div
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-gray-600 font-medium">
                  Total Articles
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {reporter.articlesCount}
                </span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-gray-600 font-medium">Join Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(reporter.joinDate).toLocaleDateString("bn-BD")}
                </span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-gray-600 font-medium">Experience</span>
                <span className="font-medium text-gray-900">
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(reporter.joinDate).getTime()) /
                      (1000 * 60 * 60 * 24 * 365)
                  )}{" "}
                  years
                </span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-gray-600 font-medium">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    reporter.status === "Active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {reporter.status}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <Clock className="w-6 h-6 mr-3 text-blue-600" />
              Recent Activity
            </motion.h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Published new article
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Updated profile information
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Attended editorial meeting
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-8 shadow transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <FileText className="w-6 h-6 mr-3 text-green-600" />
              Actions
            </motion.h3>
            <div className="space-y-4">
              <Link
                href={`/dashboard/reporter/edit/${reporter.id}`}
                className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </Link>
              <motion.button
                className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5 mr-2" />
                View Articles
              </motion.button>
              <motion.button
                className="w-full bg-blue-100 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
