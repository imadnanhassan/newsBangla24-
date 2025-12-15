import { User, UserRole } from '@/types';

export interface SessionUser extends Omit<User, 'password'> {
  sessionId: string;
  expiresAt: number;
}

class SessionManager {
  private static instance: SessionManager;
  private sessions: Map<string, SessionUser> = new Map();
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  createSession(user: Omit<User, 'password'>): SessionUser {
    const sessionId = this.generateSessionId();
    const expiresAt = Date.now() + this.SESSION_DURATION;
    
    const sessionUser: SessionUser = {
      ...user,
      sessionId,
      expiresAt
    };

    this.sessions.set(sessionId, sessionUser);
    
    // Clean up expired sessions
    this.cleanupExpiredSessions();
    
    return sessionUser;
  }

  getSession(sessionId: string): SessionUser | null {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return null;
    }

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(sessionId);
      return null;
    }

    return session;
  }

  refreshSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return false;
    }

    session.expiresAt = Date.now() + this.SESSION_DURATION;
    return true;
  }

  destroySession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  destroyAllUserSessions(userId: string): void {
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.id === userId) {
        this.sessions.delete(sessionId);
      }
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(sessionId);
      }
    }
  }

  // Get active sessions count for monitoring
  getActiveSessionsCount(): number {
    this.cleanupExpiredSessions();
    return this.sessions.size;
  }

  // Get sessions by role for admin monitoring
  getSessionsByRole(role: UserRole): SessionUser[] {
    this.cleanupExpiredSessions();
    return Array.from(this.sessions.values()).filter(session => session.role === role);
  }
}

// Client-side session utilities
export class ClientSession {
  private static readonly USER_KEY = 'user_session';
  private static readonly TOKEN_KEY = 'auth_token';

  static setSession(user: SessionUser, token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);
      
      // Also set as cookie for SSR
      document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${60 * 60 * 24}`;
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`;
    }
  }

  static getSession(): SessionUser | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      if (!userData) return null;
      
      const user = JSON.parse(userData) as SessionUser;
      
      // Check if session is expired
      if (Date.now() > user.expiresAt) {
        this.clearSession();
        return null;
      }
      
      return user;
    } catch {
      return null;
    }
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
      
      // Clear cookies
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  }

  static isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  static hasRole(requiredRole: UserRole): boolean {
    const user = this.getSession();
    return user?.role === requiredRole;
  }

  static hasAnyRole(requiredRoles: UserRole[]): boolean {
    const user = this.getSession();
    return user ? requiredRoles.includes(user.role) : false;
  }

  static refreshSession(): void {
    const user = this.getSession();
    if (user) {
      user.expiresAt = Date.now() + (24 * 60 * 60 * 1000); // Extend by 24 hours
      this.setSession(user, this.getToken() || '');
    }
  }
}

export const sessionManager = SessionManager.getInstance();