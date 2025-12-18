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
  Settings,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  Users,
  Key,
} from "lucide-react";

// Settings tabs configuration
export const settingsTabs: SettingsTab[] = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic site information and regional settings",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Theme and visual customization options",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Password and authentication settings",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Email notification preferences",
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    description: "User registration and role settings",
  },
  {
    id: "email",
    label: "Email Settings",
    icon: Mail,
    description: "SMTP and email configuration",
  },
  {
    id: "backup",
    label: "Backup & Data",
    icon: Database,
    description: "Data backup and retention settings",
  },
];

// Default settings data
export const defaultSiteSettings: SiteSettings = {
  siteName: "NewsBangla24",
  siteUrl: "https://newsbangla24.com",
  siteDescription:
    "Your trusted source for latest news and updates from Bangladesh and around the world.",
  language: "Bengali",
  timezone: "Asia/Dhaka",
  logo: undefined,
};

export const defaultThemeSettings: ThemeSettings = {
  theme: "default",
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
};

export const defaultSecuritySettings: SecuritySettings = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorEnabled: false,
};

export const defaultNotificationSettings: AdminNotificationSettings = {
  newArticlePublished: true,
  commentModeration: true,
  userRegistration: true,
  systemUpdates: true,
};

export const defaultUserManagementSettings: UserManagementSettings = {
  allowRegistration: true,
  requireEmailVerification: true,
  defaultUserRole: "subscriber",
  sessionTimeout: 30,
};

export const defaultEmailSettings: EmailSettings = {
  smtpHost: "smtp.gmail.com",
  smtpPort: 587,
  smtpUsername: "noreply@newsbangla24.com",
  smtpPassword: "",
  fromEmail: "noreply@newsbangla24.com",
  fromName: "NewsBangla24",
};

export const defaultBackupSettings: BackupSettings = {
  autoBackup: true,
  backupFrequency: "daily",
  retentionDays: 30,
  lastBackup: "2024-01-15T02:00:00Z",
};

// Complete settings data
export const dummySettingsData: SettingsData = {
  general: defaultSiteSettings,
  appearance: defaultThemeSettings,
  security: defaultSecuritySettings,
  notifications: defaultNotificationSettings,
  users: defaultUserManagementSettings,
  email: defaultEmailSettings,
  backup: defaultBackupSettings,
};

// Helper functions
export const getSettingsTabById = (id: string): SettingsTab | undefined => {
  return settingsTabs.find((tab) => tab.id === id);
};

export const getAllSettingsTabs = (): SettingsTab[] => {
  return settingsTabs;
};

export const validateEmailSettings = (settings: EmailSettings): boolean => {
  return !!(
    settings.smtpHost &&
    settings.smtpPort &&
    settings.smtpUsername &&
    settings.fromEmail
  );
};

export const validateSecuritySettings = (
  settings: SecuritySettings
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (settings.newPassword && settings.newPassword.length < 8) {
    errors.push("New password must be at least 8 characters long");
  }

  if (
    settings.newPassword &&
    settings.confirmPassword &&
    settings.newPassword !== settings.confirmPassword
  ) {
    errors.push("New password and confirmation do not match");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getThemePreview = (theme: string) => {
  const themes = {
    default: { bg: "bg-blue-500", name: "Default Theme" },
    dark: { bg: "bg-gray-800", name: "Dark Theme" },
    green: { bg: "bg-green-500", name: "Green Theme" },
  };
  return themes[theme as keyof typeof themes] || themes.default;
};
