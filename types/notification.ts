export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "breaking" | "digest" | "sports" | "weather" | "general";
  status: "sent" | "scheduled" | "draft" | "failed";
  recipients: number;
  sentAt?: string;
  scheduledAt?: string;
  createdAt?: string;
  openRate: number;
}

export type NotificationStatus = Notification["status"];
export type NotificationType = Notification["type"];

export interface NotificationStats {
  totalSent: number;
  subscribers: number;
  openRate: number;
  scheduled: number;
}

export interface NotificationAnalytics {
  totalDeliveries: number;
  averageOpenRate: number;
  clickThroughRate: number;
  bounceRate: number;
  deliveryChange: number;
  openRateChange: number;
  clickRateChange: number;
  bounceRateChange: number;
}
