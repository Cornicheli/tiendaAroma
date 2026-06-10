"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { InstagramIcon } from "@/components/InstagramIcon";
import { INSTAGRAM_URL } from "@/lib/social";

export function Header() {
  const { totalItems, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/tiendaAroma-logo.png"
            alt="Aromas Laura"
            width={48}
            height={48}
            priority
            className="size-11 rounded-full object-contain sm:size-12"
          />
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tienda
            <span className="text-primary"> Aroma</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Tienda Aroma"
            className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-primary"
          >
            <InstagramIcon className="size-5" />
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
      </div>
    </header>
  );
}
