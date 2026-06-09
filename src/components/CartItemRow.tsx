"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, type CartItem } from "@/context/CartContext";
import {
  formatPrice,
  formatProductName,
} from "@/lib/formatProductName";
import { ProductImage } from "./ProductImage";

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart();
  const { producto, cantidad } = item;
  const subtotal = producto.price * cantidad;
  const enTope = cantidad >= producto.stock;

  return (
    <div className="flex gap-3 rounded-xl border border-border/60 bg-card p-3">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/50">
        <ProductImage
          src={producto.photo[0]}
          alt={formatProductName(producto)}
          fill
          sizes="80px"
          className="object-contain p-1.5"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-serif text-sm font-semibold text-foreground">
              {formatProductName(producto)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatPrice(producto.price)} c/u
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(producto.name)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Eliminar"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
            <button
              type="button"
              onClick={() => updateQty(producto.name, cantidad - 1)}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Restar"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="min-w-6 text-center text-xs font-semibold text-foreground">
              {cantidad}
            </span>
            <button
              type="button"
              onClick={() => updateQty(producto.name, cantidad + 1)}
              disabled={enTope}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Sumar"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <p className="font-serif text-sm font-semibold text-foreground">
            {formatPrice(subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
