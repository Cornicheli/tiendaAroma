import type { CartItem } from "@/context/CartContext";
import { formatPrice, formatProductName } from "./formatProductName";

export function buildWhatsAppUrl(items: CartItem[], total: number): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  const lineas = items.map(({ producto, cantidad }) => {
    const subtotal = producto.price * cantidad;
    return `• ${formatProductName(producto)} x${cantidad} — ${formatPrice(subtotal)}`;
  });

  const mensaje = [
    "¡Hola! Me gustaría hacer este pedido:",
    "",
    ...lineas,
    "",
    `*Total: ${formatPrice(total)}*`,
    "",
    "¿Cómo coordinamos la entrega?",
  ].join("\n");

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
