"use client";

import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  Image as ImageIcon,
  Search,
  Grid,
  List,
  Download,
  Share2,
  Eye,
  Calendar,
  Upload,
} from "lucide-react";
import Link from "next/link";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  uploadDate: string;
  size: string;
  usedIn: number;
  category: string;
}

const mockImages: GalleryImage[] = [
  {
    id: 1,
    src: "/api/placeholder/300/200",
    alt: "নির্বাচন-ভোটকেন্দ্র.jpg",
    uploadDate: "২০২৪-০১-১৫",
    size: "2.4 MB",
    usedIn: 3,
    category: "রাজনীতি",
  },
  {
    id: 2,
    src: "/api/placeholder/300/200",
    alt: "কৃষি-উৎপাদন.jpg",
    uploadDate: "২০২৪-০১-১৩",
    size: "1.8 MB",
    usedIn: 2,
    category: "কৃষি",
  },
  {
    id: 3,
    src: "/api/placeholder/300/200",
    alt: "স্বাস্থ্য-সেবা.jpg",
    uploadDate: "২০২৪-০১-১১",
    size: "3.1 MB",
    usedIn: 5,
    category: "স্বাস্থ্য",
  },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(mockImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const filteredImages = images.filter(
    (image) =>
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (id: number) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <ReporterLayout title="ইমেজ গ্যালারি">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ইমেজ গ্যালারি</h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার আপলোড করা ছবি এবং তাদের ব্যবহার পরিসংখ্যান
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/media/upload"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              নতুন আপলোড
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ছবি</p>
                <p className="text-2xl font-bold text-gray-900">
                  {images.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Download className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ডাউনলোড</p>
                <p className="text-2xl font-bold text-gray-900">১,২৩৪</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ভিউ</p>
                <p className="text-2xl font-bold text-gray-900">৫,৬৭৮</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Share2 className="w-8 h-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">ব্যবহৃত</p>
                <p className="text-2xl font-bold text-gray-900">
                  {images.reduce((sum, img) => sum + img.usedIn, 0)}
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
                placeholder="ছবি খুঁজুন..."
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

        {/* Gallery */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative group border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                    selectedImages.includes(image.id)
                      ? "ring-2 ring-red-500 border-red-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleSelection(image.id)}
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleSelection(image.id)}
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
                      className="text-sm font-medium text-gray-900 truncate"
                      title={image.alt}
                    >
                      {image.alt}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>{image.size}</span>
                      <span>{image.usedIn} টি নিবন্ধে</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    selectedImages.includes(image.id) ? "bg-red-50" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleSelection(image.id)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />

                    <div className="shrink-0">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {image.alt}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{image.size}</span>
                        <span>{image.uploadDate}</span>
                        <span>{image.usedIn} টি নিবন্ধে ব্যবহৃত</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {image.category}
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

          {filteredImages.length === 0 && (
            <div className="p-12 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো ছবি পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ছবি খুঁজে পাওয়া যায়নি।"
                  : "আপনার গ্যালারিতে এখনও কোনো ছবি নেই।"}
              </p>
              <Link
                href="/reporter/media/upload"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                প্রথম ছবি আপলোড করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </ReporterLayout>
  );
}
