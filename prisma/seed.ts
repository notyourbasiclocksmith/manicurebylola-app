import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEPOSIT_NORMAL = 2000; // $20
const DEPOSIT_LARGE = 3000; // $30 sets largos / nail art / personalizado

const services = [
  {
    slug: "builder-gel",
    name: "Builder Gel",
    description:
      "Refuerzo de gel que da estructura y resistencia a tus uñas naturales para un acabado duradero y elegante.",
    priceCents: 8000,
    priceNote: null,
    durationMin: 90,
    depositCents: DEPOSIT_NORMAL,
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "gel-manicure",
    name: "Gel Manicure",
    description:
      "Manicure con esmalte en gel de larga duración, brillo impecable y secado al instante.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 60,
    depositCents: DEPOSIT_NORMAL,
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "acrylic-nails",
    name: "Acrylic Nails",
    description:
      "Extensiones de acrílico moldeadas a tu gusto, con la forma y largo que prefieras.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 120,
    depositCents: DEPOSIT_LARGE,
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "refill",
    name: "Refill",
    description:
      "Mantenimiento de tu set para rellenar el crecimiento y conservar tus uñas siempre perfectas.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 90,
    depositCents: DEPOSIT_NORMAL,
    sortOrder: 4,
  },
  {
    slug: "nail-art",
    name: "Nail Art",
    description:
      "Diseños personalizados, pedrería y detalles a mano para que tus uñas sean únicas.",
    priceCents: null,
    priceNote: "Desde — precio pendiente",
    durationMin: 90,
    depositCents: DEPOSIT_LARGE,
    sortOrder: 5,
  },
  {
    slug: "removal",
    name: "Removal",
    description:
      "Retiro seguro y profesional de gel o acrílico, cuidando la salud de tus uñas naturales.",
    priceCents: null,
    priceNote: "Precio pendiente",
    durationMin: 45,
    depositCents: DEPOSIT_NORMAL,
    sortOrder: 6,
  },
];

const hours = [
  { dayOfWeek: 0, isOpen: false, openTime: "10:00", closeTime: "16:00" }, // Dom
  { dayOfWeek: 1, isOpen: true, openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: 2, isOpen: true, openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: 3, isOpen: true, openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: 4, isOpen: true, openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: 5, isOpen: true, openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: 6, isOpen: true, openTime: "10:00", closeTime: "16:00" }, // Sáb
];

async function main() {
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        description: s.description,
        durationMin: s.durationMin,
        depositCents: s.depositCents,
        sortOrder: s.sortOrder,
        featured: s.featured ?? false,
      },
      create: s,
    });
  }

  for (const h of hours) {
    await prisma.businessHour.upsert({
      where: { dayOfWeek: h.dayOfWeek },
      update: {},
      create: h,
    });
  }

  console.log("Seed completado: servicios y horarios listos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
