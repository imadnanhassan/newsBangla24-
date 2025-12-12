export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  id: string;
  name: string;
  avatar?: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image?: string;
  category: Category;
  author?: Author;
  publishedAt?: string;
  videoUrl?: string; // Support for direct video URLs
  youtubeId?: string; // Support for YouTube video IDs
};
