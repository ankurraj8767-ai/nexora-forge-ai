import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  plan: 'free' | 'starter' | 'pro';
  videoUsed: number;
  imageUsed: number;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexora_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      uid: 'user_' + Math.random().toString(36).slice(2, 9),
      name: email.split('@')[0],
      email,
      photoURL: DEFAULT_AVATARS[0],
      plan: 'free',
      videoUsed: 0,
      imageUsed: 0,
      role: email.includes('admin') ? 'admin' : 'user',
    };
    setUser(mockUser);
    localStorage.setItem('nexora_user', JSON.stringify(mockUser));
  }, []);

  const googleLogin = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      uid: 'google_' + Math.random().toString(36).slice(2, 9),
      name: 'Creator User',
      email: 'creator@example.com',
      photoURL: DEFAULT_AVATARS[1],
      plan: 'pro',
      videoUsed: 12,
      imageUsed: 45,
      role: 'user',
    };
    setUser(mockUser);
    localStorage.setItem('nexora_user', JSON.stringify(mockUser));
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      uid: 'user_' + Math.random().toString(36).slice(2, 9),
      name,
      email,
      photoURL: DEFAULT_AVATARS[0],
      plan: 'free',
      videoUsed: 0,
      imageUsed: 0,
      role: 'user',
    };
    setUser(mockUser);
    localStorage.setItem('nexora_user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('nexora_user');
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log('Password reset email sent to:', email);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('nexora_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      googleLogin,
      register,
      logout,
      resetPassword,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
