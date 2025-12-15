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
  image_url?: string;
  category: Category;
  author?: Author;
  reporter: Author;
  publishedAt?: string;
  videoUrl?: string; 
  youtubeId?: string; 
};
