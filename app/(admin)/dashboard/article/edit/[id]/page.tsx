"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  Calendar,
  Tag,
  User,
  Globe,
  Clock,
  FileText,
  X,
  Plus,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import SimpleTextEditor from "@/components/SimpleTextEditor";
import {
  uploadImage,
  validateImageFile,
  compressImage,
} from "@/lib/imageUpload";

// Type definitions
interface FormData {
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  status: string;
  publishDate: string;
  featuredImage: File | null;
  gallery: File[];
  seoTitle: string;
  seoDescription: string;
  priority: string;
  featured: boolean;
}

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    author: "",
    status: "draft",
    publishDate: "",
    featuredImage: null,
    gallery: [],
    seoTitle: "",
    seoDescription: "",
    priority: "medium",
    featured: false,
  });

  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Helper function to count words in HTML content
  const getWordCount = (html: string) => {
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text ? text.split(/\s+/).length : 0;
  };

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim() || formData.content === "<p><br></p>")
      newErrors.content = "Content is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.author) newErrors.author = "Author is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const categories = [
    "Politics",
    "Sports",
    "Technology",
    "Business",
    "Entertainment",
    "Health",
    "Education",
    "International",
    "National",
    "Local",
  ];

  const authors = [
    "আহমেদ হাসান",
    "রহিমা খাতুন",
    "করিম উদ্দিন",
    "ফাতেমা বেগম",
    "মোহাম্মদ আলী",
  ];

  // Image upload handler for editor with validation and compression
  const handleEditorImageUpload = async (file: File): Promise<string> => {
    try {
      // Validate the image file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Compress image if it's too large
      let processedFile = file;
      if (file.size > 1024 * 1024) {
        // If larger than 1MB, compress
        processedFile = await compressImage(file, 1200, 0.8);
      }

      // Upload to server
      const imageUrl = await uploadImage(processedFile);
      return imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      // Fallback: create local URL for preview
      return URL.createObjectURL(file);
    }
  };

  // Mock data loading - replace with actual API call
  useEffect(() => {
    const loadArticle = async () => {
      // Simulate API call
      setTimeout(() => {
        setFormData({
          title: "Breaking: Prime Minister Announces New Economic Policy",
          subtitle: "Comprehensive reforms aimed at boosting economic growth",
          content:
            "<p>This is the article content loaded from the database...</p>",
          excerpt: "A brief summary of the economic policy announcement.",
          category: "Politics",
          tags: ["politics", "economy", "government"],
          author: "আহমেদ হাসান",
          status: "published",
          publishDate: "2024-12-15T10:30",
          featuredImage: null,
          gallery: [],
          seoTitle: "PM Announces New Economic Policy - Breaking News",
          seoDescription:
            "Latest updates on the new economic policy announced by the Prime Minister.",
          priority: "high",
          featured: true,
        });
        setLoading(false);
      }, 1000);
    };

    loadArticle();
  }, [articleId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "featured" | "gallery"
  ) => {
    const files = Array.from(event.target.files || []) as File[];
    if (type === "featured" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: files[0],
      }));
    } else if (type === "gallery") {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...files],
      }));
    }
  };

  const handleSubmit = (status: string) => {
    if (!validateForm()) {
      alert("Please fill in all required fields");
      return;
    }

    const articleData = {
      ...formData,
      status,
      updatedAt: new Date().toISOString(),
    };

    console.log("Updated Article Data:", articleData);
    // Here you would typically send the data to your API
    alert(
      `Article ${
        status === "published" ? "updated and published" : "updated"
      } successfully!`
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <motion.div
        className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 rounded p-8 text-white shadow"
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
                  Edit Article
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Update and manage your news article
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <motion.button
                onClick={() => handleSubmit("draft")}
                className="flex items-center space-x-3 cursor-pointer bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded font-medium  transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </motion.button>
              <motion.button
                onClick={() => handleSubmit("published")}
                className="flex items-center space-x-3 bg-white text-blue-600 px-6 py-3 rounded cursor-pointer font-bold  transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
                <span>Update & Publish</span>
              </motion.button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="/dashboard/article"
          className="flex items-center space-x-3 px-4 py-2  text-gray-700 rounded hover:bg-gray-50 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Articles</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            className="bg-white rounded  p-8 shadow"
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
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Article Content
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter article title..."
                  className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400 ${
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
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                  placeholder="Enter article subtitle..."
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Content *
                  </label>
                  <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded">
                    {getWordCount(formData.content)} words
                  </span>
                </div>
                <SimpleTextEditor
                  value={formData.content}
                  onChange={(content) => handleInputChange("content", content)}
                  placeholder="Write your article content here..."
                  className=" overflow-hidden w-full py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                  error={!!errors.content}
                  onImageUpload={handleEditorImageUpload}
                />
                <div className="mt-3 flex items-center text-xs text-gray-500 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                  <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium">
                    Tip: Click the upload button (📤) in the toolbar or paste
                    images directly (Ctrl+V)
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
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Brief summary of the article..."
                  rows={4}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="bg-white rounded border border-gray-100 p-6 hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <motion.h3
              className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <ImageIcon className="w-5 h-5 mr-2 text-green-600" />
              Featured Image
            </motion.h3>

            <div className="space-y-4">
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.featuredImage)}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded border border-gray-200"
                  />
                  <button
                    onClick={() => handleInputChange("featuredImage", null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-red-50 transition-all"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Click to upload featured image
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "featured")}
                className="hidden"
              />
            </div>
          </motion.div>

          {/* SEO Settings */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              <Globe className="w-6 h-6 mr-3 text-purple-600" />
              SEO Settings
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) =>
                    handleInputChange("seoTitle", e.target.value)
                  }
                  placeholder="SEO optimized title..."
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  SEO Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    handleInputChange("seoDescription", e.target.value)
                  }
                  placeholder="SEO meta description..."
                  rows={4}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 "
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
              <Calendar className="w-6 h-6 mr-3 text-blue-600" />
              Publish Settings
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.publishDate}
                  onChange={(e) =>
                    handleInputChange("publishDate", e.target.value)
                  }
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </motion.div>

              <motion.div
                className="flex items-center py-3 px-5  border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="w-5 h-5 text-blue-600 border border-gray-300 rounded "
                />
                <label
                  htmlFor="featured"
                  className="ml-3 text-sm font-semibold text-gray-700"
                >
                  Featured Article
                </label>
              </motion.div>
            </div>
          </motion.div>

          {/* Category & Author */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 "
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
              <Tag className="w-6 h-6 mr-3 text-green-600" />
              Classification
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.9, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Author *
                </label>
                <select
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                >
                  <option value="">Select Author</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 "
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.0, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.1, duration: 0.5 }}
            >
              <Tag className="w-6 h-6 mr-3 text-orange-600" />
              Tags
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2, duration: 0.5 }}
              >
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="Add tag..."
                  className="flex-1 w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
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
                transition={{ delay: 3.3, duration: 0.5 }}
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
        </div>
      </div>
    </div>
  );
}
