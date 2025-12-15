import type { Article, Category } from "@/types";
import { allDummyArticles, dummyCategories } from "./dummy-data";

// Export categories from dummy data
export const categories: Category[] = [
  ...dummyCategories,
  { id: "7", name: "সর্বশেষ", slug: "latest-news", description: "সর্বশেষ সংবাদ", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: "8", name: "দেশের খবর", slug: "country-news", description: "দেশের সংবাদ", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: "9", name: "বিশ্ব", slug: "world-news", description: "বিশ্বের সংবাদ", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: "10", name: "স্বাস্থ্য", slug: "health", description: "স্বাস্থ্য সংবাদ", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: "11", name: "রাজনীতি", slug: "politics", description: "রাজনৈতিক সংবাদ", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: "12", name: "ব্যবসা", slug: "business", description: "ব্যবসায়িক সংবাদ", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
];

// Create articles organized by category
export const articlesByCategory: Record<string, any[]> = categories.reduce(
  (acc, category) => {
    // Filter articles by category slug
    const categoryArticles = allDummyArticles.filter(article => 
      article.category.slug === category.slug
    );

    return {
      ...acc,
      [category.slug]: categoryArticles,
    };
  },
  {}
);

// Use our dummy articles
export const articles: any[] = allDummyArticles;
