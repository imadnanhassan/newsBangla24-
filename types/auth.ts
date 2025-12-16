// Authentication related types
export type UserRole = "user" | "reporter" | "admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: "bn" | "en";
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  comments: boolean;
  articles: boolean;
  weeklyDigest: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private";
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role?: UserRole;
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, "password">;
  token?: string;
  message?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
