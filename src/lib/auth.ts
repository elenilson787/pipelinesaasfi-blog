import type { AuthToken } from '../types';

const AUTH_STORAGE_KEY = 'blog_auth_token';
const REFRESH_TOKEN_KEY = 'blog_refresh_token';
const USER_STORAGE_KEY = 'blog_user';

// Demo credentials - Replace with real authentication
const DEMO_CREDENTIALS = {
  email: 'admin@pipelineasafi.com',
  password: 'Admin@2024', // Change this!
};

export const authService = {
  async login(email: string, password: string): Promise<AuthToken> {
    // In production, this should call your backend API
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const token = this.generateToken();
      const refreshToken = this.generateToken();
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(AUTH_STORAGE_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
          email,
          username: 'Admin',
          role: 'admin',
        }));
      }

      return {
        token,
        expiresIn: 86400,
        refreshToken,
      };
    }

    throw new Error('Credenciais inválidas');
  },

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(AUTH_STORAGE_KEY);
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  getUser(): any {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem(USER_STORAGE_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },
};
