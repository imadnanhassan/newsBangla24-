import {
  ModerationItem,
  ModerationStats,
  ModerationGuidelines,
  ModerationData,
} from "@/types/moderation";

// Dummy moderation queue data
export const dummyModerationQueue: ModerationItem[] = [
  {
    id: 1,
    type: "comment",
    content: "This article is completely biased and misleading!",
    author: "user123",
    article: "Economic Policy Analysis",
    reportReason: "Inappropriate content",
    reportedBy: "user456",
    status: "pending",
    createdAt: "2024-01-15T14:30:00Z",
    priority: "high",
    reviewer: undefined,
    notes: undefined,
  },
  {
    id: 2,
    type: "article",
    content: "Breaking: Unverified claims about government corruption",
    author: "reporter789",
    article: "",
    reportReason: "Misinformation",
    reportedBy: "user789",
    status: "pending",
    createdAt: "2024-01-15T13:15:00Z",
    priority: "critical",
    reviewer: undefined,
    notes: undefined,
  },
  {
    id: 3,
    type: "comment",
    content: "Great article, very informative!",
    author: "reader456",
    article: "Technology Summit Coverage",
    reportReason: "Spam",
    reportedBy: "user123",
    status: "reviewed",
    createdAt: "2024-01-15T11:00:00Z",
    reviewedAt: "2024-01-15T12:00:00Z",
    priority: "low",
    reviewer: "admin1",
    notes: "False positive - content is appropriate",
  },
  {
    id: 4,
    type: "user",
    content: "Profile contains offensive username and avatar",
    author: "offensive_user",
    reportReason: "Harassment",
    reportedBy: "user999",
    status: "pending",
    createdAt: "2024-01-15T10:45:00Z",
    priority: "high",
    reviewer: undefined,
    notes: undefined,
  },
  {
    id: 5,
    type: "comment",
    content: "This is pure hate speech and should be banned!",
    author: "troll456",
    article: "Political Debate Article",
    reportReason: "Hate speech",
    reportedBy: "user777",
    status: "pending",
    createdAt: "2024-01-15T09:30:00Z",
    priority: "critical",
    reviewer: undefined,
    notes: undefined,
  },
  {
    id: 6,
    type: "post",
    content: "Fake news about celebrity scandal",
    author: "clickbait_user",
    reportReason: "Misinformation",
    reportedBy: "fact_checker",
    status: "approved",
    createdAt: "2024-01-14T16:20:00Z",
    reviewedAt: "2024-01-14T17:00:00Z",
    priority: "medium",
    reviewer: "moderator2",
    notes: "Content verified and removed",
  },
  {
    id: 7,
    type: "comment",
    content: "Constructive feedback about the article structure",
    author: "helpful_reader",
    article: "Data Science Tutorial",
    reportReason: "Spam",
    reportedBy: "auto_filter",
    status: "rejected",
    createdAt: "2024-01-14T14:15:00Z",
    reviewedAt: "2024-01-14T14:30:00Z",
    priority: "low",
    reviewer: "moderator1",
    notes: "Legitimate feedback, not spam",
  },
  {
    id: 8,
    type: "article",
    content: "Sensationalized reporting on local incident",
    author: "sensationalist_writer",
    reportReason: "Yellow journalism",
    reportedBy: "journalism_ethics",
    status: "pending",
    createdAt: "2024-01-14T11:00:00Z",
    priority: "medium",
    reviewer: undefined,
    notes: undefined,
  },
];

// Dummy moderation statistics
export const dummyModerationStats: ModerationStats = {
  pendingReview: dummyModerationQueue.filter(
    (item) => item.status === "pending"
  ).length,
  criticalIssues: dummyModerationQueue.filter(
    (item) => item.priority === "critical" && item.status === "pending"
  ).length,
  approvedToday: dummyModerationQueue.filter(
    (item) =>
      item.status === "approved" && item.reviewedAt?.startsWith("2024-01-15")
  ).length,
  rejectedToday: dummyModerationQueue.filter(
    (item) =>
      item.status === "rejected" && item.reviewedAt?.startsWith("2024-01-15")
  ).length,
  totalReviewed: dummyModerationQueue.filter(
    (item) => item.status !== "pending"
  ).length,
  averageResponseTime: "2.5 hours",
};

// Dummy moderation guidelines
export const dummyModerationGuidelines: ModerationGuidelines = {
  rejectContent: [
    "Hate speech or discriminatory content",
    "Misinformation or false claims",
    "Spam or promotional content",
    "Personal attacks or harassment",
    "Inappropriate or offensive language",
    "Copyright infringement",
    "Illegal content or activities",
    "Doxxing or privacy violations",
  ],
  approveContent: [
    "Constructive criticism or feedback",
    "Factual information with sources",
    "Respectful disagreement or debate",
    "Relevant questions or clarifications",
    "Positive engagement and discussion",
    "Educational or informative content",
    "Personal opinions (when respectful)",
    "Community building discussions",
  ],
  priorityLevels: {
    critical:
      "Immediate action required - hate speech, threats, illegal content",
    high: "Urgent review needed - misinformation, harassment, spam",
    medium: "Review within 24 hours - quality concerns, disputes",
    low: "Review when possible - minor issues, false positives",
  },
};

// Complete moderation data
export const dummyModerationData: ModerationData = {
  queue: dummyModerationQueue,
  stats: dummyModerationStats,
  guidelines: dummyModerationGuidelines,
};

// Helper functions
export const getModerationItemsByStatus = (
  status: ModerationItem["status"]
): ModerationItem[] => {
  return dummyModerationQueue.filter((item) => item.status === status);
};

export const getModerationItemsByPriority = (
  priority: ModerationItem["priority"]
): ModerationItem[] => {
  return dummyModerationQueue.filter((item) => item.priority === priority);
};

export const getModerationItemsByType = (
  type: ModerationItem["type"]
): ModerationItem[] => {
  return dummyModerationQueue.filter((item) => item.type === type);
};

export const getModerationItemById = (
  id: number
): ModerationItem | undefined => {
  return dummyModerationQueue.find((item) => item.id === id);
};

export const getPendingItemsCount = (): number => {
  return dummyModerationQueue.filter((item) => item.status === "pending")
    .length;
};

export const getCriticalItemsCount = (): number => {
  return dummyModerationQueue.filter(
    (item) => item.priority === "critical" && item.status === "pending"
  ).length;
};
