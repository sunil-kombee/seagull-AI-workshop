"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  isAuthenticated: boolean;
  role?: string;
  token?: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user:
        typeof window !== "undefined" && localStorage.getItem("admin_user")
          ? JSON.parse(localStorage.getItem("admin_user") || "{}")
          : null,
      setUser: (user) => set({ user }),
      logout: () =>
        set({
          user: null,
        }),
      isAuthenticated: () => {
        const { user } = get();
        return user?.isAuthenticated || false;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
