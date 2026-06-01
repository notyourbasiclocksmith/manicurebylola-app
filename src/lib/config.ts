// =====================================================================
// Configuración del negocio — EDITA AQUÍ datos de contacto, ciudad, etc.
// =====================================================================

export const site = {
  name: "Manicure by Lola",
  tagline: "Uñas elegantes, limpias y duraderas hechas con amor y detalle.",
  domain: "manicurebylola.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://manicurebylola.com",

  // --- Ubicación / área de servicio (usado en SEO local) ---
  city: "Fort Worth",
  state: "TX",
  region: "Fort Worth, Texas",
  serviceArea: "Fort Worth y el área de DFW",
  // Dirección visible (opcional). Déjala vacía si trabaja a domicilio / cita privada.
  address: "",

  // --- Contacto (CAMBIA estos valores por los reales de Lola) ---
  phone: "+1 (817) 000-0000",
  phoneHref: "+18170000000",
  whatsapp: "18170000000", // solo dígitos con código de país, para wa.me
  email: "hola@manicurebylola.com",
  instagram: "manicurebylola",
  instagramUrl: "https://instagram.com/manicurebylola",

  // --- Depósitos por defecto (en dólares, solo informativo en el front) ---
  depositNormal: 20,
  depositLarge: 30,
};

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/galeria", label: "Galería" },
  { href: "/politicas", label: "Políticas" },
  { href: "/contacto", label: "Contacto" },
];

export const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function formatPrice(cents: number | null | undefined): string {
  if (cents == null) return "";
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
