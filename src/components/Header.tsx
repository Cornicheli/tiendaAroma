"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { totalItems, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tienda
            <span className="text-primary"> Aroma</span>
          </span>
        </a>

        <button
          type="button"
          onClick={openDrawer}
          className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Abrir carrito"
        >
          <ShoppingBag className="size-4" />
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
