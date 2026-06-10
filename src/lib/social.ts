export const INSTAGRAM_URL = "https://www.instagram.com/tiendayaromaslaura/";
export const INSTAGRAM_HANDLE = "@tiendayaromaslaura";

export function buildWhatsAppContactUrl(message = "¡Hola! Quiero hacer una consulta."): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}
