// Article and content related types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  usageCount: number;
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
  };
}

export type ArticleStatus =
  | "draft"
  | "pending"
  | "published"
  | "rejected"
  | "archived";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  images?: string[];
  videoUrl?: string;
  youtubeId?: string;
  status: ArticleStatus;
  category: Category;
  tags: Tag[];
  author: Author;
  reporter: Author;
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata: ArticleMetadata;
  seo?: SEOData;
}

export interface ArticleMetadata {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  readingTime: number;
  wordCount: number;
  lastViewedAt?: string;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  featuredImage?: string;
  videoUrl?: string;
  youtubeId?: string;
  status: ArticleStatus;
  publishedAt?: string;
  scheduledAt?: string;
  seo?: SEOData;
}

export interface ArticleFilter {
  status?: ArticleStatus;
  categoryId?: string;
  authorId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  tags?: string[];
  sortBy?: "createdAt" | "publishedAt" | "views" | "title";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ArticleStats {
  total: number;
  published: number;
  draft: number;
  pending: number;
  rejected: number;
  totalViews: number;
  totalComments: number;
  totalShares: number;
}
