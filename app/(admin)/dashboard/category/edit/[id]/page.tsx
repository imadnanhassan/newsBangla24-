"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Tag,
  FileText,
  X,
  Plus,
  Sparkles,
} from "lucide-react";

// Type definitions
interface FormData {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  parentCategory: string;
  icon: File | null;
  color: string;
  status: string;
}

export default function EditCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    nameEn: "",
    slug: "",
    description: "",
    parentCategory: "",
    icon: null,
    color: "#dc2626",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // SEO optimization
  useEffect(() => {
    document.title = "Edit Category - NewsBangla24 Admin";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Edit category details for NewsBangla24. Update category information, description, and configuration."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Edit category details for NewsBangla24. Update category information, description, and configuration.";
      document.head.appendChild(meta);
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", "noindex, nofollow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
    }
  }, []);

  // Mock data loading - replace with actual API call
  useEffect(() => {
    const loadCategory = async () => {
      // Simulate API call
      setTimeout(() => {
        // Mock category data
        const mockCategory = {
          name: "রাজনীতি",
          nameEn: "Politics",
          slug: "politics",
          description: "রাজনৈতিক সংবাদ ও বিশ্লেষণ",
          parentCategory: "news",
          icon: null,
          color: "#dc2626",
          status: "Active",
        };
        setFormData(mockCategory);
        setLoading(false);
      }, 1000);
    };

    loadCategory();
  }, [categoryId]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Category name is required";
    if (!formData.nameEn.trim()) newErrors.nameEn = "English name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all required fields");
      return;
    }

    const categoryData = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    console.log("Updated Category Data:", categoryData);
    alert("Category updated successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category...</p>
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
                <Tag className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Edit Category
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Update and manage your category details
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <motion.button
                onClick={handleSubmit}
                className="flex items-center space-x-3 bg-white text-blue-600 px-6 py-3 rounded cursor-pointer font-bold  transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                <span>Update Category</span>
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
          href="/dashboard/category"
          className="flex items-center space-x-3 px-4 py-2  text-gray-700 rounded hover:bg-gray-50 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Categories</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Information */}
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
              <Tag className="w-6 h-6 mr-3 text-blue-600" />
              Category Information
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category Name (Bengali) *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter category name in Bengali..."
                  className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200"
                  }`}
                />
                {errors.name && (
                  <motion.p
                    className="mt-2 text-sm text-red-600 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category Name (English) *
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange("nameEn", e.target.value)}
                  placeholder="Enter category name in English..."
                  className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400 ${
                    errors.nameEn
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200"
                  }`}
                />
                {errors.nameEn && (
                  <motion.p
                    className="mt-2 text-sm text-red-600 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {errors.nameEn}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description of the category..."
                  rows={4}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category Settings */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8 "
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <Tag className="w-6 h-6 mr-3 text-green-600" />
              Category Settings
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Parent Category
                </label>
                <select
                  value={formData.parentCategory}
                  onChange={(e) =>
                    handleInputChange("parentCategory", e.target.value)
                  }
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                >
                  <option value="">No parent category</option>
                  <option value="news">News</option>
                  <option value="features">Features</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300 text-md font-normal placeholder-gray-400"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category Color
                </label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded focus:outline-none  focus:ring-primary focus:border-primary transition-all  duration-300"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
