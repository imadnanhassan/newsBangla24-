"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClientSession, SessionUser } from "@/lib/session";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  Award,
  FileText,
  Eye,
  MessageSquare,
  Star,
  Shield,
  Globe,
  Link as LinkIcon,
  TrendingUp,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  Settings,
} from "lucide-react";
import { ReporterLayout } from "@/components/reporter/layout";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  facebook: string;
  joinDate: string;
  avatar: string;
}

export default function ProfileClient() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    facebook: "",
    joinDate: "",
    avatar: "",
  });

  useEffect(() => {
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);

    if (sessionUser) {
      setProfile({
        name: sessionUser.name || "",
        email: sessionUser.email || "",
        phone: "+৮৮০১৭১২৩৪৫৬৭৮",
        bio: "অভিজ্ঞ সংবাদকর্মী যিনি রাজনীতি, অর্থনীতি এবং সামাজিক বিষয়ে লেখালেখি করেন। ১০ বছরের অভিজ্ঞতা রয়েছে সংবাদ জগতে।",
        location: "ঢাকা, বাংলাদেশ",
        website: "https://example.com",
        twitter: "@reporter_name",
        facebook: "facebook.com/reporter",
        joinDate: "২০২২-০৩-১৫",
        avatar: "/api/placeholder/150/150",
      });
    }
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your API
    console.log("Saving profile:", profile);
    setIsEditing(false);
    alert("প্রোফাইল আপডেট হয়েছে!");
  };

  const stats = [
    {
      title: "মোট নিবন্ধ",
      value: "৪৭",
      change: "+৫",
      changeType: "positive",
      icon: FileText,
      color: "bg-linear-to-br from-blue-400 via-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "মোট ভিউ",
      value: "১২৫K",
      change: "+১৫%",
      changeType: "positive",
      icon: Eye,
      color: "bg-linear-to-br from-emerald-400 via-green-500 to-green-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      title: "মোট মন্তব্য",
      value: "৮৯২",
      change: "+২৩%",
      changeType: "positive",
      icon: MessageSquare,
      color: "bg-linear-to-br from-purple-400 via-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "রেটিং",
      value: "৪.৮",
      change: "+০.২",
      changeType: "positive",
      icon: Star,
      color: "bg-linear-to-br from-yellow-400 via-orange-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      title: "প্রকাশিত",
      value: "৩২",
      change: "+৩",
      changeType: "positive",
      icon: CheckCircle,
      color: "bg-linear-to-br from-green-400 via-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "খসড়া",
      value: "১৫",
      change: "-২",
      changeType: "negative",
      icon: Clock,
      color: "bg-linear-to-br from-orange-400 via-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      title: "প্রত্যাখ্যাত",
      value: "০",
      change: "০",
      changeType: "neutral",
      icon: X,
      color: "bg-linear-to-br from-red-400 via-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "পেন্ডিং",
      value: "২",
      change: "+১",
      changeType: "positive",
      icon: Shield,
      color: "bg-linear-to-br from-cyan-400 via-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
    },
  ];

  const achievements = [
    {
      title: "সেরা রিপোর্টার",
      description: "মাসের সেরা রিপোর্টার পুরস্কার",
      date: "২০২৪-০১",
    },
    { title: "জনপ্রিয় লেখক", description: "১০০K+ ভিউ অর্জন", date: "২০২৩-১২" },
    {
      title: "নিয়মিত লেখক",
      description: "৫০+ নিবন্ধ প্রকাশ",
      date: "২০২৩-১১",
    },
  ];

  if (!user) {
    return (
      <ReporterLayout title="প্রোফাইল">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </ReporterLayout>
    );
  }

  return (
    <ReporterLayout title="আমার প্রোফাইল">
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Profile Banner & Header */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden mb-8">
            {/* Banner */}
            <div className="h-40 bg-linear-to-r from-blue-600 via-purple-600 to-blue-800 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              {/* Banner Edit Button */}
              <button className="absolute top-4 right-4 p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-200">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-8 -mt-20">
                <div className="relative group">
                  <img
                    src={profile.avatar || "/api/placeholder/150/150"}
                    alt={profile.name}
                    className="w-36 h-36 rounded-full border-4 border-white bg-white shadow-lg"
                  />
                  <button className="absolute bottom-3 right-3 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 transform hover:scale-110 shadow-md">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 mt-6 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        {profile.name}
                      </h1>
                      <p className="text-lg text-gray-600 mb-3">সংবাদকর্মী</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
                          <Calendar className="w-4 h-4" />
                          <span>যোগদান: {profile.joinDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-0">
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                        >
                          <Edit className="w-5 h-5 mr-2" />
                          প্রোফাইল সম্পাদনা
                        </button>
                      ) : (
                        <div className="flex space-x-3">
                          <button
                            onClick={handleSave}
                            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                          >
                            <Save className="w-5 h-5 mr-2" />
                            সংরক্ষণ
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md"
                          >
                            <X className="w-5 h-5 mr-2" />
                            বাতিল
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                প্রোফাইল ওভারভিউ
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                আপনার সাংবাদিকতা কর্মক্ষমতা পর্যবেক্ষণ করুন
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  প্রোফাইল সম্পাদনা
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all shadow-lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    সংরক্ষণ
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-all shadow-lg"
                  >
                    <X className="w-4 h-4 mr-2" />
                    বাতিল
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const bgClasses = [
                "bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400",
                "bg-linear-to-br from-emerald-200 to-emerald-300 hover:from-emerald-300 hover:to-emerald-400",
                "bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400",
                "bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400",
                "bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400",
                "bg-linear-to-br from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400",
                "bg-linear-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400",
                "bg-linear-to-br from-cyan-200 to-cyan-300 hover:from-cyan-300 hover:to-cyan-400",
              ];
              const iconBgs = [
                "bg-blue-500",
                "bg-emerald-500",
                "bg-purple-500",
                "bg-yellow-500",
                "bg-green-500",
                "bg-orange-500",
                "bg-red-500",
                "bg-cyan-500",
              ];

              return (
                <motion.div
                  key={index}
                  className={`${bgClasses[index]} rounded p-6 transition-all duration-300`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 ${iconBgs[index]} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="ml-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <motion.p
                        className="text-sm font-medium text-gray-600"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.title}
                      </motion.p>
                      <motion.p
                        className="text-3xl font-bold text-gray-900"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center mt-1">
                        <TrendingUp
                          className={`w-4 h-4 mr-1 ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : stat.changeType === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-bold ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : stat.changeType === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">
                          vs last week
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[
              {
                label: "সক্রিয় নিবন্ধ",
                value: "৩২",
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                label: "আজকের ভিউ",
                value: "২৪৫",
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                label: "মাসিক লক্ষ্য",
                value: "৮৫%",
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
              {
                label: "পুরস্কার",
                value: "৩",
                color: "text-yellow-600",
                bg: "bg-yellow-100",
              },
            ].map((stat, index) => {
              const colors = [
                {
                  bg: "bg-linear-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400",
                  iconBg: "bg-green-500",
                },
                {
                  bg: "bg-linear-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400",
                  iconBg: "bg-blue-500",
                },
                {
                  bg: "bg-linear-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400",
                  iconBg: "bg-purple-500",
                },
                {
                  bg: "bg-linear-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400",
                  iconBg: "bg-yellow-500",
                },
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <motion.div
                  key={index}
                  className={`rounded p-6 transition-all duration-300 ${colorScheme.bg}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 ${colorScheme.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="ml-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <motion.p
                        className="text-sm font-medium text-gray-600"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.label}
                      </motion.p>
                      <motion.p
                        className="text-xl sm:text-2xl font-bold text-gray-900 mt-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Profile Analytics */}
            <div className="lg:col-span-2 bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-bold">
                  প্রোফাইল অ্যানালিটিক্স
                </h3>
              </div>
              <div className="h-48 sm:h-64 flex items-end justify-between space-x-2">
                {[65, 78, 52, 89, 94, 76, 85].map((height, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-t-lg transition-all duration-300 cursor-pointer shadow-md"
                    initial={{ height: "0%" }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  ></motion.div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-4 font-medium">
                <span>সোম</span>
                <span>মঙ্গল</span>
                <span>বুধ</span>
                <span>বৃহস্পতি</span>
                <span>শুক্র</span>
                <span>শনি</span>
                <span>রবি</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                প্রোফাইল সারাংশ
              </h3>
              <div className="space-y-4">
                {[
                  {
                    type: "success",
                    message: "সকল প্রোফাইল তথ্য আপডেট হয়েছে",
                    time: "২ ঘণ্টা আগে",
                  },
                  {
                    type: "info",
                    message: "নতুন অর্জন যোগ হয়েছে",
                    time: "১ দিন আগে",
                  },
                  {
                    type: "warning",
                    message: "প্রোফাইল ছবি আপডেট করুন",
                    time: "৩ দিন আগে",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-gray-50 border-l-4"
                    style={{
                      borderLeftColor:
                        alert.type === "warning"
                          ? "#fbbf24"
                          : alert.type === "info"
                          ? "#60a5fa"
                          : "#34d399",
                    }}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories and Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Article Categories */}
            <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                নিবন্ধ ক্যাটাগরি
              </h3>
              <div className="space-y-4">
                {[
                  { name: "রাজনীতি", articles: 15, percentage: 32 },
                  { name: "অর্থনীতি", articles: 12, percentage: 26 },
                  { name: "খেলাধুলা", articles: 8, percentage: 17 },
                  { name: "প্রযুক্তি", articles: 6, percentage: 13 },
                  { name: "স্বাস্থ্য", articles: 4, percentage: 8 },
                  { name: "শিক্ষা", articles: 2, percentage: 4 },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">
                          {category.name}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {category.articles} নিবন্ধ
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded shadow border border-gray-100 p-6 sm:p-8 text-gray-900">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                কর্মক্ষমতা মেট্রিক্স
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    <span className="text-sm font-medium">গড় লোড টাইম</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">১.২স</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                    <span className="text-sm font-medium">পাঠক সন্তুষ্টি</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">৯৪%</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    <span className="text-sm font-medium">সার্ভার আপটাইম</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    ৯৯.৯%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <span className="text-sm font-medium">নিরাপত্তা স্কোর</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">A+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Profile Information */}
            <motion.div
              className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-8 flex items-center">
                <User className="w-6 h-6 mr-3 text-red-600" />
                ব্যক্তিগত তথ্য
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    নাম
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {profile.name}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ইমেইল
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {profile.email}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ফোন
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {profile.phone}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    অবস্থান
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {profile.location}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    বায়ো
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-900 leading-relaxed p-3 bg-gray-50 rounded-lg">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Social Links & Achievements */}
            <div className="space-y-8">
              {/* Social Links */}
              <motion.div
                className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-8 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-600" />
                  সামাজিক লিংক
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ওয়েবসাইট
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 font-medium transition-colors"
                        >
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      টুইটার
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.twitter}
                        onChange={(e) =>
                          handleInputChange("twitter", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <LinkIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900 font-medium">
                          {profile.twitter}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ফেসবুক
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.facebook}
                        onChange={(e) =>
                          handleInputChange("facebook", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <LinkIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900 font-medium">
                          {profile.facebook}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-8 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-yellow-600" />
                  অর্জনসমূহ
                </h3>

                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full inline-block">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Account Security */}
          <motion.div
            className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="w-6 h-6 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900">
                অ্যাকাউন্ট নিরাপত্তা
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  পাসওয়ার্ড
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  সর্বশেষ পরিবর্তন: ৩০ দিন আগে
                </p>
                <button className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors">
                  পাসওয়ার্ড পরিবর্তন করুন
                </button>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  দ্বি-ফ্যাক্টর অথেন্টিকেশন
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন
                </p>
                <button className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors">
                  সক্রিয় করুন
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link
              href="/reporter/articles/create"
              className="bg-linear-to-br from-green-400 via-emerald-500 to-teal-500 rounded shadow-lg p-4 sm:p-6 text-white hover:shadow transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    নতুন নিবন্ধ
                  </h4>
                  <p className="text-sm text-white/80">কনটেন্ট তৈরি করুন</p>
                </div>
              </div>
            </Link>

            <Link
              href="/reporter/analytics"
              className="bg-linear-to-br from-blue-400 via-blue-500 to-indigo-500 rounded shadow p-4 sm:p-6 text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    অ্যানালিটিক্স
                  </h4>
                  <p className="text-sm text-white/80">রিপোর্ট দেখুন</p>
                </div>
              </div>
            </Link>

            <Link
              href="/reporter/media/upload"
              className="bg-linear-to-br from-purple-400 via-violet-500 to-purple-600 rounded shadow p-4 sm:p-6 text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    মিডিয়া আপলোড
                  </h4>
                  <p className="text-sm text-white/80">ছবি/ভিডিও আপলোড</p>
                </div>
              </div>
            </Link>

            <Link
              href="/reporter/settings"
              className="bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded shadow p-4 sm:p-6 text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">সেটিংস</h4>
                  <p className="text-sm text-white/80">অ্যাকাউন্ট কনফিগার</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
