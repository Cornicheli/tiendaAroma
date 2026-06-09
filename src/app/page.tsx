"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import {
  Filters,
  type Categoria,
  type Marca,
} from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { CartDrawer } from "@/components/CartDrawer";
import { tiendaAroma } from "@/data/tiendaAroma";

export default function Home() {
  const [query, setQuery] = useState("");
  const [categorias, setCategorias] = useState<Set<Categoria>>(new Set());
  const [marcas, setMarcas] = useState<Set<Marca>>(new Set());

  const productosFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tiendaAroma.filter((p) => {
      if (categorias.size > 0 && !categorias.has(p.category)) return false;
      if (marcas.size > 0 && !marcas.has(p.brand)) return false;
      if (q.length === 0) return true;
      const haystack = `${p.name} ${p.brand} ${p.fragrance}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, categorias, marcas]);

  const toggleCategoria = (c: Categoria) =>
    setCategorias((prev) => toggleInSet(prev, c));
  const toggleMarca = (m: Marca) => setMarcas((prev) => toggleInSet(prev, m));
  const clearFilters = () => {
    setCategorias(new Set());
    setMarcas(new Set());
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        <section
          id="productos"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <div className="mb-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Nuestros productos
              </h2>
              <p className="text-sm text-muted-foreground">
                {productosFiltrados.length} de {tiendaAroma.length} productos
              </p>
            </div>

            <SearchBar value={query} onChange={setQuery} />

            <Filters
              categorias={categorias}
              marcas={marcas}
              toggleCategoria={toggleCategoria}
              toggleMarca={toggleMarca}
              clear={clearFilters}
            />
          </div>

          <ProductGrid productos={productosFiltrados} />
        </section>
      </main>

      <footer className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p className="font-serif text-base text-foreground">Tienda Aroma</p>
          <p className="mt-1">
            Aromas seleccionados · Pedidos por WhatsApp · Envíos a coordinar
          </p>
        </div>
      </footer>

      <CartDrawer />
    </>
  );
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}
