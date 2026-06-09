import type { Producto } from "@/data/tiendaAroma";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <p className="font-serif text-xl text-foreground">
          No encontramos productos con esos filtros
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Probá limpiando la búsqueda o quitando algún filtro.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((p) => (
        <ProductCard key={p.name} producto={p} />
      ))}
    </div>
  );
}
