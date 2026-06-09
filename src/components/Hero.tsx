export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/40 to-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            Aromaterapia artesanal
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Aromas que <span className="italic text-primary">envuelven</span> tus
            espacios
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Conos, difusores, sahumerios y sprays seleccionados para acompañar
            cada momento. Armá tu pedido y lo coordinamos por WhatsApp.
          </p>
          <a
            href="#productos"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver productos
          </a>
        </div>
      </div>
    </section>
  );
}
