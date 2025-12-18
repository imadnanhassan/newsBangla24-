"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  Calendar,
  Tag,
  Globe,
  FileText,
  X,
  Plus,
  Sparkles,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

// Type definitions
interface FormData {
  name: string;
  nameEn: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  location: string;
  status: string;
  specialization: string[];
  avatar: File | null;
  joinDate: string;
  bio: string;
}

export default function AddReporterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    nameEn: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    location: "",
    status: "Active",
    specialization: [],
    avatar: null,
    joinDate: new Date().toISOString().split("T")[0],
    bio: "",
  });

  const [newSpecialization, setNewSpecialization] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const departments = [
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

  const designations = [
    "Senior Reporter",
    "Reporter",
    "Junior Reporter",
    "Correspondent",
    "Photojournalist",
    "Editor",
    "Chief Reporter",
  ];

  // SEO optimization
  useEffect(() => {
    document.title = "Add Reporter - NewsBangla24 Admin";
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name in Bengali is required";
    if (!formData.nameEn.trim())
      newErrors.nameEn = "Name in English is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (Bangladeshi format)
    const phoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
    if (
      formData.phone &&
      !phoneRegex.test(formData.phone.replace(/\s+/g, ""))
    ) {
      newErrors.phone = "Please enter a valid Bangladeshi phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSpecialization = () => {
    if (
      newSpecialization.trim() &&
      !formData.specialization.includes(newSpecialization.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specialization: [...prev.specialization, newSpecialization.trim()],
      }));
      setNewSpecialization("");
    }
  };

  const handleRemoveSpecialization = (specToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.filter(
        (spec) => spec !== specToRemove
      ),
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    if (files[0]) {
      setFormData((prev) => ({
        ...prev,
        avatar: files[0],
      }));
    }
  };

  const handleSubmit = (status: string) => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    const reporterData = {
      ...formData,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Reporter Data:", reporterData);
    toast.success(
      `Reporter ${
        status === "Active" ? "added and activated" : "added as inactive"
      } successfully!`
    );

    // Redirect back to reporter list
    setTimeout(() => {
      router.push("/dashboard/reporter");
    }, 2000);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <motion.div
        className="relative overflow-hidden bg-linear-to-r from-teal-600 via-teal-500 to-cyan-500 rounded p-8 text-white shadow"
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
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Add New Reporter
                </motion.h1>
                <motion.p
                  className="text-white/90 mt-2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Register and onboard a new reporter
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <motion.button
                onClick={() => handleSubmit("Active")}
                className="flex items-center space-x-3 cursor-pointer bg-white text-teal-600 px-6 py-3 rounded font-semibold transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                <span>Add & Activate</span>
              </motion.button>
              <motion.button
                onClick={() => handleSubmit("Inactive")}
                className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded cursor-pointer font-bold transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                <span>Save as Inactive</span>
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
          href="/dashboard/reporter"
          className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded hover:bg-gray-50 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Reporters</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            className="bg-white rounded p-8 shadow"
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
              <FileText className="w-6 h-6 mr-3 text-teal-600" />
              Basic Information
            </motion.h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Name (Bengali) *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="আহমেদ হাসান"
                    className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
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
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) =>
                      handleInputChange("nameEn", e.target.value)
                    }
                    placeholder="Ahmed Hasan"
                    className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="ahmed.hasan@newsportal.com"
                      className={`w-full pl-10 pr-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200"
                      }`}
                    />
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+880 1712-345678"
                      className={`w-full pl-10 pr-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200"
                      }`}
                    />
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Bio / Short Description
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Brief description about the reporter..."
                  rows={3}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            className="bg-white rounded p-8 shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <Upload className="w-6 h-6 mr-3 text-green-600" />
              Profile Picture
            </motion.h3>

            <div className="space-y-6">
              {formData.avatar ? (
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <img
                    src={URL.createObjectURL(formData.avatar)}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-lg mx-auto"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full flex items-center justify-center">
                    <div className="flex space-x-4">
                      <motion.button
                        onClick={() => handleInputChange("avatar", null)}
                        className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Remove photo"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => avatarInputRef.current?.click()}
                        className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Replace photo"
                      >
                        <Upload className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      {(formData.avatar.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  onClick={() => avatarInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-full p-8 text-center cursor-pointer hover:border-green-500 hover:bg-linear-to-br hover:from-green-50 hover:to-green-100 transition-all duration-300 group w-32 h-32 mx-auto"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </motion.div>
                  <p className="text-xs text-gray-600 group-hover:text-green-600 transition-colors">
                    Upload Photo
                  </p>
                </motion.div>
              )}

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e)}
                className="hidden"
              />
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Professional Information */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <Briefcase className="w-6 h-6 mr-3 text-teal-600" />
              Professional Info
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Designation *
                </label>
                <select
                  value={formData.designation}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
                    errors.designation
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200"
                  }`}
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
                {errors.designation && (
                  <motion.p
                    className="mt-2 text-sm text-red-600 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {errors.designation}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  className={`w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
                    errors.department
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200"
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <motion.p
                    className="mt-2 text-sm text-red-600 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {errors.department}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Dhaka, Bangladesh"
                    className={`w-full pl-10 pr-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400 ${
                      errors.location
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {errors.location && (
                  <motion.p
                    className="mt-2 text-sm text-red-600 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {errors.location}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Join Date
                </label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) =>
                    handleInputChange("joinDate", e.target.value)
                  }
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </motion.div>
            </div>
          </motion.div>

          {/* Specialization */}
          <motion.div
            className="bg-white rounded border border-gray-200 p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <Tag className="w-6 h-6 mr-3 text-orange-600" />
              Specialization
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.5 }}
              >
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddSpecialization()
                  }
                  placeholder="Add specialization..."
                  className="flex-1 w-full px-5 py-2 border border-gray-200 rounded focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-md font-normal placeholder-gray-400"
                />
                <motion.button
                  onClick={handleAddSpecialization}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-all duration-300 border border-teal-500"
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
                transition={{ delay: 2.7, duration: 0.5 }}
              >
                {formData.specialization.map((spec, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center px-4 py-2 bg-linear-to-r from-teal-100 to-teal-200 text-teal-800 rounded-full text-sm font-medium border border-teal-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  >
                    {spec}
                    <motion.button
                      onClick={() => handleRemoveSpecialization(spec)}
                      className="ml-3 text-teal-600 hover:text-teal-800 transition-colors"
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
