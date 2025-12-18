import {
  AnalyticsStat,
  TopArticle,
  TrafficSource,
  DeviceStat,
  RealTimeActivity,
  AnalyticsData,
  AnalyticsMetrics,
} from "@/types/analytics";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";

// Analytics stats data
export const dummyAnalyticsStats: AnalyticsStat[] = [
  {
    title: "Total Page Views",
    value: "2,847,293",
    change: "+23%",
    changeType: "positive",
    icon: Eye,
  },
  {
    title: "Unique Visitors",
    value: "184,920",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    change: "+8%",
    changeType: "positive",
    icon: Clock,
  },
  {
    title: "Bounce Rate",
    value: "34.2%",
    change: "-5%",
    changeType: "positive",
    icon: TrendingUp,
  },
];

// Top articles data
export const dummyTopArticles: TopArticle[] = [
  {
    title: "Breaking: Major Economic Policy Changes",
    views: 45620,
    change: "+15%",
  },
  {
    title: "Technology Trends Shaping the Future",
    views: 38940,
    change: "+8%",
  },
  {
    title: "Sports Update: Championship Results",
    views: 32150,
    change: "+22%",
  },
  {
    title: "Health & Wellness: New Research",
    views: 28730,
    change: "+5%",
  },
  {
    title: "Political Analysis: Election Updates",
    views: 25680,
    change: "+12%",
  },
  {
    title: "Entertainment Industry Growth",
    views: 23450,
    change: "+18%",
  },
  {
    title: "Climate Change Initiatives",
    views: 21200,
    change: "+9%",
  },
  {
    title: "Business Market Analysis",
    views: 19800,
    change: "+14%",
  },
];

// Traffic sources data
export const dummyTrafficSources: TrafficSource[] = [
  { source: "Direct", percentage: 45, visitors: 83214 },
  { source: "Search Engines", percentage: 32, visitors: 59174 },
  { source: "Social Media", percentage: 15, visitors: 27738 },
  { source: "Referrals", percentage: 8, visitors: 14794 },
];

// Device statistics data
export const dummyDeviceStats: DeviceStat[] = [
  { device: "Desktop", percentage: 52, icon: Monitor },
  { device: "Mobile", percentage: 41, icon: Smartphone },
  { device: "Tablet", percentage: 7, icon: Globe },
];

// Real-time activity data
export const dummyRealTimeActivity: RealTimeActivity = {
  activeUsers: 1247,
  pagesPerSession: 89,
  avgSessionTime: "2m 34s",
};

// Complete analytics data
export const dummyAnalyticsData: AnalyticsData = {
  stats: dummyAnalyticsStats,
  topArticles: dummyTopArticles,
  trafficSources: dummyTrafficSources,
  deviceStats: dummyDeviceStats,
  realTimeActivity: dummyRealTimeActivity,
  timeRange: "7d",
};

// Analytics metrics for calculations
export const dummyAnalyticsMetrics: AnalyticsMetrics = {
  totalPageViews: 2847293,
  uniqueVisitors: 184920,
  avgSessionDuration: "4m 32s",
  bounceRate: "34.2%",
  pageViewsChange: 23,
  visitorsChange: 12,
  sessionChange: 8,
  bounceChange: -5,
};

// Helper functions
export const getTopArticlesByViews = (limit: number = 5): TopArticle[] => {
  return [...dummyTopArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getTrafficSourceByVisitors = (): TrafficSource[] => {
  return [...dummyTrafficSources].sort((a, b) => b.visitors - a.visitors);
};

export const getDeviceStatsByPercentage = (): DeviceStat[] => {
  return [...dummyDeviceStats].sort((a, b) => b.percentage - a.percentage);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};
