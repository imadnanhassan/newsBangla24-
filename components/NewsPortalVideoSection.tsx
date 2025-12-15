"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";
import VideoModal from "./VideoModal";

export default function NewsPortalVideoSection({
  videos,
  title = "ভিডিও",
}: {
  videos: any[];
  title?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  if (videos.length === 0) return null;

  const openVideoModal = (index: number) => {
    setSelectedVideoIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header with Prothom Alo Style */}
        <div className="flex justify-between items-center mb-6 border-b border-red-600 pb-3">
          <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            {title}
          </h2>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <span>সব ভিডিও</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Main Featured Video - Prothom Alo Style */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Video */}
            <div className="lg:col-span-1">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-red-600/20">
                <Image
                  src={videos[0].image_url || "/placeholder.png"}
                  alt={videos[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
                      ফিচার্ড ভিডিও
                    </span>
                    <span className="text-white text-sm">
                      {new Date(videos[0].publishedAt || "").toLocaleDateString(
                        "bn-BD",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold line-clamp-2 mb-2">
                    {videos[0].title}
                  </h3>
                  <p className="text-white text-sm line-clamp-2 mb-4">
                    {videos[0].excerpt}
                  </p>
                  <button
                    onClick={() => openVideoModal(0)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-fit"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>ভিডিও দেখুন</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Side Videos List */}
            <div className="lg:col-span-1 space-y-4">
              {videos.slice(1, 4).map((video, index) => (
                <div
                  key={video.id}
                  className="flex gap-3 border-b border-gray-200 pb-4 cursor-pointer group"
                  onClick={() => openVideoModal(index + 1)}
                >
                  <div className="relative aspect-video w-32 shrink-0 rounded overflow-hidden">
                    <Image
                      src={video.image_url || "/placeholder.png"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-2">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-800 font-semibold text-sm line-clamp-2 mb-1 group-hover:text-red-600">
                      {video.title}
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                      {video.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        {video.category.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(video.publishedAt || "").toLocaleDateString(
                          "bn-BD",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid - Prothom Alo Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.slice(4, 8).map((video, index) => (
            <div
              key={video.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => openVideoModal(index + 4)}
            >
              <div className="relative aspect-video bg-gray-200">
                <Image
                  src={video.image_url || "/placeholder.png"}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-gray-800 font-semibold text-sm line-clamp-2 mb-2 group-hover:text-red-600">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                    {video.category.name}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(video.publishedAt || "").toLocaleDateString(
                      "bn-BD",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        <VideoModal
          videos={videos}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialVideoIndex={selectedVideoIndex}
        />
      </div>
    </section>
  );
}
