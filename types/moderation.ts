export interface ModerationItem {
  id: number;
  type: "comment" | "article" | "user" | "post";
  content: string;
  author: string;
  article?: string;
  reportReason: string;
  reportedBy: string;
  status: "pending" | "approved" | "rejected" | "reviewed";
  createdAt: string;
  reviewedAt?: string;
  priority: "critical" | "high" | "medium" | "low";
  reviewer?: string;
  notes?: string;
}

export type ModerationStatus = ModerationItem["status"];
export type ModerationType = ModerationItem["type"];
export type ModerationPriority = ModerationItem["priority"];

export interface ModerationStats {
  pendingReview: number;
  criticalIssues: number;
  approvedToday: number;
  rejectedToday: number;
  totalReviewed: number;
  averageResponseTime: string;
}

export interface ModerationGuidelines {
  rejectContent: string[];
  approveContent: string[];
  priorityLevels: {
    critical: string;
    high: string;
    medium: string;
    low: string;
  };
}

export interface ModerationData {
  queue: ModerationItem[];
  stats: ModerationStats;
  guidelines: ModerationGuidelines;
}
