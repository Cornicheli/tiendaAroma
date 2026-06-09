"use client";

import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatProductName";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    clear,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, totalPrice);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        onClick={closeDrawer}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity",
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Tu pedido
            </h2>
            {totalItems > 0 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Cerrar carrito"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="font-serif text-lg text-foreground">
              Tu carrito está vacío
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Agregá productos y vuelven a aparecer acá.
            </p>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <CartItemRow key={item.producto.name} item={item} />
                ))}
              </div>
              <button
                type="button"
                onClick={clear}
                className="mt-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Vaciar carrito
              </button>
            </div>

            <footer className="border-t border-border/60 bg-card/60 px-5 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Total
                </span>
                <span className="font-serif text-2xl font-semibold text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe5b] active:scale-[0.99]"
              >
                <WhatsAppIcon className="size-5" />
                Realizar pedido por WhatsApp
              </button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Te derivamos a WhatsApp con el detalle de tu pedido.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 2C6.502 2 2 6.502 2 12.057c0 1.78.464 3.523 1.344 5.06L2 22l5.063-1.329a10.01 10.01 0 0 0 4.994 1.338h.004c5.555 0 10.057-4.502 10.057-10.057 0-2.687-1.046-5.213-2.946-7.115A10.005 10.005 0 0 0 12.057 2zm0 18.422a8.36 8.36 0 0 1-4.262-1.166l-.305-.181-3.165.83.844-3.083-.198-.317a8.355 8.355 0 0 1-1.282-4.448c0-4.616 3.756-8.371 8.372-8.371 2.237 0 4.337.871 5.917 2.453a8.32 8.32 0 0 1 2.45 5.92c-.001 4.617-3.757 8.363-8.371 8.363z" />
    </svg>
  );
}
