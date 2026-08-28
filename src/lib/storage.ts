import type { BlogPost, Category, Comment } from '../types';

const POSTS_KEY = 'blog_posts';
const CATEGORIES_KEY = 'blog_categories';
const COMMENTS_KEY = 'blog_comments';

// Initialize with demo data
const initializeDemoData = () => {
  if (typeof localStorage === 'undefined') return;

  if (!localStorage.getItem(POSTS_KEY)) {
    const demoPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Bem-vindo ao meu Blog',
        slug: 'bem-vindo-ao-meu-blog',
        content: 'Este é o primeiro post do blog. Você pode criar novos posts, editar e deletar através do painel administrativo.',
        excerpt: 'Introdução ao blog',
        author: 'Admin',
        category: 'geral',
        tags: ['welcome', 'blog'],
        image: 'https://via.placeholder.com/800x400',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 42,
      },
    ];
    localStorage.setItem(POSTS_KEY, JSON.stringify(demoPosts));
  }

  if (!localStorage.getItem(CATEGORIES_KEY)) {
    const demoCategories: Category[] = [
      {
        id: '1',
        name: 'Geral',
        slug: 'geral',
        description: 'Posts gerais do blog',
      },
      {
        id: '2',
        name: 'Tecnologia',
        slug: 'tecnologia',
        description: 'Posts sobre tecnologia',
      },
    ];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(demoCategories));
  }
};

export const storageService = {
  // Posts
  getPosts(): BlogPost[] {
    if (typeof localStorage === 'undefined') return [];
    initializeDemoData();
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  },

  getPost(id: string): BlogPost | undefined {
    return this.getPosts().find(p => p.id === id);
  },

  savePost(post: BlogPost): void {
    if (typeof localStorage === 'undefined') return;
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index >= 0) {
      posts[index] = { ...post, updatedAt: new Date().toISOString() };
    } else {
      posts.push({ ...post, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  deletePost(id: string): void {
    if (typeof localStorage === 'undefined') return;
    const posts = this.getPosts().filter(p => p.id !== id);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  // Categories
  getCategories(): Category[] {
    if (typeof localStorage === 'undefined') return [];
    initializeDemoData();
    const categories = localStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  },

  saveCategory(category: Category): void {
    if (typeof localStorage === 'undefined') return;
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === category.id);
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  deleteCategory(id: string): void {
    if (typeof localStorage === 'undefined') return;
    const categories = this.getCategories().filter(c => c.id !== id);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  // Comments
  getComments(): Comment[] {
    if (typeof localStorage === 'undefined') return [];
    const comments = localStorage.getItem(COMMENTS_KEY);
    return comments ? JSON.parse(comments) : [];
  },

  getPostComments(postId: string): Comment[] {
    return this.getComments().filter(c => c.postId === postId);
  },

  saveComment(comment: Comment): void {
    if (typeof localStorage === 'undefined') return;
    const comments = this.getComments();
    const index = comments.findIndex(c => c.id === comment.id);
    if (index >= 0) {
      comments[index] = comment;
    } else {
      comments.push(comment);
    }
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  },

  deleteComment(id: string): void {
    if (typeof localStorage === 'undefined') return;
    const comments = this.getComments().filter(c => c.id !== id);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  },
};
