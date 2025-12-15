# 📁 Project Structure

This document outlines the organized TypeScript project structure with user-based separation and proper type definitions.

## 🏗️ **Directory Structure**

```
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin route group
│   ├── (frontend)/               # Frontend route group  
│   ├── admin/                    # Admin pages
│   ├── api/                      # API routes
│   ├── login/                    # Authentication pages
│   ├── reporter/                 # Reporter pages
│   │   ├── dashboard/
│   │   ├── articles/
│   │   ├── media/
│   │   ├── analytics/
│   │   ├── calendar/
│   │   ├── notifications/
│   │   ├── profile/
│   │   └── settings/
│   ├── user/                     # User pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/                   # React components
│   ├── shared/                   # Shared components
│   │   ├── ui/                   # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── reporter/                 # Reporter-specific components
│   │   ├── layout/               # Layout components
│   │   │   ├── ReporterLayout.tsx
│   │   │   ├── ReporterSidebar.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── QuickActionCard.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── admin/                    # Admin-specific components
│   │   ├── layout/               # Layout components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── user/                     # User-specific components
│   │   ├── layout/               # Layout components
│   │   │   ├── UserLayout.tsx
│   │   │   ├── UserHeader.tsx
│   │   │   ├── UserSidebar.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── frontend/                 # Frontend components
│   │   ├── layout/               # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── index.ts                  # Main component exports
│   └── [legacy components]       # To be moved/deprecated
│
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication utilities
│   ├── session.ts                # Session management
│   ├── utils.ts                  # General utilities
│   ├── contexts/                 # React contexts
│   └── hooks/                    # Custom hooks
│
├── types/                        # TypeScript type definitions
│   ├── auth.ts                   # Authentication types
│   ├── article.ts                # Article types
│   ├── media.ts                  # Media types
│   ├── analytics.ts              # Analytics types
│   ├── notification.ts           # Notification types
│   ├── calendar.ts               # Calendar types
│   ├── common.ts                 # Common utility types
│   └── index.ts                  # Type exports
│
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎯 **Key Organizational Principles**

### **1. User-Based Component Separation**
Components are organized by user roles to maintain clear boundaries:

- **`components/shared/`** - Reusable UI components across all user types
- **`components/reporter/`** - Reporter-specific components
- **`components/admin/`** - Admin-specific components  
- **`components/user/`** - End-user specific components
- **`components/frontend/`** - Public-facing components

### **2. Feature-Based Grouping**
Within each user type, components are grouped by feature:

```typescript
components/reporter/
├── layout/           # Layout and navigation
├── dashboard/        # Dashboard widgets
├── articles/         # Article management
├── media/           # Media management
├── analytics/       # Analytics and reporting
└── profile/         # Profile management
```

### **3. Comprehensive Type System**
Types are organized by domain with proper interfaces:

```typescript
types/
├── auth.ts          # User, Session, Authentication
├── article.ts       # Article, Category, Tag, SEO
├── media.ts         # MediaFile, Upload, Metadata
├── analytics.ts     # Analytics, Performance, Engagement
├── notification.ts  # Notifications, Preferences
├── calendar.ts      # Events, Scheduling
├── common.ts        # Utility types, API responses
└── index.ts         # Centralized exports
```

## 📋 **Type Definitions Overview**

### **Authentication Types (`types/auth.ts`)**
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profile?: UserProfile;
  preferences?: UserPreferences;
}

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
```

### **Article Types (`types/article.ts`)**
```typescript
interface Article {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
  category: Category;
  tags: Tag[];
  author: Author;
  metadata: ArticleMetadata;
  seo?: SEOData;
}

type ArticleStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
```

### **Media Types (`types/media.ts`)**
```typescript
interface MediaFile {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  metadata: MediaMetadata;
  usageCount: number;
}

type MediaType = 'image' | 'video' | 'document' | 'audio';
```

## 🔧 **Component Architecture**

### **Shared UI Components**
Located in `components/shared/ui/`, these provide consistent design:

```typescript
// Button component with variants
<Button variant="default" size="lg" loading={isLoading}>
  Submit Article
</Button>

// Input with validation
<Input 
  label="Article Title"
  error={errors.title}
  leftIcon={<FileText />}
/>

// Card with different styles
<Card variant="glass" hover padding="lg">
  Content here
</Card>
```

