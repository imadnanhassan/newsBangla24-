import {
  TrendingArticle,
  TrendingTopic,
  TrendingStats,
  TrendingAnalytics,
} from "@/types/trending";

// Dummy trending articles data
export const dummyTrendingArticles: TrendingArticle[] = [
  {
    id: 1,
    title: "Major Economic Policy Changes Announced",
    category: "Politics",
    views: 45230,
    comments: 156,
    shares: 89,
    trend: "up",
    trendPercentage: 23,
    publishedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Technology Summit Reveals Future Innovations",
    category: "Technology",
    views: 38750,
    comments: 203,
    shares: 145,
    trend: "up",
    trendPercentage: 18,
    publishedAt: "2024-01-15T08:15:00Z",
  },
  {
    id: 3,
    title: "Sports Championship Final Results",
    category: "Sports",
    views: 52100,
    comments: 89,
    shares: 67,
    trend: "down",
    trendPercentage: -5,
    publishedAt: "2024-01-14T20:45:00Z",
  },
  {
    id: 4,
    title: "Climate Change Summit Concludes with New Agreements",
    category: "Environment",
    views: 67890,
    comments: 234,
    shares: 178,
    trend: "up",
    trendPercentage: 31,
    publishedAt: "2024-01-14T16:20:00Z",
  },
  {
    id: 5,
    title: "Healthcare Reform Bill Passes Parliament",
    category: "Politics",
    views: 34567,
    comments: 145,
    shares: 98,
    trend: "up",
    trendPercentage: 15,
    publishedAt: "2024-01-14T12:10:00Z",
  },
  {
    id: 6,
    title: "New Smartphone Features Revolutionize Mobile Experience",
    category: "Technology",
    views: 56789,
    comments: 178,
    shares: 134,
    trend: "up",
    trendPercentage: 27,
    publishedAt: "2024-01-13T14:30:00Z",
  },
  {
    id: 7,
    title: "International Trade Agreement Signed",
    category: "Business",
    views: 41234,
    comments: 123,
    shares: 87,
    trend: "down",
    trendPercentage: -8,
    publishedAt: "2024-01-13T09:45:00Z",
  },
  {
    id: 8,
    title: "Cultural Festival Draws Massive Crowds",
    category: "Entertainment",
    views: 29876,
    comments: 167,
    shares: 145,
    trend: "up",
    trendPercentage: 22,
    publishedAt: "2024-01-12T18:15:00Z",
  },
];

// Dummy trending topics data
export const dummyTrendingTopics: TrendingTopic[] = [
  { topic: "Economic Policy", mentions: 1250, trend: "up" },
  { topic: "Technology Summit", mentions: 980, trend: "up" },
  { topic: "Championship Final", mentions: 756, trend: "down" },
  { topic: "Climate Change", mentions: 645, trend: "up" },
  { topic: "Healthcare Reform", mentions: 523, trend: "up" },
  { topic: "Smartphone Innovation", mentions: 489, trend: "up" },
  { topic: "Trade Agreement", mentions: 387, trend: "down" },
  { topic: "Cultural Festival", mentions: 298, trend: "up" },
];

// Dummy trending statistics
export const dummyTrendingStats: TrendingStats = {
  totalArticles: dummyTrendingArticles.length,
  totalEngagement: dummyTrendingArticles.reduce(
    (sum, article) => sum + article.views + article.comments + article.shares,
    0
  ),
  hotTopics: dummyTrendingTopics.length,
  viralContent: dummyTrendingArticles.filter((article) => article.views > 40000)
    .length,
};

// Dummy trending analytics
export const dummyTrendingAnalytics: TrendingAnalytics = {
  totalImpressions: 2500000,
  engagementRate: 45200,
  sharesToday: 1800,
  trendingScore: 95,
  impressionChange: 12,
  engagementChange: 8,
  sharesChange: -3,
  scoreChange: 5,
};

// Helper functions
export const getTrendingArticlesByCategory = (
  category: string
): TrendingArticle[] => {
  return dummyTrendingArticles.filter(
    (article) => article.category === category
  );
};

export const getTopTrendingArticles = (
  limit: number = 5
): TrendingArticle[] => {
  return [...dummyTrendingArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getTrendingTopicsByTrend = (
  trend: "up" | "down"
): TrendingTopic[] => {
  return dummyTrendingTopics.filter((topic) => topic.trend === trend);
};
