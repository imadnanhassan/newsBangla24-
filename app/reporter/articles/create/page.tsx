"use client";

import { useState, useRef } from "react";
import { ReporterLayout } from "@/components/reporter/layout";
import SimpleTextEditor from "@/components/SimpleTextEditor";
import { motion } from "framer-motion";
import {
  Save,
  Send,
  Image as ImageIcon,
  X,
  Tag,
  FileText,
  Eye,
  Upload,
  Plus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface ArticleForm {
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: File | null;
  status: "draft" | "published";
}

const categories = [
  "রাজনীতি",
  "অর্থনীতি",
  "খেলাধুলা",
  "প্রযুক্তি",
  "স্বাস্থ্য",
  "শিক্ষা",
  "বিনোদন",
  "কৃষি",
  "পরিবেশ",
  "আন্তর্জাতিক",
];

export default function CreateArticlePage() {
  const [formData, setFormData] = useState<ArticleForm>({
    title: "",
    subtitle: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    featuredImage: null,
    status: "draft",
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ArticleForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const getWordCount = (html: string) => {
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text ? text.split(/\s+/).length : 0;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "শিরোনাম আবশ্যক";
    if (!formData.content.trim() || formData.content === "<p><br></p>")
      newErrors.content = "বিষয়বস্তু আবশ্যক";
    if (!formData.category) newErrors.category = "বিভাগ আবশ্যক";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (file: File) => {
    // Simulate image upload
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!validateForm()) {
      alert("অনুগ্রহ করে সমস্ত আবশ্যক ক্ষেত্র পূরণ করুন");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      handleInputChange("status", status);
      alert(
        status === "published"
          ? "নিবন্ধ প্রকাশিত হয়েছে!"
          : "খসড়া সংরক্ষিত হয়েছে!"
      );
    } catch (error) {
      alert("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title.trim() && formData.content.trim() && formData.category;

  return (
    <ReporterLayout title="নতুন নিবন্ধ তৈরি">
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          className="relative overflow-hidden bg-linear-to-r from-red-500 via-red-600 to-red-700 rounded p-8 text-white shadow"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="p-3 bg-white/20 backdrop-blur-sm rounded shadow"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FileText className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    নতুন নিবন্ধ তৈরি
                  </motion.h1>
                  <motion.p
                    className="text-white/90 mt-2 text-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    আপনার চিন্তাভাবনা এবং সংবাদ শেয়ার করুন
                  </motion.p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <motion.button
                  onClick={() => handleSubmit("draft")}
                  className="flex items-center space-x-3 cursor-pointer bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded font-medium transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <Save className="w-5 h-5" />
                  <span>খসড়া সংরক্ষণ</span>
                </motion.button>
                <motion.button
                  onClick={() => handleSubmit("published")}
                  className="flex items-center space-x-3 bg-white text-red-600 px-6 py-3 rounded cursor-pointer font-bold transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                  <span>প্রকাশ করুন</span>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Article Content */}
            <motion.div
              className="bg-white rounded border border-gray-200 p-8 shadow"
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
                <FileText className="w-6 h-6 mr-3 text-red-600" />
                নিবন্ধের বিষয়বস্তু
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    শিরোনাম *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="আকর্ষণীয় শিরোনাম লিখুন..."
                    className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
                      errors.title
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.title && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {errors.title}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    উপ-শিরোনাম
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                    placeholder="নিবন্ধের উপ-শিরোনাম..."
                    className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-md font-normal placeholder-gray-400"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      বিষয়বস্তু *
                    </label>
                    <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded">
                      {getWordCount(formData.content)} শব্দ
                    </span>
                  </div>
                  <SimpleTextEditor
                    value={formData.content}
                    onChange={(content) =>
                      handleInputChange("content", content)
                    }
                    placeholder="আপনার নিবন্ধের বিষয়বস্তু লিখুন..."
                    className="border-0"
                    error={!!errors.content}
                    onImageUpload={handleImageUpload}
                  />
                  <div className="mt-3 flex items-center text-xs text-gray-500 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
                    <ImageIcon className="w-4 h-4 mr-2 text-red-600" />
                    <span className="font-medium">
                      টুলবারের আপলোড বাটন (📤) ক্লিক করে বা সরাসরি ছবি পেস্ট
                      করুন (Ctrl+V)
                    </span>
                  </div>
                  {errors.content && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {errors.content}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    সারাংশ
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="নিবন্ধের সংক্ষিপ্ত বিবরণ..."
                    rows={4}
                    className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-md font-normal placeholder-gray-400"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              className="bg-white rounded border border-gray-200 p-8 shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <ImageIcon className="w-6 h-6 mr-3 text-green-600" />
                ফিচার্ড ইমেজ
              </motion.h3>

              <div className="space-y-6">
                {formData.featuredImage ? (
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <img
                      src={URL.createObjectURL(formData.featuredImage)}
                      alt="Featured"
                      className="w-full h-64 object-cover rounded border border-gray-200 shadow-lg"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded flex items-center justify-center">
                      <div className="flex space-x-4">
                        <motion.button
                          onClick={() =>
                            handleInputChange("featuredImage", null)
                          }
                          className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="ইমেজ রিমুভ করুন"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="ইমেজ রিপ্লেস করুন"
                        >
                          <Upload className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded text-sm font-medium border border-white/20">
                      {(formData.featuredImage.size / 1024 / 1024).toFixed(2)}{" "}
                      MB
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded p-12 text-center cursor-pointer hover:border-red-500 hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 transition-all duration-300 group"
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mx-auto mb-6 group-hover:bg-red-100 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </motion.div>
                    <p className="text-gray-600 group-hover:text-red-600 transition-colors text-lg font-medium mb-2">
                      ফিচার্ড ইমেজ যোগ করুন
                    </p>
                    <p className="text-sm text-gray-400 mb-1">
                      PNG, JPG, WebP up to 5MB
                    </p>
                    <p className="text-xs text-gray-400">
                      সেরা রেজাল্টের জন্য 1200x630px রেকমেন্ডেড
                    </p>
                  </motion.div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleInputChange("featuredImage", file);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Classification */}
            <motion.div
              className="bg-white rounded border border-gray-200 p-8 shadow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.1, duration: 0.5 }}
              >
                <Tag className="w-6 h-6 mr-3 text-green-600" />
                শ্রেণীবিভাগ
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    বিভাগ *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-md font-normal placeholder-gray-400"
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="bg-white rounded border border-gray-200 p-8 shadow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.7, duration: 0.5 }}
              >
                <Tag className="w-6 h-6 mr-3 text-orange-600" />
                ট্যাগ
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  className="flex space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 0.5 }}
                >
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="ট্যাগ যোগ করুন..."
                    className="flex-1 w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-md font-normal placeholder-gray-400"
                  />
                  <motion.button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all duration-300 border border-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.9, duration: 0.5 }}
                >
                  {formData.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="inline-flex items-center px-4 py-2 bg-linear-to-r from-orange-100 to-orange-200 text-orange-800 rounded-full text-sm font-medium border border-orange-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                    >
                      {tag}
                      <motion.button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-3 text-orange-600 hover:text-orange-800 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Preview */}
            <motion.div
              className="bg-white rounded border border-gray-200 p-8 shadow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.0, duration: 0.6 }}
            >
              <motion.div
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.1, duration: 0.5 }}
              >
                <Eye className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">প্রিভিউ</h3>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2, duration: 0.5 }}
                >
                  <span className="text-sm font-semibold text-gray-600">
                    শিরোনাম:
                  </span>
                  <span className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {formData.title || "শিরোনাম যোগ করুন"}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.3, duration: 0.5 }}
                >
                  <span className="text-sm font-semibold text-gray-600">
                    বিভাগ:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formData.category || "বিভাগ নির্বাচন করুন"}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.4, duration: 0.5 }}
                >
                  <span className="text-sm font-semibold text-gray-600">
                    শব্দ সংখ্যা:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {getWordCount(formData.content)}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 0.5 }}
                >
                  <span className="text-sm font-semibold text-gray-600">
                    ট্যাগ:
                  </span>
                  <span className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {formData.tags.length > 0
                      ? formData.tags.join(", ")
                      : "কোনো ট্যাগ নেই"}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
