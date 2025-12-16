import { User, LoginCredentials, AuthResponse, UserRole } from "@/types";
import { sessionManager } from "./session";

// Demo users with different roles - Only 3 credentials
export const demoUsers: User[] = [
  // Super Admin
  {
    id: "1",
    email: "superadmin@newsbangla24.com",
    password: "superadmin123",
    name: "Super Administrator",
    role: "super_admin",
    avatar: "/avatars/superadmin.jpg",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-15T10:00:00Z",
    lastLogin: "2024-12-15T10:00:00Z",
  },
  // Admin
  {
    id: "2",
    email: "admin@newsbangla24.com",
    password: "admin123",
    name: "News Administrator",
    role: "admin",
    avatar: "/avatars/admin.jpg",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-15T09:30:00Z",
    lastLogin: "2024-12-15T09:30:00Z",
  },
  // Reporter
  {
    id: "3",
    email: "reporter@newsbangla24.com",
    password: "reporter123",
    name: "আহমেদ করিম",
    role: "reporter",
    avatar: "/avatars/reporter1.jpg",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-15T08:45:00Z",
    lastLogin: "2024-12-15T08:45:00Z",
  },
];

// Authentication function
export const authenticateUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = demoUsers.find(
    (u) =>
      u.email === credentials.email &&
      u.password === credentials.password &&
      u.isActive
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // Remove password from response
  const { password, ...userWithoutPassword } = user;

  // Create session
  const sessionUser = sessionManager.createSession(userWithoutPassword);

  // Update last login
  user.lastLogin = new Date().toISOString();

  return {
    success: true,
    user: sessionUser,
    token: sessionUser.sessionId,
    message: "Login successful",
  };
};

// Role-based dashboard routes - Updated to match existing structure
export const getDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "super_admin":
      return "/dashboard"; // Super admin gets full admin access
    case "admin":
      return "/dashboard"; // Regular admin gets admin dashboard
    case "reporter":
      return "/reporter/dashboard";
    case "user":
      return "/user/dashboard";
    default:
      return "/";
  }
};

// Role permissions
export const rolePermissions = {
  super_admin: [
    "manage_users",
    "manage_admins",
    "manage_reporters",
    "manage_articles",
    "manage_categories",
    "view_analytics",
    "system_settings",
  ],
  admin: [
    "manage_reporters",
    "manage_articles",
    "manage_categories",
    "view_analytics",
    "moderate_content",
  ],
  reporter: [
    "create_articles",
    "edit_own_articles",
    "upload_media",
    "view_own_analytics",
  ],
  user: ["read_articles", "comment_articles", "save_articles"],
};

// Check if user has permission
export const hasPermission = (
  userRole: UserRole,
  permission: string
): boolean => {
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Get user role display name
export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case "super_admin":
      return "সুপার অ্যাডমিন";
    case "admin":
      return "অ্যাডমিন";
    case "reporter":
      return "রিপোর্টার";
    case "user":
      return "ব্যবহারকারী";
    default:
      return "অজানা";
  }
};
