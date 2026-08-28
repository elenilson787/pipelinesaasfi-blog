export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalComments: number;
  totalCategories: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
  refreshToken: string;
}