### **User-Specific Layouts**
Each user type has its own layout system:

```typescript
// Reporter Layout
import { ReporterLayout } from '@/components/reporter/layout';

export default function ReporterPage() {
  return (
    <ReporterLayout title="Dashboard">
      <ReporterContent />
    </ReporterLayout>
  );
}
```

### **Feature Components**
Specialized components for specific features:

```typescript
// Dashboard Stats
import { StatsCard } from '@/components/reporter/dashboard';

<StatsCard
  title="Total Articles"
  value="47"
  change="+3"
  icon={FileText}
  color="from-blue-500 to-blue-600"
/>
```

## 🚀 **Benefits of This Structure**

### **1. Maintainability**
- Clear separation of concerns
- Easy to locate and modify components
- Consistent naming conventions

### **2. Scalability**
- Easy to add new user types
- Feature-based organization supports growth
- Modular component architecture

### **3. Type Safety**
- Comprehensive TypeScript coverage
- Proper interface definitions
- Compile-time error detection

### **4. Developer Experience**
- Intuitive folder structure
- Auto-completion with proper types
- Clear import paths

### **5. Code Reusability**
- Shared UI components
- Common utility functions
- Consistent design system

## 📝 **Usage Examples**

### **Creating a New Feature**
1. Add types in `types/feature.ts`
2. Create components in `components/user-type/feature/`
3. Add pages in `app/user-type/feature/`
4. Export from index files

### **Adding a New User Type**
1. Create folder in `components/new-user-type/`
2. Add layout components
3. Create feature-specific components
4. Add corresponding app routes

### **Using Types**
```typescript
import type { Article, ArticleForm, ArticleFilter } from '@/types';

const createArticle = async (data: ArticleForm): Promise<Article> => {
  // Implementation
};
```

This structure provides a solid foundation for a scalable, maintainable TypeScript application with clear separation of concerns and comprehensive type safety.

## ✅ **Completed Reorganization**

### **What Was Accomplished:**

1. **✅ Removed Duplicate Files**
   - Deleted `components/AdminHeader.tsx` and `components/AdminSidebar.tsx`
   - Moved admin components to proper structure in `components/admin/layout/`

2. **✅ Created User-Based Component Structure**
   - **Admin Components**: `components/admin/layout/` with AdminLayout, AdminSidebar, AdminHeader
   - **Reporter Components**: Already organized in `components/reporter/layout/` and `components/reporter/dashboard/`
   - **User Components**: `components/user/layout/` with UserLayout, UserHeader, UserSidebar
   - **Frontend Components**: `components/frontend/layout/` with MainLayout

3. **✅ Comprehensive Type System**
   - All types organized in `types/` directory with proper interfaces
   - Centralized exports through `types/index.ts`
   - TypeScript coverage across all components

4. **✅ Proper Index Files**
   - Created index files for each component group for clean imports
   - Main `components/index.ts` for centralized component exports
   - Organized exports by user type and feature

5. **✅ Optimized Folder Structure**
   - Clear separation between user roles (admin, reporter, user, frontend)
   - Feature-based grouping within each user type
   - Shared UI components for consistency

### **Import Examples After Reorganization:**

```typescript
// Admin Components
import { AdminLayout, AdminSidebar } from '@/components/admin';

// Reporter Components  
import { ReporterLayout, StatsCard } from '@/components/reporter';

// User Components
import { UserLayout, UserHeader } from '@/components/user';

// Frontend Components
import { MainLayout } from '@/components/frontend';

// Shared UI Components
import { Button, Input, Card } from '@/components/shared/ui';

// Types
import type { User, Article, SessionUser } from '@/types';
```

### **Next Steps for Further Optimization:**

1. **Move Legacy Components**: Gradually move remaining components to appropriate user-based folders
2. **Create Feature Components**: Add specific feature components for each user type
3. **Implement Consistent Design System**: Extend shared UI components
4. **Add Component Documentation**: Document component APIs and usage examples

The project now has a clean, scalable architecture with proper TypeScript integration and user-based component organization.