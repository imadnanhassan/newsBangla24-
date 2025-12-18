"use client";

import { useState } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import {
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import Link from "next/link";

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  id: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadType, setUploadType] = useState<"image" | "video" | "document">(
    "image"
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter((file) => {
      if (uploadType === "image") return file.type.startsWith("image/");
      if (uploadType === "video") return file.type.startsWith("video/");
      return (
        file.type === "application/pdf" ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")
      );
    });

    const newFiles: UploadFile[] = validFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      progress: 0,
      status: "uploading",
      id: Math.random().toString(36).substr(2, 9),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id);
    });
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "completed" } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return ImageIcon;
    if (file.type.startsWith("video/")) return Video;
    return FileText;
  };

  const getAcceptType = () => {
    switch (uploadType) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "document":
        return ".pdf,.doc,.docx";
      default:
        return "*";
    }
  };

  return (
    <ReporterLayout title="মিডিয়া আপলোড">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">মিডিয়া আপলোড</h2>
            <p className="mt-1 text-sm text-gray-600">
              ছবি, ভিডিও এবং ডকুমেন্ট আপলোড করে আপনার নিবন্ধে ব্যবহার করুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/media"
              className="inline-flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              মিডিয়া লাইব্রেরি
            </Link>
          </div>
        </div>

        {/* Upload Type Selector */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            আপলোডের ধরন নির্বাচন করুন
          </h3>
          <div className="flex space-x-4">
            {[
              { type: "image", label: "ছবি", icon: ImageIcon },
              { type: "video", label: "ভিডিও", icon: Video },
              { type: "document", label: "ডকুমেন্ট", icon: FileText },
            ].map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setUploadType(type as any)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  uploadType === type
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg border">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-red-400 bg-red-50"
                : "border-gray-300 hover:border-red-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept={getAcceptType()}
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="flex flex-col items-center">
              <Upload
                className={`w-12 h-12 mb-4 ${
                  dragActive ? "text-red-500" : "text-gray-400"
                }`}
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {uploadType === "image"
                  ? "ছবি"
                  : uploadType === "video"
                  ? "ভিডিও"
                  : "ডকুমেন্ট"}{" "}
                আপলোড করুন
              </h3>
              <p className="text-gray-600 mb-4">
                ড্র্যাগ এন্ড ড্রপ করুন অথবা ক্লিক করে ফাইল নির্বাচন করুন
              </p>
              <div className="text-sm text-gray-500">
                <p>সর্বোচ্চ ফাইল সাইজ: ১০ MB</p>
                <p>
                  সাপোর্টেড ফরম্যাট:{" "}
                  {uploadType === "image"
                    ? "JPG, PNG, GIF"
                    : uploadType === "video"
                    ? "MP4, AVI, MOV"
                    : "PDF, DOC, DOCX"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              আপলোড প্রগ্রেস
            </h3>
            <div className="space-y-4">
              {files.map((uploadFile) => {
                const IconComponent = getFileIcon(uploadFile.file);
                return (
                  <div
                    key={uploadFile.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0">
                      {uploadFile.preview ? (
                        <img
                          src={uploadFile.preview}
                          alt={uploadFile.file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {uploadFile.file.name}
                        </p>
                        <span className="text-sm text-gray-500">
                          {(uploadFile.file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {uploadFile.progress.toFixed(0)}% সম্পন্ন
                        </span>
                        <div className="flex items-center space-x-2">
                          {uploadFile.status === "completed" && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          {uploadFile.status === "error" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          {uploadFile.status === "uploading" && (
                            <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                          )}
                          <button
                            onClick={() => removeFile(uploadFile.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Guidelines */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            আপলোড গাইডলাইন
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">ছবির জন্য</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• সর্বনিম্ন রেজোলিউশন: ১২০০x৮০০ পিক্সেল</li>
                <li>• ফরম্যাট: JPG, PNG (স্বচ্ছ ব্যাকগ্রাউন্ডের জন্য)</li>
                <li>• ফাইল সাইজ: সর্বোচ্চ ৫ MB</li>
                <li>• অ্যাসপেক্ট রেশিও: ১৬:৯</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">ভিডিওর জন্য</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• সর্বোচ্চ দৈর্ঘ্য: ৫ মিনিট</li>
                <li>• ফরম্যাট: MP4, AVI</li>
                <li>• ফাইল সাইজ: সর্বোচ্চ ১০ MB</li>
                <li>• রেজোলিউশন: ১৯২০x১০৮০</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
