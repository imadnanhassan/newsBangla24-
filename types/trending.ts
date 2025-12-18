export interface TrendingArticle {
  id: number;
  title: string;
  category: string;
  views: number;
  comments: number;
  shares: number;
  trend: "up" | "down";
  trendPercentage: number;
  publishedAt: string;
}

export interface TrendingTopic {
  topic: string;
  mentions: number;
  trend: "up" | "down";
}

export interface TrendingStats {
  totalArticles: number;
  totalEngagement: number;
  hotTopics: number;
  viralContent: number;
}

export interface TrendingAnalytics {
  totalImpressions: number;
  engagementRate: number;
  sharesToday: number;
  trendingScore: number;
  impressionChange: number;
  engagementChange: number;
  sharesChange: number;
  scoreChange: number;
}
