import { Comment } from "@/types/comment";

// Dummy comments data for admin comments management
export const dummyComments: Comment[] = [
  {
    id: 1,
    author: "John Doe",
    email: "john@example.com",
    content: "This is a great article! Very informative and well-written.",
    article: "Breaking: Major Economic Policy Changes Announced",
    status: "approved",
    date: "2024-01-15",
    likes: 12,
    dislikes: 2,
    replies: 3,
  },
  {
    id: 2,
    author: "Jane Smith",
    email: "jane@example.com",
    content:
      "I disagree with some points mentioned in this article. The analysis seems biased.",
    article: "Technology Trends Shaping the Future",
    status: "pending",
    date: "2024-01-14",
    likes: 5,
    dislikes: 8,
    replies: 1,
  },
  {
    id: 3,
    author: "Mike Johnson",
    email: "mike@example.com",
    content: "Excellent coverage of the championship! Keep up the good work.",
    article: "Sports Update: Championship Results",
    status: "approved",
    date: "2024-01-13",
    likes: 25,
    dislikes: 0,
    replies: 7,
  },
  {
    id: 4,
    author: "Anonymous User",
    email: "spam@fake.com",
    content: "This is spam content with inappropriate language and links.",
    article: "Health & Wellness: New Research Findings",
    status: "flagged",
    date: "2024-01-12",
    likes: 0,
    dislikes: 15,
    replies: 0,
  },
  {
    id: 5,
    author: "Sarah Wilson",
    email: "sarah@example.com",
    content:
      "Thank you for bringing attention to this important issue. More people need to be aware of this.",
    article: "Environmental Concerns in Urban Areas",
    status: "approved",
    date: "2024-01-11",
    likes: 18,
    dislikes: 1,
    replies: 4,
  },
  {
    id: 6,
    author: "David Brown",
    email: "david@example.com",
    content:
      "The statistics mentioned here don't seem accurate. Can you provide sources?",
    article: "Market Analysis: Stock Performance Review",
    status: "pending",
    date: "2024-01-10",
    likes: 3,
    dislikes: 12,
    replies: 2,
  },
  {
    id: 7,
    author: "Lisa Chen",
    email: "lisa@example.com",
    content:
      "This article changed my perspective on the topic completely. Great work!",
    article: "Cultural Heritage Preservation Efforts",
    status: "approved",
    date: "2024-01-09",
    likes: 31,
    dislikes: 0,
    replies: 8,
  },
  {
    id: 8,
    author: "Robert Taylor",
    email: "robert@example.com",
    content:
      "Contains misleading information. This should be corrected immediately.",
    article: "Scientific Breakthrough in Medical Research",
    status: "flagged",
    date: "2024-01-08",
    likes: 1,
    dislikes: 22,
    replies: 1,
  },
  {
    id: 9,
    author: "Maria Garcia",
    email: "maria@example.com",
    content:
      "As someone working in this field, I can confirm the accuracy of this report.",
    article: "Industry Trends and Future Predictions",
    status: "approved",
    date: "2024-01-07",
    likes: 14,
    dislikes: 0,
    replies: 3,
  },
  {
    id: 10,
    author: "James Wilson",
    email: "james@example.com",
    content:
      "The writing style is too technical. Consider simplifying for general audience.",
    article: "Advanced Technology Implementation",
    status: "pending",
    date: "2024-01-06",
    likes: 7,
    dislikes: 5,
    replies: 2,
  },
];

// Helper functions for comment management
export const getCommentsByStatus = (status: Comment["status"]): Comment[] => {
  return dummyComments.filter((comment) => comment.status === status);
};

export const getCommentById = (id: number): Comment | undefined => {
  return dummyComments.find((comment) => comment.id === id);
};

export const getCommentsStats = () => {
  return {
    total: dummyComments.length,
    approved: dummyComments.filter((c) => c.status === "approved").length,
    pending: dummyComments.filter((c) => c.status === "pending").length,
    flagged: dummyComments.filter((c) => c.status === "flagged").length,
    rejected: dummyComments.filter((c) => c.status === "rejected").length,
  };
};
