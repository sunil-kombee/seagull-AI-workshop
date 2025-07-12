import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/contexts/CartContext";

type User = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  isAuthenticated: boolean;
  purchasedServices?: CartItem[];
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  addPurchasedServices: (items: CartItem[]) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () =>
        set({
          user: null,
        }),
      isAuthenticated: () => {
        const { user } = get();
        return user?.isAuthenticated || false;
      },
      addPurchasedServices: (items) => {
        set((state) => {
          if (!state.user) return {};
          return {
            user: {
              ...state.user,
              purchasedServices: [
                ...(state.user.purchasedServices || []),
                ...items,
              ],
            },
          };
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
