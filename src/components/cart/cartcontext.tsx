"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItem } from "@/data/menu";

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (dish: MenuItem, quantity?: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => { item: CartItem; index: number } | null;
  restoreItem: (item: CartItem, index: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  subtotal: number;
  totalQuantity: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "vora_cart_items_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Lazy initialization ensures state is restored cleanly on client-side render
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Synchronize client storage asynchronously to avoid synchronous effect state updates
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setItems(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to restore cart from localStorage", e);
      } finally {
        setIsHydrated(true);
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Save updates to localStorage whenever cart state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isHydrated]);

  const addItem = (dish: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { dish, quantity }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: number) => {
    let removedData: { item: CartItem; index: number } | null = null;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.dish.id === id);
      if (idx > -1) {
        removedData = { item: prev[idx], index: idx };
        return prev.filter((i) => i.dish.id !== id);
      }
      return prev;
    });
    return removedData;
  };

  const restoreItem = (item: CartItem, index: number) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.dish.id === item.dish.id);
      if (exists) return prev;
      const next = [...prev];
      next.splice(Math.min(index, next.length), 0, item);
      return next;
    });
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        restoreItem,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        subtotal,
        totalQuantity,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}