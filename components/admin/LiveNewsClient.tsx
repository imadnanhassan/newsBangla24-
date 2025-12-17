"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Rss,
  Radio,
  Users,
  Eye,
  Play,
  Pause,
  Settings,
  Sparkles,
  Square,
} from "lucide-react";

type LiveFeed = {
  id: number;
  title: string;
  description: string;
  status: "live" | "scheduled" | "ended";
  viewers: number;
  duration?: string;
  scheduledTime?: string;
  thumbnail: string;
  isStreaming: boolean;
};

const LiveNewsClient = () => {
  const [liveFeeds, setLiveFeeds] = useState<LiveFeed[]>([
    {
      id: 1,
      title: "Parliament Session Live",
      description: "Live coverage of today's parliamentary proceedings",
      status: "live",
      viewers: 1250,
      duration: "02:45:30",
      thumbnail: "/api/placeholder/300/200",
      isStreaming: true,
    },
    {
      id: 2,
      title: "Economic Summit 2024",
      description: "International economic summit with world leaders",
      status: "scheduled",
      viewers: 0,
      scheduledTime: "15:00",
      thumbnail: "/api/placeholder/300/200",
      isStreaming: false,
    },
    {
      id: 3,
      title: "Sports Championship Final",
      description: "Live coverage of the championship final match",
      status: "ended",
      viewers: 5420,
      duration: "03:20:15",
      thumbnail: "/api/placeholder/300/200",
      isStreaming: false,
    },
  ]);

  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [streamTitle, setStreamTitle] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [showStreamModal, setShowStreamModal] = useState(false);

  // Simulate live stream timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveStreaming) {
      interval = setInterval(() => {
        setLiveFeeds((prev) =>
          prev.map((feed) =>
            feed.isStreaming && feed.duration
              ? {
                  ...feed,
                  duration: incrementDuration(feed.duration),
                }
              : feed
          )
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const incrementDuration = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
    const newHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;
  };

  const startLiveStream = () => {
    if (!streamTitle.trim()) return;

    const newStream = {
      id: Date.now(),
      title: streamTitle,
      description: streamDescription || "Live streaming in progress",
      status: "live" as const,
      viewers: 0,
      duration: "00:00:00",
      thumbnail: "/api/placeholder/300/200",
      isStreaming: true,
    };

    setLiveFeeds((prev) => [newStream, ...prev]);
    setIsLiveStreaming(true);
    setShowStreamModal(false);
    setStreamTitle("");
    setStreamDescription("");
  };

  const stopLiveStream = (id: number) => {
    setLiveFeeds((prev) =>
      prev.map((feed) =>
        feed.id === id
          ? { ...feed, status: "ended" as const, isStreaming: false }
          : feed
      )
    );
    setIsLiveStreaming(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ended":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <Radio className="w-4 h-4 text-red-600 animate-pulse" />;
      case "scheduled":
        return <Play className="w-4 h-4 text-blue-600" />;
      case "ended":
        return <Pause className="w-4 h-4 text-gray-600" />;
      default:
        return <Pause className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Enhanced Header */}
      <motion.div
        className="relative overflow-hidden bg-linear-to-r from-red-600 via-red-500 to-orange-500 rounded p-8 text-white shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-4 bg-white/20 backdrop-blur-sm rounded shadow"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Rss className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Live News
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Manage live streams and real-time coverage
                </motion.p>
              </div>
            </div>
            <motion.button
              className="flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded font-bold border-2 border-white/20 transition-all duration-300"
              onClick={() => setShowStreamModal(true)}
            >
              <Radio className="w-5 h-5" />
              <span>Start Live Stream</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </motion.button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Live Now",
            value: "1",
            icon: Radio,
            color: "red",
            delay: 0.1,
          },
          {
            label: "Total Viewers",
            value: "6.7K",
            icon: Users,
            color: "blue",
            delay: 0.2,
          },
          {
            label: "Scheduled",
            value: "3",
            icon: Play,
            color: "green",
            delay: 0.3,
          },
          {
            label: "Peak Viewers",
            value: "12.3K",
            icon: Eye,
            color: "purple",
            delay: 0.4,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`p-6 rounded  transition-all duration-300 bg-linear-to-br ${
              stat.color === "red"
                ? "from-red-50 to-red-100"
                : stat.color === "blue"
                ? "from-blue-50 to-blue-100"
                : stat.color === "green"
                ? "from-green-50 to-green-100"
                : "from-purple-50 to-purple-100"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay, duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.p
                  className="text-sm text-gray-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: stat.delay + 0.2 }}
                >
                  {stat.label}
                </motion.p>
                <motion.p
                  className="text-3xl font-bold text-gray-900 mt-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: stat.delay + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.p>
              </div>
              <div
                className={`p-4 bg-${stat.color}-100 rounded border border-${stat.color}-200`}
              >
                <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Live Feeds Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {liveFeeds.map((feed, index) => (
          <motion.div
            key={feed.id}
            className="bg-white rounder overflow-hidden transition-all duration-300 group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-video bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center border-b border-gray-200">
                <Play className="w-16 h-16 text-gray-400" />
              </div>
              <motion.div
                className="absolute top-4 left-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span
                  className={`flex items-center space-x-2 px-3 py-2 text-[11px] font-bold rounded-full border-2 backdrop-blur-sm ${getStatusColor(
                    feed.status
                  )}`}
                >
                  {getStatusIcon(feed.status)}
                  <span className="capitalize">{feed.status}</span>
                </span>
              </motion.div>
              {feed.status === "live" && (
                <motion.div
                  className="absolute top-4 right-4 flex items-center space-x-2 bg-black/80 text-white px-3 py-2 rounded-full text-[12px] backdrop-blur-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Users className="w-4 h-4" />
                  <span>{feed.viewers.toLocaleString()}</span>
                </motion.div>
              )}
            </div>
            <div className="p-6">
              <motion.h3
                className="font-bold text-xl text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {feed.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {feed.description}
              </motion.p>
              <div className="flex items-center justify-between">
                <motion.div
                  className="text-sm text-gray-500 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  {feed.status === "live" && (
                    <span>Duration: {feed.duration}</span>
                  )}
                  {feed.status === "scheduled" && (
                    <span>Starts: {feed.scheduledTime}</span>
                  )}
                  {feed.status === "ended" && (
                    <span>Duration: {feed.duration}</span>
                  )}
                </motion.div>
                <div className="flex space-x-2">
                  {feed.status === "live" && feed.isStreaming && (
                    <button
                      onClick={() => stopLiveStream(feed.id)}
                      className="p-3 text-red-600 rounded border border-red-200 hover:bg-red-50 transition-colors"
                      title="Stop Stream"
                    >
                      <Square className="w-5 h-5" />
                    </button>
                  )}
                  <button className="p-3 text-gray-400 rounded border border-gray-200">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Quick Actions */}
      <motion.div
        className="bg-white rounded  p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-500 mr-3 animate-pulse" />
          Quick Actions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Radio,
              label: "Start Emergency Broadcast",
              color: "red",
              delay: 1,
            },
            {
              icon: Play,
              label: "Schedule Live Event",
              color: "blue",
              delay: 1.1,
            },
            {
              icon: Settings,
              label: "Stream Settings",
              color: "gray",
              delay: 1.2,
            },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              className="flex items-center space-x-4 p-6 border border-gray-200 rounded transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: action.delay, duration: 0.5 }}
            >
              <div
                className={`p-3 bg-${action.color}-100 rounded border border-${action.color}-200`}
              >
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <span className="font-semibold text-gray-900">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Live Stream Modal */}
      {showStreamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Start Live Stream
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stream Title
                </label>
                <input
                  type="text"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:border-red-500 focus:outline-none"
                  placeholder="Enter stream title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={streamDescription}
                  onChange={(e) => setStreamDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:border-red-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Enter stream description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowStreamModal(false)}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={startLiveStream}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded font-medium border border-red-600 hover:bg-red-700 transition-colors"
              >
                Start Stream
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LiveNewsClient;
