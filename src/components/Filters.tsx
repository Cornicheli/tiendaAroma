"use client";

import { X } from "lucide-react";
import type { Producto } from "@/data/tiendaAroma";
import { cn } from "@/lib/cn";
import {
  formatBrand,
  formatCategory,
} from "@/lib/formatProductName";

export type Categoria = Producto["category"];
export type Marca = Producto["brand"];

const CATEGORIAS: Categoria[] = ["conos", "difusores", "sahumerios", "spray"];
const MARCAS: Marca[] = ["aromanza", "buenaEnergia", "cannabis", "perfum"];

type Props = {
  categorias: Set<Categoria>;
  marcas: Set<Marca>;
  toggleCategoria: (c: Categoria) => void;
  toggleMarca: (m: Marca) => void;
  clear: () => void;
};

export function Filters({
  categorias,
  marcas,
  toggleCategoria,
  toggleMarca,
  clear,
}: Props) {
  const hayFiltros = categorias.size > 0 || marcas.size > 0;

  return (
    <div className="flex flex-col gap-4">
      <FilterRow label="Categoría">
        {CATEGORIAS.map((c) => (
          <Chip
            key={c}
            active={categorias.has(c)}
            onClick={() => toggleCategoria(c)}
          >
            {formatCategory(c)}
          </Chip>
        ))}
      </FilterRow>

      <FilterRow label="Marca">
        {MARCAS.map((m) => (
          <Chip key={m} active={marcas.has(m)} onClick={() => toggleMarca(m)}>
            {formatBrand(m)}
          </Chip>
        ))}
      </FilterRow>

      {hayFiltros && (
        <button
          type="button"
          onClick={clear}
          className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-20">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground hover:border-primary/60 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}
