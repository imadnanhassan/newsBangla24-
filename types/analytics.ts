// Analytics and reporting types
export interface AnalyticsData {
  totalViews: number;
  totalComments: number;
  totalShares: number;
  totalReaders: number;
  viewsChange: number;
  commentsChange: number;
  sharesChange: number;
  readersChange: number;
  period: 'day' | 'week' | 'month' | 'year';
  startDate: string;
  endDate: string;
}

export interface ViewsData {
  date: string;
  views: number;
  uniqueViews: number;
  bounceRate: number;
  avgTimeOnPage: number;
}

export interface EngagementData {
  articleId: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  readingTime: number;
  engagementRate: number;
  publishedAt: string;
}

export interface DeviceStats {
  device: 'mobile' | 'desktop' | 'tablet';
  percentage: number;
  sessions: number;
  bounceRate: number;
}

export interface TrafficSource {
  source: 'direct' | 'social' | 'search' | 'referral' | 'email';
  sessions: number;
  percentage: number;
  bounceRate: number;
}

export interface GeographicData {
  country: string;
  countryCode: string;
  sessions: number;
  percentage: number;
  avgSessionDuration: number;
}

export interface PerformanceMetrics {
  totalArticles: number;
  publishedArticles: number;
  avgViewsPerArticle: number;
  avgEngagementRate: number;
  topPerformingArticle: {
    id: string;
    title: string;
    views: number;
  };
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'article_published' | 'comment_received' | 'article_shared' | 'milestone_reached';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsFilter {
  period: 'day' | 'week' | 'month' | 'year';
  startDate?: string;
  endDate?: string;
  articleIds?: string[];
  categories?: string[];
  authors?: string[];
}