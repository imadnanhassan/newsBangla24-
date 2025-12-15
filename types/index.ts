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

export type UserRole = 'user' | 'reporter' | 'admin' | 'super_admin';

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  user?: Omit<User, 'password'>;
  token?: string;
  message?: string;
};
