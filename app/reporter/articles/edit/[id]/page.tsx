"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ReporterLayout } from "@/components/reporter/layout";
import SimpleTextEditor from "@/components/SimpleTextEditor";
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
} from "lucide-react";
import Link from "next/link";

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
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

// Mock data - in real app this would come from API
const mockArticleData: Record<string, ArticleForm> = {
  "1": {
    title: "শিক্ষা ক্ষেত্রে নতুন সংস্কার প্রস্তাবনা",
    excerpt:
      "শিক্ষা মন্ত্রণালয় থেকে নতুন শিক্ষা সংস্কার প্রস্তাবনা উপস্থাপন করা হয়েছে যা আগামী বছর থেকে কার্যকর হবে...",
    content:
      "<h2>শিক্ষা সংস্কারের প্রয়োজনীয়তা</h2><p>বর্তমান শিক্ষা ব্যবস্থায় অনেক সমস্যা রয়েছে যা নতুন প্রজন্মের জন্য চ্যালেঞ্জ তৈরি করছে।</p><h3>প্রস্তাবিত পরিবর্তনসমূহ</h3><ul><li>পাঠ্যক্রম আধুনিকীকরণ</li><li>শিক্ষক প্রশিক্ষণ বৃদ্ধি</li><li>প্রযুক্তির ব্যবহার বাড়ানো</li></ul>",
    category: "শিক্ষা",
    tags: ["শিক্ষা", "সংস্কার", "পাঠ্যক্রম"],
    featuredImage: "/api/placeholder/300/200",
    status: "draft",
  },
  "2": {
    title: "প্রযুক্তি খাতে নতুন বিনিয়োগ",
    excerpt:
      "দেশের প্রযুক্তি খাতে বিদেশি বিনিয়োগ বৃদ্ধি পেয়েছে। বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট...",
    content:
      "<h2>প্রযুক্তি খাতের উন্নতি</h2><p>সাম্প্রতিক বছরগুলোতে প্রযুক্তি খাতে উল্লেখযোগ্য পরিবর্তন এসেছে।</p>",
    category: "প্রযুক্তি",
    tags: ["প্রযুক্তি", "বিনিয়োগ", "সফটওয়্যার"],
    featuredImage: "",
    status: "draft",
  },
};

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  const [formData, setFormData] = useState<ArticleForm>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    featuredImage: "",
    status: "draft",
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading article data
    const loadArticle = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const articleData = mockArticleData[articleId];
      if (articleData) {
        setFormData(articleData);
      }
      setIsLoading(false);
    };

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

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

  const handleImageUpload = async (file: File) => {
    // Simulate image upload
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  };

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      handleInputChange("status", status);
      alert(
        status === "published"
          ? "নিবন্ধ আপডেট এবং প্রকাশিত হয়েছে!"
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

  if (isLoading) {
    return (
      <ReporterLayout title="নিবন্ধ সম্পাদনা">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </ReporterLayout>
    );
  }

  if (!formData.title) {
    return (
      <ReporterLayout title="নিবন্ধ সম্পাদনা">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            নিবন্ধ পাওয়া যায়নি
          </h3>
          <p className="text-gray-600 mb-4">
            আপনার অনুসন্ধান করা নিবন্ধটি পাওয়া যায়নি।
          </p>
          <Link
            href="/reporter/articles"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            নিবন্ধ তালিকায় ফিরে যান
          </Link>
        </div>
      </ReporterLayout>
    );
  }

  return (
    <ReporterLayout title="নিবন্ধ সম্পাদনা">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/reporter/articles"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                নিবন্ধ সম্পাদনা
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                নিবন্ধ #{articleId} - পরিবর্তন করে সংরক্ষণ করুন
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={() => handleSubmit("draft")}
              disabled={!isFormValid || isSubmitting}
              className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              খসড়া সংরক্ষণ
            </button>
            <button
              onClick={() => handleSubmit("published")}
              disabled={!isFormValid || isSubmitting}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              আপডেট করুন
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg border p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শিরোনাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="আকর্ষণীয় শিরোনাম লিখুন..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-medium"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-lg border p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                সারাংশ
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                placeholder="নিবন্ধের সংক্ষিপ্ত বিবরণ..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                এই সারাংশ নিবন্ধের প্রিভিউ এবং SEO-তে ব্যবহৃত হবে
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বিষয়বস্তু <span className="text-red-500">*</span>
                </label>
              </div>
              <SimpleTextEditor
                value={formData.content}
                onChange={(content) => handleInputChange("content", content)}
                placeholder="আপনার নিবন্ধের বিষয়বস্তু লিখুন..."
                onImageUpload={handleImageUpload}
                className="border-0"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-lg border p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                বিভাগ <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg border p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ফিচার্ড ইমেজ
              </label>
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleInputChange("featuredImage", "")}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    ফিচার্ড ইমেজ যোগ করুন
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        handleInputChange("featuredImage", url);
                      }
                    }}
                    className="hidden"
                    id="featured-image"
                  />
                  <label
                    htmlFor="featured-image"
                    className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    আপলোড
                  </label>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg border p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ট্যাগ
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:bg-red-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="ট্যাগ যোগ করুন..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">প্রিভিউ</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">শিরোনাম:</span>
                  <p className="font-medium text-gray-900">
                    {formData.title || "শিরোনাম যোগ করুন"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">বিভাগ:</span>
                  <p className="font-medium text-gray-900">
                    {formData.category || "বিভাগ নির্বাচন করুন"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">অক্ষর সংখ্যা:</span>
                  <p className="font-medium text-gray-900">
                    {formData.content.replace(/<[^>]*>/g, "").length}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">ট্যাগ:</span>
                  <p className="font-medium text-gray-900">
                    {formData.tags.length > 0
                      ? formData.tags.join(", ")
                      : "কোনো ট্যাগ নেই"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}
