import type { Producto } from "@/data/tiendaAroma";

const CATEGORY_SINGULAR: Record<Producto["category"], string> = {
  aerosolesAmbiente: "Aerosol Ambiente",
  difusoresAmbiente: "Difusor Ambiente",
  bombasDeOlores: "Bomba de olor",
  conos: "Cono",
  difusores: "Difusor",
  kitsDisney: "Kit Disney",
  portaSahumerios: "Porta Sahumerio",
  sahumerios: "Sahumerio",
  shapirus: "Shapirus",
  spray: "Spray",
  textiles: "Textil",
};

const BRAND_LABEL: Record<Producto["brand"], string> = {
  argentina: "Sahumerios Argentina",
  aromanza: "Aromanza",
  bombasDeOlores: "Bombas de olor",
  buenaEnergia: "Buena Energía",
  cannabis: "Cannabis",
  cascada: "Cascada",
  magicos: "Sahumerios Mágicos",
  perfum: "Perfum",
  portaSahumerios: "Porta Sahumerios",
  shapirus: "Shapirus",
};

function humanize(camel: string): string {
  const spaced = camel
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function formatProductName(producto: Producto): string {
  return `${CATEGORY_SINGULAR[producto.category]} ${humanize(producto.fragrance)}`;
}

export function formatFragrance(fragrance: string): string {
  return humanize(fragrance);
}

export function formatBrand(brand: Producto["brand"]): string {
  return BRAND_LABEL[brand];
}

export function formatCategory(category: Producto["category"]): string {
  return humanize(category);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
