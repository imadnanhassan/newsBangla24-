"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/article"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-600" />
              Edit Article
            </h1>
            <p className="text-gray-600 mt-1">Update and manage your article</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Last saved: 2 minutes ago
          </div>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit" : "Preview"}
          </button>
          <button
            onClick={() => handleSubmit("draft")}
            className="flex items-center px-4 py-2 border-2 border-blue-200 text-blue-700 rounded-xl hover:border-blue-300 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
          <button
            onClick={() => handleSubmit("published")}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Globe className="w-4 h-4 mr-2" />
            Update & Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Article Content
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter article title..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                  placeholder="Enter article subtitle..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <SimpleTextEditor
                  value={formData.content}
                  onChange={(content) => handleInputChange("content", content)}
                  placeholder="Write your article content here..."
                  className="border-2 rounded-xl overflow-hidden transition-all"
                  error={false}
                  onImageUpload={handleEditorImageUpload}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Brief summary of the article..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-green-600" />
              Featured Image
            </h3>

            <div className="space-y-4">
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.featuredImage)}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
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
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-600" />
              SEO Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) =>
                    handleInputChange("seoTitle", e.target.value)
                  }
                  placeholder="SEO optimized title..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    handleInputChange("seoDescription", e.target.value)
                  }
                  placeholder="SEO meta description..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Publish Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.publishDate}
                  onChange={(e) =>
                    handleInputChange("publishDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="w-4 h-4 text-primary border-2 border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Featured Article
                </label>
              </div>
            </div>
          </div>

          {/* Category & Author */}
          <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-green-600" />
              Classification
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <select
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="">Select Author</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-orange-600" />
              Tags
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-primary text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
