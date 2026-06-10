import { HandCoins, MessageCircle, Truck } from "lucide-react";
import { buildWhatsAppContactUrl } from "@/lib/social";
import { HeroCarousel } from "@/components/HeroCarousel";

const trustBadges = [
  { Icon: Truck, label: "Envíos coordinados" },
  { Icon: HandCoins, label: "Pago al cerrar el pedido" },
];

export function Hero() {
  const whatsappUrl = buildWhatsAppContactUrl();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/40 to-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-primary/30 opacity-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 size-[26rem] rounded-full bg-accent/30 opacity-40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-16">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Aromaterapia artesanal
          </p>

          <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Aromas que{" "}
            <span className="italic text-primary">envuelven</span> tus
            espacios
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Conos, difusores, sahumerios, sprays, shapirus y bombas de olor
            para acompañar cada momento. Elegí tus favoritos y los coordinamos
            por WhatsApp.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30"
            >
              Ver productos
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              <MessageCircle className="size-4" />
              Consultar por WhatsApp
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {trustBadges.map(({ Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
              >
                <Icon className="size-4 text-accent" />
                {label}
              </li>
            ))}
          </ul>
        </div>

          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
