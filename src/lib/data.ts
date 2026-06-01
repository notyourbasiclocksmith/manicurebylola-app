import { prisma } from "@/lib/prisma";

// Fallback usado si la base de datos aún no está disponible/seeded,
// para que la página nunca aparezca vacía.
export const fallbackServices = [
  {
    id: "f1",
    slug: "builder-gel",
    name: "Builder Gel",
    description:
      "Refuerzo de gel que da estructura y resistencia a tus uñas naturales para un acabado duradero y elegante.",
    priceCents: 8000,
    priceNote: null,
    durationMin: 90,
    depositCents: 2000,
    featured: true,
    sortOrder: 1,
  },
  {
    id: "f2",
    slug: "gel-manicure",
    name: "Gel Manicure",
    description:
      "Manicure con esmalte en gel de larga duración, brillo impecable y secado al instante.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 60,
    depositCents: 2000,
    featured: true,
    sortOrder: 2,
  },
  {
    id: "f3",
    slug: "acrylic-nails",
    name: "Acrylic Nails",
    description:
      "Extensiones de acrílico moldeadas a tu gusto, con la forma y largo que prefieras.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 120,
    depositCents: 3000,
    featured: true,
    sortOrder: 3,
  },
  {
    id: "f4",
    slug: "refill",
    name: "Refill",
    description:
      "Mantenimiento de tu set para rellenar el crecimiento y conservar tus uñas siempre perfectas.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 90,
    depositCents: 2000,
    featured: false,
    sortOrder: 4,
  },
  {
    id: "f5",
    slug: "nail-art",
    name: "Nail Art",
    description:
      "Diseños personalizados, pedrería y detalles a mano para que tus uñas sean únicas.",
    priceCents: null,
    priceNote: "Desde — precio pendiente",
    durationMin: 90,
    depositCents: 3000,
    featured: false,
    sortOrder: 5,
  },
  {
    id: "f6",
    slug: "removal",
    name: "Removal",
    description:
      "Retiro seguro y profesional de gel o acrílico, cuidando la salud de tus uñas naturales.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 45,
    depositCents: 2000,
    featured: false,
    sortOrder: 6,
  },
];

export type ServiceLike = (typeof fallbackServices)[number];

export async function getServices(): Promise<ServiceLike[]> {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (services.length === 0) return fallbackServices;
    return services as ServiceLike[];
  } catch {
    return fallbackServices;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceLike | null> {
  try {
    const s = await prisma.service.findUnique({ where: { slug } });
    if (s) return s as ServiceLike;
  } catch {
    /* ignore */
  }
  return fallbackServices.find((s) => s.slug === slug) ?? null;
}

export async function getGallery() {
  try {
    return await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getBusinessHours() {
  try {
    return await prisma.businessHour.findMany({ orderBy: { dayOfWeek: "asc" } });
  } catch {
    return [];
  }
}
