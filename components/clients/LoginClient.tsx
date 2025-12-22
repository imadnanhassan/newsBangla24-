"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { getDashboardRoute, demoUsers, getRoleDisplayName } from "@/lib/auth";
import { LoginCredentials } from "@/types";
import { useAuth } from "@/redux/hooks/useAuth";

export default function LoginClient() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "14701470",
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    console.log("Login attempt with data:", data);
    setError("");

    try {
      const result = await login(data).unwrap();
      console.log("Login result:", result);
      if (result.success) {
        console.log("Login successful");
        window.location.href = "/admin/dashboard";
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.data?.message || err?.error ;
      setError(errorMessage);
    }
  };

  const fillCredentials = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">নিউজ বাংলা ২৪</h1>
              <p className="text-red-100 text-sm">সত্য ও নিরপেক্ষ সংবাদ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email",
                      },
                    })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                Demo Accounts
              </h3>
              <div className="space-y-2">
                {demoUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                          user.role === "super_admin"
                            ? "bg-purple-600"
                            : user.role === "admin"
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }`}
                      >
                        {user.role === "super_admin"
                          ? "SA"
                          : user.role === "admin"
                          ? "A"
                          : "R"}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">
                          {getRoleDisplayName(user.role)}
                        </p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        fillCredentials(user.email, user.password || "")
                      }
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/test-auth"
                className="text-sm text-red-600 hover:text-red-700"
              >
                System Test
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© ২০২৪ নিউজ বাংলা ২৪ - সর্বস্বত্ব সংরক্ষিত</p>
        </div>
      </div>
    </div>
  );
}
