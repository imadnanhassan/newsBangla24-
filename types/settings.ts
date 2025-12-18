export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  language: string;
  timezone: string;
  logo?: string;
}

export interface ThemeSettings {
  theme: "default" | "dark" | "green";
  primaryColor: string;
  secondaryColor: string;
}

export interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

export interface AdminNotificationSettings {
  newArticlePublished: boolean;
  commentModeration: boolean;
  userRegistration: boolean;
  systemUpdates: boolean;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
}

export interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
  retentionDays: number;
  lastBackup?: string;
}

export interface UserManagementSettings {
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultUserRole: string;
  sessionTimeout: number;
}

export interface SettingsTab {
  id: string;
  label: string;
  icon: any;
  description: string;
}

export interface SettingsData {
  general: SiteSettings;
  appearance: ThemeSettings;
  security: SecuritySettings;
  notifications: AdminNotificationSettings;
  users: UserManagementSettings;
  email: EmailSettings;
  backup: BackupSettings;
}

export type SettingsSection = keyof SettingsData;
