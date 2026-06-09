"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Producto } from "@/data/tiendaAroma";

export type CartItem = {
  producto: Producto;
  cantidad: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (producto: Producto) => void;
  removeItem: (name: string) => void;
  updateQty: (name: string, cantidad: number) => void;
  clear: () => void;
  getQuantity: (name: string) => number;
};

const STORAGE_KEY = "tienda-aroma-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((producto: Producto) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.producto.name === producto.name);
      if (existing) {
        if (existing.cantidad >= producto.stock) return prev;
        return prev.map((i) =>
          i.producto.name === producto.name
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      if (producto.stock <= 0) return prev;
      return [...prev, { producto, cantidad: 1 }];
    });
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.producto.name !== name));
  }, []);

  const updateQty = useCallback((name: string, cantidad: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.producto.name !== name) return i;
          const clamped = Math.max(0, Math.min(cantidad, i.producto.stock));
          return { ...i, cantidad: clamped };
        })
        .filter((i) => i.cantidad > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const getQuantity = useCallback(
    (name: string) => items.find((i) => i.producto.name === name)?.cantidad ?? 0,
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad * i.producto.price, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    toggleDrawer: () => setDrawerOpen((v) => !v),
    addItem,
    removeItem,
    updateQty,
    clear,
    getQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
