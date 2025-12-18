export interface Comment {
  id: number;
  author: string;
  email: string;
  content: string;
  article: string;
  status: "approved" | "pending" | "flagged" | "rejected";
  date: string;
  likes: number;
  dislikes: number;
  replies: number;
}

export type CommentStatus = Comment["status"];

export interface CommentStats {
  total: number;
  approved: number;
  pending: number;
  flagged: number;
  rejected: number;
}
