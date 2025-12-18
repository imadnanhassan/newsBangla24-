"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  Users,
  Key,
  Save,
  Upload,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
} from "lucide-react";
import {
  SettingsData,
  SettingsTab,
  SiteSettings,
  ThemeSettings,
  SecuritySettings,
  AdminNotificationSettings,
  UserManagementSettings,
  EmailSettings,
  BackupSettings,
} from "@/types/settings";
import {
  dummySettingsData,
  settingsTabs,
  validateSecuritySettings,
  getThemePreview,
} from "@/lib/dummy-settings";

export default function SettingsClient() {
  const [settings, setSettings] = useState<SettingsData>(dummySettingsData);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [showPassword, setShowPassword] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (section: keyof SettingsData, data: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Validate security settings if password is being changed
    if (settings.security.newPassword) {
      const validation = validateSecuritySettings(settings.security);
      if (!validation.valid) {
        alert(`Validation errors:\n${validation.errors.join("\n")}`);
        return;
      }
    }

    // In a real app, this would save to backend
    alert("Settings saved successfully!");
    setHasChanges(false);

    // Clear password fields after save
    updateSettings("security", {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleCancel = () => {
    if (
      hasChanges &&
      !confirm("You have unsaved changes. Are you sure you want to cancel?")
    ) {
      return;
    }
    setSettings(dummySettingsData);
    setHasChanges(false);
  };

  const handleLogoUpload = () => {
    alert("Logo upload functionality - This would open a file picker");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Site Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) =>
                      updateSettings("general", { siteName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) =>
                      updateSettings("general", { siteUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.general.siteDescription}
                    onChange={(e) =>
                      updateSettings("general", {
                        siteDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Site Logo
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <div>
                  <button
                    onClick={handleLogoUpload}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Logo
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended size: 200x200px
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Regional Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) =>
                      updateSettings("general", { language: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  >
                    <option>Bengali</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) =>
                      updateSettings("general", { timezone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  >
                    <option>Asia/Dhaka</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "appearance":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Theme Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["default", "dark", "green"].map((theme) => {
                  const preview = getThemePreview(theme);
                  return (
                    <motion.div
                      key={theme}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        settings.appearance.theme === theme
                          ? "border-purple-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        updateSettings("appearance", { theme: theme as any })
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`w-full h-20 ${preview.bg} rounded mb-3`}
                      ></div>
                      <p className="text-sm font-medium text-center">
                        {preview.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Color Customization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        updateSettings("appearance", {
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        updateSettings("appearance", {
                          primaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        updateSettings("appearance", {
                          secondaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        updateSettings("appearance", {
                          secondaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "security":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Password Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={settings.security.currentPassword}
                      onChange={(e) =>
                        updateSettings("security", {
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={settings.security.newPassword}
                    onChange={(e) =>
                      updateSettings("security", {
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={settings.security.confirmPassword}
                    onChange={(e) =>
                      updateSettings("security", {
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable 2FA</p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorEnabled}
                    onChange={(e) =>
                      updateSettings("security", {
                        twoFactorEnabled: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </motion.div>
        );

      case "notifications":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Email Notifications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    key: "newArticlePublished",
                    title: "New Article Published",
                    desc: "Get notified when a new article is published",
                  },
                  {
                    key: "commentModeration",
                    title: "Comment Moderation",
                    desc: "Get notified when comments need moderation",
                  },
                  {
                    key: "userRegistration",
                    title: "User Registration",
                    desc: "Get notified when new users register",
                  },
                  {
                    key: "systemUpdates",
                    title: "System Updates",
                    desc: "Get notified about system updates and maintenance",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          settings.notifications[
                            item.key as keyof AdminNotificationSettings
                          ]
                        }
                        onChange={(e) =>
                          updateSettings("notifications", {
                            [item.key]: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Settings for {activeTab} will be available soon.
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-purple-500 to-pink-500 rounded p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-white/80 mt-1">
                  Manage your site configuration and preferences
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-80">
          <nav className="bg-white rounded border border-gray-100 p-2 transition-all duration-300">
            {settingsTabs.map((tab, index) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-purple-50 text-purple-700 border border-purple-200 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{tab.label}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {tab.description}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded border border-gray-100 p-6 transition-all duration-300">
            {renderTabContent()}

            {/* Save Actions */}
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                {hasChanges && (
                  <motion.div
                    className="flex items-center space-x-2 text-orange-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Unsaved changes</span>
                  </motion.div>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSave}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!hasChanges}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
