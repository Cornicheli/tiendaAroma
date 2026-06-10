import Image from "next/image";
import {
  Banknote,
  CreditCard,
  Landmark,
  MessageCircle,
} from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  buildWhatsAppContactUrl,
} from "@/lib/social";

const categorias = [
  { label: "Conos", href: "#productos" },
  { label: "Difusores", href: "#productos" },
  { label: "Sahumerios", href: "#productos" },
  { label: "Sprays", href: "#productos" },
];

const mediosDePago = [
  { label: "Efectivo", Icon: Banknote },
  { label: "Transferencia", Icon: Landmark },
  { label: "Mercado Pago", Icon: CreditCard },
];

export function Footer() {
  const whatsappUrl = buildWhatsAppContactUrl();

  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/tiendaAroma-logo.png"
                alt="Tienda Aroma"
                width={44}
                height={44}
                className="size-11 rounded-full object-contain"
              />
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                Tienda
                <span className="text-primary"> Aroma</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Aromas seleccionados para envolver tus espacios. Conos, difusores,
              sahumerios y sprays artesanales.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Explorar
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {categorias.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="transition-colors hover:text-primary"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Contacto
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <InstagramIcon className="size-4" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Medios de pago
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {mediosDePago.map(({ label, Icon }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-accent" />
                  {label}
                </li>
              ))}
            </ul>
            <p className="text-xs leading-relaxed text-muted-foreground/80">
              Coordinamos el pago al cerrar el pedido por WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Tienda Aroma · Aromaterapia artesanal</p>
          <p>Hecho con cariño en Argentina</p>
        </div>
      </div>
    </footer>
  );
}
