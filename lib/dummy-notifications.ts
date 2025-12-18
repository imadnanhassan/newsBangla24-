import {
  Notification,
  NotificationStats,
  NotificationAnalytics,
} from "@/types/notification";

// Dummy notifications data
export const dummyNotifications: Notification[] = [
  {
    id: 1,
    title: "Breaking News Alert",
    message: "Major economic policy announcement scheduled for 3 PM",
    type: "breaking",
    status: "sent",
    recipients: 15420,
    sentAt: "2024-01-15T14:30:00Z",
    openRate: 68,
  },
  {
    id: 2,
    title: "Daily News Digest",
    message: "Your daily summary of top stories and trending topics",
    type: "digest",
    status: "scheduled",
    recipients: 25680,
    scheduledAt: "2024-01-16T08:00:00Z",
    openRate: 0,
  },
  {
    id: 3,
    title: "Sports Update",
    message: "Championship final results and highlights available now",
    type: "sports",
    status: "draft",
    recipients: 0,
    createdAt: "2024-01-15T16:20:00Z",
    openRate: 0,
  },
  {
    id: 4,
    title: "Weather Alert",
    message: "Heavy rainfall expected in coastal areas. Stay safe!",
    type: "weather",
    status: "sent",
    recipients: 18750,
    sentAt: "2024-01-15T06:00:00Z",
    openRate: 45,
  },
  {
    id: 5,
    title: "Weekly Politics Roundup",
    message: "Key political developments from the past week",
    type: "general",
    status: "scheduled",
    recipients: 32100,
    scheduledAt: "2024-01-17T10:00:00Z",
    openRate: 0,
  },
  {
    id: 6,
    title: "Entertainment News Flash",
    message: "Celebrity news and entertainment updates",
    type: "general",
    status: "sent",
    recipients: 22340,
    sentAt: "2024-01-14T18:30:00Z",
    openRate: 72,
  },
  {
    id: 7,
    title: "Technology Breakthrough",
    message: "New AI developments that will change the industry",
    type: "general",
    status: "draft",
    recipients: 0,
    createdAt: "2024-01-15T12:15:00Z",
    openRate: 0,
  },
  {
    id: 8,
    title: "Market Update",
    message: "Stock market performance and economic indicators",
    type: "general",
    status: "failed",
    recipients: 15670,
    sentAt: "2024-01-14T09:00:00Z",
    openRate: 0,
  },
];

// Dummy notification statistics
export const dummyNotificationStats: NotificationStats = {
  totalSent: dummyNotifications.filter((n) => n.status === "sent").length,
  subscribers: 28500,
  openRate: Math.round(
    dummyNotifications
      .filter((n) => n.status === "sent")
      .reduce((sum, n) => sum + n.openRate, 0) /
      dummyNotifications.filter((n) => n.status === "sent").length
  ),
  scheduled: dummyNotifications.filter((n) => n.status === "scheduled").length,
};

// Dummy notification analytics
export const dummyNotificationAnalytics: NotificationAnalytics = {
  totalDeliveries: 45200,
  averageOpenRate: 72,
  clickThroughRate: 18,
  bounceRate: 3,
  deliveryChange: 12,
  openRateChange: 8,
  clickRateChange: -2,
  bounceRateChange: -5,
};

// Helper functions
export const getNotificationsByStatus = (
  status: Notification["status"]
): Notification[] => {
  return dummyNotifications.filter(
    (notification) => notification.status === status
  );
};

export const getNotificationsByType = (
  type: Notification["type"]
): Notification[] => {
  return dummyNotifications.filter(
    (notification) => notification.type === type
  );
};

export const getNotificationById = (id: number): Notification | undefined => {
  return dummyNotifications.find((notification) => notification.id === id);
};

export const getRecentNotifications = (limit: number = 5): Notification[] => {
  return [...dummyNotifications]
    .sort((a, b) => {
      const aDate = a.sentAt || a.scheduledAt || a.createdAt || "";
      const bDate = b.sentAt || b.scheduledAt || b.createdAt || "";
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    })
    .slice(0, limit);
};
