import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'cyber-neon' | 'galaxy' | 'matrix' | 'black-gold' | 'minimal';
export type Plan = 'free' | 'starter' | 'pro';

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  plan: Plan;
  videoUsed: number;
  imageUsed: number;
  videoLimit: number;
  imageLimit: number;
  createdAt: string;
  referralCode: string;
}

export interface Project {
  id: string;
  userId: string;
  type: string;
  prompt: string;
  resultUrl?: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: string;
  prompt: string;
  imageUrl: string;
  likes: number;
  downloads: number;
  createdAt: string;
  liked?: boolean;
}

interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;

  // UI
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;

  // Data
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Gallery
  galleryItems: GalleryItem[];
  likeGalleryItem: (id: string) => void;

  // Referral
  referralCode: string;
  referredUsers: number;
  rewardCount: number;

  // Usage
  incrementVideoUsage: () => void;
  incrementImageUsage: () => void;
  canUseVideo: () => boolean;
  canUseImage: () => boolean;

  // Loading
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    userId: 'u1',
    userName: 'Sarah Chen',
    userAvatar: '/images/avatars/avatar1.jpg',
    type: 'Text to Image',
    prompt: 'Cyberpunk cityscape at night with neon lights',
    imageUrl: '/images/gallery/gallery1.jpg',
    likes: 234,
    downloads: 89,
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'g2',
    userId: 'u2',
    userName: 'Alex Rivera',
    userAvatar: '/images/avatars/avatar2.jpg',
    type: 'Text to Image',
    prompt: 'Fantasy floating crystal islands in cosmic sky',
    imageUrl: '/images/gallery/gallery2.jpg',
    likes: 189,
    downloads: 67,
    createdAt: '2026-05-31T14:30:00Z',
  },
  {
    id: 'g3',
    userId: 'u3',
    userName: 'Emily Watson',
    userAvatar: '/images/avatars/avatar3.jpg',
    type: 'Text to Image',
    prompt: 'Futuristic sports car in neon-lit garage',
    imageUrl: '/images/gallery/gallery3.jpg',
    likes: 312,
    downloads: 124,
    createdAt: '2026-05-30T09:15:00Z',
  },
  {
    id: 'g4',
    userId: 'u4',
    userName: 'Marcus Johnson',
    userAvatar: '/images/avatars/avatar4.jpg',
    type: 'Text to Image',
    prompt: 'Human eye made of circuit boards and data streams',
    imageUrl: '/images/gallery/gallery4.jpg',
    likes: 456,
    downloads: 198,
    createdAt: '2026-05-29T16:45:00Z',
  },
  {
    id: 'g5',
    userId: 'u1',
    userName: 'Sarah Chen',
    userAvatar: '/images/avatars/avatar1.jpg',
    type: 'Text to Image',
    prompt: 'Digital dragon flying through cyberpunk city',
    imageUrl: '/images/gallery/gallery5.jpg',
    likes: 278,
    downloads: 102,
    createdAt: '2026-05-28T11:20:00Z',
  },
  {
    id: 'g6',
    userId: 'u2',
    userName: 'Alex Rivera',
    userAvatar: '/images/avatars/avatar2.jpg',
    type: 'Text to Image',
    prompt: 'Futuristic luxury apartment with holographic displays',
    imageUrl: '/images/gallery/gallery6.jpg',
    likes: 367,
    downloads: 145,
    createdAt: '2026-05-27T08:00:00Z',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'cyber-neon',
      setTheme: (theme) => set({ theme }),

      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // UI
      isSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      activeTool: 'text-to-image',
      setActiveTool: (tool) => set({ activeTool: tool }),

      // Data
      projects: [],
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      // Gallery
      galleryItems: defaultGalleryItems,
      likeGalleryItem: (id) =>
        set((state) => ({
          galleryItems: state.galleryItems.map((item) =>
            item.id === id
              ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
              : item
          ),
        })),

      // Referral
      referralCode: '',
      referredUsers: 0,
      rewardCount: 0,

      // Usage
      incrementVideoUsage: () =>
        set((state) => ({
          user: state.user
            ? { ...state.user, videoUsed: state.user.videoUsed + 1 }
            : null,
        })),
      incrementImageUsage: () =>
        set((state) => ({
          user: state.user
            ? { ...state.user, imageUsed: state.user.imageUsed + 1 }
            : null,
        })),
      canUseVideo: () => {
        const { user } = get();
        if (!user) return false;
        if (user.plan === 'pro') return true;
        return user.videoUsed < user.videoLimit;
      },
      canUseImage: () => {
        const { user } = get();
        if (!user) return false;
        if (user.plan === 'pro') return true;
        return user.imageUsed < user.imageLimit;
      },

      // Loading
      isGenerating: false,
      setIsGenerating: (value) => set({ isGenerating: value }),

      // Toast
      toast: null,
      showToast: (message, type = 'info') => set({ toast: { message, type } }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'nexora-forge-storage',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        projects: state.projects,
        referralCode: state.referralCode,
        referredUsers: state.referredUsers,
        rewardCount: state.rewardCount,
      }),
    }
  )
);
