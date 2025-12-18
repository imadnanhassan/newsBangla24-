"use client";

import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  Video,
  Search,
  Grid,
  List,
  Download,
  Share2,
  Eye,
  Calendar,
  Upload,
  Play,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  size: string;
  views: number;
  usedIn: number;
  category: string;
}

const mockVideos: VideoItem[] = [
  {
    id: 1,
    title: "কৃষি উৎপাদন ভিডিও রিপোর্ট",
    thumbnail: "/api/placeholder/300/200",
    duration: "৩:২৪",
    uploadDate: "২০২৪-০১-১৩",
    size: "১৫.২ MB",
    views: 450,
    usedIn: 2,
    category: "কৃষি",
  },
  {
    id: 2,
    title: "সাক্ষাৎকার: মেয়র সাহেব",
    thumbnail: "/api/placeholder/300/200",
    duration: "৮:১৫",
    uploadDate: "২০২৪-০১-১০",
    size: "২৫.৭ MB",
    views: 320,
    usedIn: 1,
    category: "রাজনীতি",
  },
  {
    id: 3,
    title: "শিক্ষা মেলা কভারেজ",
    thumbnail: "/api/placeholder/300/200",
    duration: "৫:৪২",
    uploadDate: "২০২৪-০১-০৮",
    size: "১৮.৯ MB",
    views: 280,
    usedIn: 3,
    category: "শিক্ষা",
  },
];

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>(mockVideos);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (id: number) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <ReporterLayout title="ভিডিও লাইব্রেরি">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              ভিডিও লাইব্রেরি
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার আপলোড করা ভিডিও এবং তাদের ব্যবহার পরিসংখ্যান
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/media/upload"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              নতুন ভিডিও আপলোড
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Video className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ভিডিও</p>
                <p className="text-2xl font-bold text-gray-900">
                  {videos.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ভিউ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {videos.reduce((sum, video) => sum + video.views, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট দৈর্ঘ্য</p>
                <p className="text-2xl font-bold text-gray-900">১৭ মিনিট</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Share2 className="w-8 h-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">ব্যবহৃত</p>
                <p className="text-2xl font-bold text-gray-900">
                  {videos.reduce((sum, video) => sum + video.usedIn, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ভিডিও খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Videos */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className={`relative group border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                    selectedVideos.includes(video.id)
                      ? "ring-2 ring-red-500 border-red-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleSelection(video.id)}
                >
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => toggleSelection(video.id)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                        <Eye className="w-3 h-3 text-gray-600" />
                      </button>
                      <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                        <Download className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h4
                      className="text-sm font-medium text-gray-900 truncate mb-1"
                      title={video.title}
                    >
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.views} ভিউ</span>
                      <span>{video.usedIn} টি নিবন্ধে</span>
                    </div>
                    <div className="mt-1">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    selectedVideos.includes(video.id) ? "bg-red-50" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => toggleSelection(video.id)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />

                    <div className="flex-shrink-0 relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center rounded">
                        <Play className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {video.title}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{video.size}</span>
                        <span>{video.uploadDate}</span>
                        <span>{video.views} ভিউ</span>
                        <span>{video.usedIn} টি নিবন্ধে ব্যবহৃত</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {video.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && (
            <div className="p-12 text-center">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো ভিডিও পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ভিডিও খুঁজে পাওয়া যায়নি।"
                  : "আপনার ভিডিও লাইব্রেরিতে এখনও কোনো ভিডিও নেই।"}
              </p>
              <Link
                href="/reporter/media/upload"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                প্রথম ভিডিও আপলোড করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </ReporterLayout>
  );
}
