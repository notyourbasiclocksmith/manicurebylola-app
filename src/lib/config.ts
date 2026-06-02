// =====================================================================
// Configuración del negocio — EDITA AQUÍ datos de contacto, ciudad, etc.
// =====================================================================

export const site = {
  name: "Manicure by Lola",
  tagline:
    "Diseños elegantes, acabados impecables y resultados duraderos que mantienen tus uñas naturales sanas y hermosas.",
  domain: "manicurebylola.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://manicurebylola.com",

  // --- Ubicación / área de servicio (usado en SEO local) ---
  city: "Dallas",
  state: "TX",
  region: "Dallas, Texas",
  serviceArea: "Addison y el área de Dallas (DFW)",
  // Dirección visible (opcional). Déjala vacía si trabaja a domicilio / cita privada.
  address: "Addison, TX",

  // --- Contacto ---
  phone: "+1 (945) 210-8843",
  phoneHref: "+19452108843",
  whatsapp: "19452108843", // solo dígitos con código de país, para wa.me
  email: "lolitabello22@gmail.com",
  instagram: "nails_by_lola23",
  instagramUrl: "https://instagram.com/nails_by_lola23",

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
