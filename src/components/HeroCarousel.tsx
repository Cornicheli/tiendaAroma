"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "./ProductImage";

type Slide = {
  label: string;
  src: string;
};

const slides: Slide[] = [
  { label: "Conos", src: "/conos/cannabis/blueDream-f.png" },
  { label: "Difusores", src: "/difusores/aromanza/citronella_f.png" },
  { label: "Sahumerios", src: "/sahumerios/aromanza/confianza_f.png" },
  { label: "Sahumerios", src: "/sahumerios/perfum/sandalo-f.png" },
  { label: "Sprays", src: "/spray/buenaEnergia/atraccion.png" },
  { label: "Sprays", src: "/spray/buenaEnergia/prosperidad.png" },
];

const AUTOPLAY_MS = 4000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  const total = slides.length;

  const go = useCallback(
    (i: number) => {
      setActive(((i % total) + total) % total);
      setTick((t) => t + 1);
    },
    [total]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (interval) return;
      interval = setInterval(() => {
        setActive((i) => (i + 1) % total);
      }, AUTOPLAY_MS);
    };

    const stop = () => {
      if (!interval) return;
      clearInterval(interval);
      interval = null;
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [total, tick]);

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      role="region"
      aria-roledescription="carousel"
      aria-label="Categorías destacadas"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={`${slide.label}-${slide.src}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.label} (${i + 1} de ${total})`}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <ProductImage
              src={slide.src}
              alt={slide.label}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 85vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              className="object-contain p-6"
            />
          </div>
        ))}

        <button
          type="button"
          aria-label="Slide anterior"
          onClick={() => go(active - 1)}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/85 p-2 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background hover:text-primary sm:flex"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Slide siguiente"
          onClick={() => go(active + 1)}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/85 p-2 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background hover:text-primary sm:flex"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <p
        className="mt-4 text-center font-serif text-2xl font-semibold text-foreground"
        aria-live="polite"
      >
        {slides[active].label}
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={`${slide.label}-${slide.src}`}
            type="button"
            aria-label={`Ir a ${slide.label}`}
            aria-current={i === active}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === active
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
