"use client";

import type { Service } from "@/data/services";
import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem extends Service {
  quantity: number;
  bookingDate?: string; // ISO string for serialization
  bookingTime?: string;
  selectedAddOns?: { name: string; price: number }[];
}

interface CartContextType {
  cartItems: CartItem[];
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
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    service: Service,
    quantity: number = 1,
    bookingDate?: Date,
    bookingTime?: string,
    selectedAddOns?: { name: string; price: number }[]
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === service.id &&
          item.bookingDate ===
            (bookingDate ? bookingDate.toISOString() : undefined) &&
          item.bookingTime === bookingTime &&
          JSON.stringify(item.selectedAddOns) === JSON.stringify(selectedAddOns)
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === service.id &&
          item.bookingDate ===
            (bookingDate ? bookingDate.toISOString() : undefined) &&
          item.bookingTime === bookingTime &&
          JSON.stringify(item.selectedAddOns) === JSON.stringify(selectedAddOns)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          ...service,
          quantity,
          bookingDate: bookingDate ? bookingDate.toISOString() : undefined,
          bookingTime,
          selectedAddOns,
        },
      ];
    });
    toast({
      title: "Added to cart",
      description: `${service.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== serviceId)
    );
    toast({
      title: "Removed from cart",
      description: `Item has been removed from your cart.`,
      variant: "destructive",
    });
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === serviceId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const addOnsTotal =
        item.selectedAddOns?.reduce((sum, a) => sum + a.price, 0) || 0;
      return total + (item.price + addOnsTotal) * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
