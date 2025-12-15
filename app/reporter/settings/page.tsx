'use client';

import { useState } from 'react';
import { 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Key,
  Database,
  HelpCircle
} from 'lucide-react';
import { ReporterLayout } from '@/components/reporter/layout';

interface SettingsData {
  // Profile Settings
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  commentNotifications: boolean;
  articleNotifications: boolean;
  weeklyDigest: boolean;
  
  // Privacy Settings
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
  
  // Appearance Settings
  theme: 'light' | 'dark' | 'auto';
  language: 'bn' | 'en';
  fontSize: 'small' | 'medium' | 'large';
  
  // Security Settings
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    displayName: 'রিপোর্টার নাম',
    email: 'reporter@example.com',
    phone: '+৮৮০১৭১২৩৪৫৬৭৮',
    bio: 'অভিজ্ঞ সংবাদকর্মী',
    
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    articleNotifications: true,
    weeklyDigest: false,
    
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    
    theme: 'light',
    language: 'bn',
    fontSize: 'medium',
    
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  const handleSettingChange = (key: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your API
    console.log('Saving settings:', settings);
    alert('সেটিংস সংরক্ষিত হয়েছে!');
  };

  const tabs = [
    { id: 'profile', name: 'প্রোফাইল', icon: User },
    { id: 'notifications', name: 'নোটিফিকেশন', icon: Bell },
    { id: 'privacy', name: 'গোপনীয়তা', icon: Shield },
    { id: 'appearance', name: 'চেহারা', icon: Palette },
    { id: 'security', name: 'নিরাপত্তা', icon: Lock },
    { id: 'data', name: 'ডেটা', icon: Database }
  ];

  return (
    <ReporterLayout title="সেটিংস">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">সেটিংস মেনু</h3>
              <nav className="space-y-1">
                {tabs.map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <User className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">প্রোফাইল সেটিংস</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        প্রদর্শনী নাম
                      </label>
                      <input
                        type="text"
                        value={settings.displayName}
                        onChange={(e) => handleSettingChange('displayName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ইমেইল ঠিকানা
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ফোন নম্বর
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleSettingChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        বায়ো
                      </label>
                      <textarea
                        value={settings.bio}
                        onChange={(e) => handleSettingChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">নোটিফিকেশন সেটিংস</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">ইমেইল নোটিফিকেশন</h3>
                        <p className="text-sm text-gray-600">গুরুত্বপূর্ণ আপডেট ইমেইলে পান</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">পুশ নোটিফিকেশন</h3>
                        <p className="text-sm text-gray-600">ব্রাউজারে তাৎক্ষণিক নোটিফিকেশন</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">মন্তব্য নোটিফিকেশন</h3>
                        <p className="text-sm text-gray-600">নতুন মন্তব্যের জানান</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.commentNotifications}
                          onChange={(e) => handleSettingChange('commentNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">নিবন্ধ আপডেট</h3>
                        <p className="text-sm text-gray-600">নিবন্ধ অনুমোদন/প্রত্যাখ্যানের জানান</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.articleNotifications}
                          onChange={(e) => handleSettingChange('articleNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">সাপ্তাহিক রিপোর্ট</h3>
                        <p className="text-sm text-gray-600">সাপ্তাহিক পারফরম্যান্স রিপোর্ট</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.weeklyDigest}
                          onChange={(e) => handleSettingChange('weeklyDigest', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">গোপনীয়তা সেটিংস</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        প্রোফাইল দৃশ্যমানতা
                      </label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="public">সবার জন্য দৃশ্যমান</option>
                        <option value="private">শুধুমাত্র নিবন্ধিত ব্যবহারকারী</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">ইমেইল প্রদর্শন</h3>
                        <p className="text-sm text-gray-600">প্রোফাইলে ইমেইল দেখান</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.showEmail}
                          onChange={(e) => handleSettingChange('showEmail', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">ফোন প্রদর্শন</h3>
                        <p className="text-sm text-gray-600">প্রোফাইলে ফোন নম্বর দেখান</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.showPhone}
                          onChange={(e) => handleSettingChange('showPhone', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">বার্তা গ্রহণ</h3>
                        <p className="text-sm text-gray-600">অন্যদের থেকে বার্তা গ্রহণ করুন</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.allowMessages}
                          onChange={(e) => handleSettingChange('allowMessages', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Palette className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">চেহারা সেটিংস</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        থিম
                      </label>
                      <select
                        value={settings.theme}
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="light">হালকা</option>
                        <option value="dark">গাঢ়</option>
                        <option value="auto">স্বয়ংক্রিয়</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ভাষা
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="bn">বাংলা</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ফন্ট সাইজ
                      </label>
                      <select
                        value={settings.fontSize}
                        onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="small">ছোট</option>
                        <option value="medium">মাঝারি</option>
                        <option value="large">বড়</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">নিরাপত্তা সেটিংস</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">পাসওয়ার্ড পরিবর্তন</h3>
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="বর্তমান পাসওয়ার্ড"
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <input
                          type="password"
                          placeholder="নতুন পাসওয়ার্ড"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="নতুন পাসওয়ার্ড নিশ্চিত করুন"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          পাসওয়ার্ড আপডেট করুন
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">দ্বি-ফ্যাক্টর অথেন্টিকেশন</h3>
                        <p className="text-sm text-gray-600">অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorEnabled}
                          onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">লগইন সতর্কতা</h3>
                        <p className="text-sm text-gray-600">নতুন ডিভাইস থেকে লগইনের জানান</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.loginAlerts}
                          onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        সেশন টাইমআউট (মিনিট)
                      </label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value={15}>১৫ মিনিট</option>
                        <option value={30}>৩০ মিনিট</option>
                        <option value={60}>১ ঘন্টা</option>
                        <option value={120}>২ ঘন্টা</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Settings */}
              {activeTab === 'data' && (
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Database className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">ডেটা ব্যবস্থাপনা</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-blue-900">ডেটা এক্সপোর্ট</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            আপনার সব ডেটা ডাউনলোড করুন (নিবন্ধ, মিডিয়া, প্রোফাইল তথ্য)
                          </p>
                          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            ডেটা এক্সপোর্ট করুন
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-yellow-900">অ্যাকাউন্ট ডিঅ্যাক্টিভেট</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            সাময়িকভাবে আপনার অ্যাকাউন্ট নিষ্ক্রিয় করুন
                          </p>
                          <button className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                            অ্যাকাউন্ট ডিঅ্যাক্টিভেট করুন
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-red-900">অ্যাকাউন্ট মুছে ফেলুন</h3>
                          <p className="text-sm text-red-700 mt-1">
                            স্থায়ীভাবে আপনার অ্যাকাউন্ট এবং সব ডেটা মুছে ফেলুন। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
                          </p>
                          <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                            অ্যাকাউন্ট মুছে ফেলুন
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    পরিবর্তন সংরক্ষণ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}