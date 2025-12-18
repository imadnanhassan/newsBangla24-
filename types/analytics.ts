export interface AnalyticsStat {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
}

export interface TopArticle {
  title: string;
  views: number;
  change: string;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  visitors: number;
}

export interface DeviceStat {
  device: string;
  percentage: number;
  icon: any;
}

export interface RealTimeActivity {
  activeUsers: number;
  pagesPerSession: number;
  avgSessionTime: string;
}

export interface AnalyticsData {
  stats: AnalyticsStat[];
  topArticles: TopArticle[];
  trafficSources: TrafficSource[];
  deviceStats: DeviceStat[];
  realTimeActivity: RealTimeActivity;
  timeRange: string;
}

export interface AnalyticsMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: string;
  pageViewsChange: number;
  visitorsChange: number;
  sessionChange: number;
  bounceChange: number;
}
