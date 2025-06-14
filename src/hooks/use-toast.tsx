"use client";

import * as React from "react";
import { create } from "zustand";

interface Toast {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  id: string;
  variant?: "default" | "destructive";
}

interface ToastAction {
  toast: (options: Partial<Toast>) => void;
  dismiss: (toastId?: string) => void;
  toasts: Toast[];
}

const useStore = create<ToastAction>()((set, get) => ({
  toasts: [],
  toast: (options: Partial<Toast>) => {
    const id = Math.random().toString(36).substring(2, 9);
    set({
      toasts: [...get().toasts, { id, ...options }]
    });
  },
  dismiss: (toastId?: string) => {
    set({
      toasts: get().toasts.filter((toast) => !toastId || toast.id !== toastId)
    });
  }
}));

export function useToast() {
  return useStore();
}
