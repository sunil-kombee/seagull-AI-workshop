import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Service } from "@/data/services";

export interface CartItem extends Service {
  quantity: number;
  bookingDate?: string;
  bookingTime?: string;
  selectedAddOns?: { name: string; price: number }[];
}

type CartStore = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (
    service: Service,
    quantity?: number,
    bookingDate?: Date,
    bookingTime?: string,
    selectedAddOns?: { name: string; price: number }[]
  ) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  setIsCartOpen: (open: boolean) => void;
};

// SSR-safe: Only access localStorage in the browser
type CartStorageState = {
  state: { cartItems?: CartItem[]; isCartOpen?: boolean };
};
let initialCartItems: CartItem[] = [];
let initialIsCartOpen = false;
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("cart-storage");
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as CartStorageState;
      if (parsed.state) {
        initialCartItems = parsed.state.cartItems || [];
        initialIsCartOpen = parsed.state.isCartOpen || false;
      }
    } catch (e) {
      // ignore parse errors
    }
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: initialCartItems,
      isCartOpen: initialIsCartOpen,
      addToCart: (
        service,
        quantity = 1,
        bookingDate,
        bookingTime,
        selectedAddOns
      ) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) =>
              item.id === service.id &&
              item.bookingDate ===
                (bookingDate ? bookingDate.toISOString() : undefined) &&
              item.bookingTime === bookingTime &&
              JSON.stringify(item.selectedAddOns) ===
                JSON.stringify(selectedAddOns)
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === service.id &&
                item.bookingDate ===
                  (bookingDate ? bookingDate.toISOString() : undefined) &&
                item.bookingTime === bookingTime &&
                JSON.stringify(item.selectedAddOns) ===
                  JSON.stringify(selectedAddOns)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cartItems: [
              ...state.cartItems,
              {
                ...service,
                quantity,
                bookingDate: bookingDate
                  ? bookingDate.toISOString()
                  : undefined,
                bookingTime,
                selectedAddOns,
              },
            ],
          };
        });
      },
      removeFromCart: (serviceId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== serviceId),
        }));
      },
      updateQuantity: (serviceId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(serviceId);
        } else {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === serviceId ? { ...item, quantity } : item
            ),
          }));
        }
      },
      clearCart: () => set({ cartItems: [] }),
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
          const addOnsTotal =
            item.selectedAddOns?.reduce((sum, a) => sum + a.price, 0) || 0;
          return total + (item.price + addOnsTotal) * item.quantity;
        }, 0);
      },
      getItemCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
      setIsCartOpen: (open) => set({ isCartOpen: open }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        isCartOpen: state.isCartOpen,
      }),
    }
  )
);
