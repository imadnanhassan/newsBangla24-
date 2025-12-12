"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Article } from "@/types";

interface VideoModalProps {
  videos: Article[];
  isOpen: boolean;
  onClose: () => void;
  initialVideoIndex?: number;
}

export default function VideoModal({
  videos,
  isOpen,
  onClose,
  initialVideoIndex = 0,
}: VideoModalProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentVideoIndex(initialVideoIndex);
      setShowThumbnail(true);
    } else {
      document.body.style.overflow = "auto";
      setIsPlaying(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialVideoIndex]);

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[currentVideoIndex];

  const getVideoSource = (video: Article) => {
    // Priority: youtubeId > videoUrl > slug fallback
    if (video.youtubeId) {
      return `https://www.youtube.com/embed/${video.youtubeId}`;
    } else if (video.videoUrl) {
      // Check if it's a YouTube URL
      if (
        video.videoUrl.includes("youtube.com") ||
        video.videoUrl.includes("youtu.be")
      ) {
        const youtubeId = extractYouTubeId(video.videoUrl);
        return youtubeId
          ? `https://www.youtube.com/embed/${youtubeId}`
          : video.videoUrl;
      }
      return video.videoUrl;
    } else {
      // Fallback for demo purposes
      const fallbackIds = [
        "dQw4w9WgXcQ",
        "9bZkp7q19f0",
        "5qap5aO4i9A",
        "LjCzPp-MK48",
      ];
      return `https://www.youtube.com/embed/${
        fallbackIds[currentVideoIndex % fallbackIds.length]
      }`;
    }
  };

  const extractYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  const handleVideoClick = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  const handlePlayVideo = () => {
    setShowThumbnail(false);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4 animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-full max-w-7xl mx-auto h-[90vh] max-h-[800px]">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-red-500/30 flex flex-col md:flex-row h-full">
          {/* Video Player Section - 2/3 width */}
          <div className="md:w-2/3 bg-black relative flex flex-col">
            {/* Video Title and Info */}
            <div className="p-4 bg-black bg-opacity-80 border-b border-red-500/20">
              <h2 className="text-xl font-bold text-white line-clamp-2">
                {currentVideo.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="bg-red-600 text-white px-2 py-1 rounded">
                  {currentVideo.category.name}
                </span>
                <span className="text-gray-300">
                  {new Date(currentVideo.publishedAt || "").toLocaleDateString(
                    "bn-BD",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* Video Player/Thumbnail Area */}
            <div className="flex-1 relative">
              {showThumbnail ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="relative w-full h-full">
                    <Image
                      src={currentVideo.image || "/placeholder.png"}
                      alt={currentVideo.title}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                      <div className="text-center mb-4">
                        <p className="text-white text-lg font-semibold mb-2">
                          {currentVideo.title}
                        </p>
                        <p className="text-gray-300 text-sm line-clamp-2 max-w-md px-4">
                          {currentVideo.excerpt}
                        </p>
                      </div>
                      <button
                        onClick={handlePlayVideo}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all transform hover:scale-110"
                      >
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${getVideoSource(currentVideo)}?autoplay=${
                    isPlaying ? 1 : 0
                  }&rel=0&modestbranding=1&controls=1&showinfo=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                  onLoad={() => setIsPlaying(true)}
                />
              )}
            </div>

            {/* Video Navigation */}
            <div className="p-3 bg-black bg-opacity-80 border-t border-red-500/20 flex items-center justify-between">
              <button
                onClick={handlePrevVideo}
                disabled={videos.length <= 1}
                className="flex items-center gap-2 text-white hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>পূর্ববর্তী</span>
              </button>

              <span className="text-white font-medium">
                {currentVideoIndex + 1} of {videos.length}
              </span>

              <button
                onClick={handleNextVideo}
                disabled={videos.length <= 1}
                className="flex items-center gap-2 text-white hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>পরবর্তী</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Thumbnail Sidebar - 1/3 width */}
          <div className="md:w-1/3 bg-gray-800 overflow-y-auto border-l border-red-500/20">
            <div className="p-4 border-b border-red-500/20">
              <h3 className="text-white font-bold text-lg">আরও ভিডিও</h3>
            </div>

            <div className="space-y-2 p-2">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`cursor-pointer p-2 rounded transition-all ${
                    currentVideoIndex === index
                      ? "bg-red-600 bg-opacity-20 border-l-4 border-red-500"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleVideoClick(index)}
                >
                  <div className="flex gap-3">
                    <div className="relative aspect-video w-24 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={video.image || "/placeholder.png"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        {currentVideoIndex === index ? (
                          <div className="bg-red-600 rounded-full p-1.5">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="bg-white bg-opacity-20 rounded-full p-1.5">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-gray-400 text-xs line-clamp-1 mt-1">
                        {video.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs">
                          {video.category.name}
                        </span>
                        <span className="text-gray-400 text-xs">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
