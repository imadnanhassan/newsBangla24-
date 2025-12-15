// Notification related types
export type NotificationType = 
  | 'comment' 
  | 'like' 
  | 'share' 
  | 'view_milestone' 
  | 'article_approved' 
  | 'article_rejected' 
  | 'system_update' 
  | 'reminder'
  | 'mention'
  | 'follow';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  metadata?: NotificationMetadata;
  actionUrl?: string;
  expiresAt?: string;
}

export interface NotificationMetadata {
  articleId?: string;
  commentId?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  count?: number;
  milestone?: number;
  [key: string]: any;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: {
    [K in NotificationType]: boolean;
  };
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string;   // HH:mm format
  };
}

export interface NotificationFilter {
  read?: boolean;
  type?: NotificationType;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}