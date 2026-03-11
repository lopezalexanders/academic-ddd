import { create } from 'zustand';

const AUTH_STORAGE_KEY = 'academic_user';

/** Roles del sistema. Coinciden con el backend (nombre del rol). */
export type Role = 'ADMINISTRATOR' | 'STUDENT' | 'TEACHER';

const VALID_ROLES: Role[] = ['ADMINISTRATOR', 'STUDENT', 'TEACHER'];

function isRole(value: unknown): value is Role {
  return typeof value === 'string' && VALID_ROLES.includes(value as Role);
}

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as User;
    return data?.id && isRole(data?.role) ? data : null;
  } catch {
    return null;
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  setUser: (user) => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    set({ user });
  },
}));
