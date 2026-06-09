"use client";

import { Plus, Check } from "lucide-react";
import type { Producto } from "@/data/tiendaAroma";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";
import {
  formatBrand,
  formatPrice,
  formatProductName,
} from "@/lib/formatProductName";
import { ProductImage } from "./ProductImage";

export function ProductCard({ producto }: { producto: Producto }) {
  const { addItem, getQuantity } = useCart();
  const cantidadEnCarrito = getQuantity(producto.name);
  const sinStock = producto.stock === 0;
  const limiteAlcanzado = cantidadEnCarrito >= producto.stock;
  const disabled = sinStock || limiteAlcanzado;

  const tieneVuelta = producto.photo.length > 1;
  const stockBadge = getStockBadge(producto.stock);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square w-full overflow-hidden bg-muted/40">
        <ProductImage
          src={producto.photo[0]}
          alt={formatProductName(producto)}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-contain p-4 transition-opacity duration-500",
            tieneVuelta && "group-hover:opacity-0"
          )}
        />
        {tieneVuelta && (
          <ProductImage
            src={producto.photo[1]}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
        )}

        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
            stockBadge.className
          )}
        >
          {stockBadge.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
            {formatBrand(producto.brand)}
          </p>
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
          {formatProductName(producto)}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="font-serif text-2xl font-semibold text-foreground">
            {formatPrice(producto.price)}
          </p>
          <button
            type="button"
            onClick={() => addItem(producto)}
            disabled={disabled}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all",
              disabled
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
            )}
            aria-label={`Agregar ${formatProductName(producto)} al carrito`}
          >
            {cantidadEnCarrito > 0 ? (
              <>
                <Check className="size-3.5" />
                {cantidadEnCarrito}
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function getStockBadge(stock: number) {
  if (stock === 0) {
    return {
      label: "Sin stock",
      className: "bg-foreground/10 text-foreground/60",
    };
  }
  if (stock <= 3) {
    return {
      label: `Últimos ${stock}`,
      className: "bg-accent/20 text-accent",
    };
  }
  return {
    label: "En stock",
    className: "bg-primary/15 text-primary",
  };
}
