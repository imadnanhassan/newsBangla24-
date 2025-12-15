'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authenticateUser, getDashboardRoute, demoUsers, getRoleDisplayName } from '@/lib/auth';
import { ClientSession } from '@/lib/session';
import { LoginCredentials } from '@/types';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authenticateUser(formData);
      
      if (response.success && response.user) {
        ClientSession.setSession(response.user as any, response.token || '');
        const dashboardRoute = getDashboardRoute(response.user.role);
        window.location.href = dashboardRoute;
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fillCredentials = (email: string, password: string) => {
    setFormData({ email, password });
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
        <div className="max-w-4xl mx-auto">
          {/* Demo Credentials */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">ডেমো অ্যাকাউন্ট</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demoUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      user.role === 'super_admin' ? 'bg-purple-600' :
                      user.role === 'admin' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {user.role === 'super_admin' ? 'SA' :
                       user.role === 'admin' ? 'A' : 'R'}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{getRoleDisplayName(user.role)}</h3>
                    <p className="text-sm text-gray-600 mb-3">{user.name}</p>
                    <div className="space-y-2 text-xs">
                      <div className="bg-gray-100 p-2 rounded font-mono">{user.email}</div>
                      <div className="bg-gray-100 p-2 rounded font-mono">{user.password}</div>
                    </div>
                    <button
                      onClick={() => fillCredentials(user.email, user.password)}
                      className={`mt-3 w-full py-2 px-4 text-white rounded-lg font-medium transition-colors ${
                        user.role === 'super_admin' ? 'bg-purple-600 hover:bg-purple-700' :
                        user.role === 'admin' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      ব্যবহার করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">লগইন</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="আপনার ইমেইল লিখুন"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/test-auth" className="text-sm text-red-600 hover:text-red-700">
                  সিস্টেম টেস্ট
                </Link>
              </div>
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

