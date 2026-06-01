import { prisma } from "@/lib/prisma";
import HoursEditor from "@/components/admin/HoursEditor";

export const dynamic = "force-dynamic";

const defaults = [0, 1, 2, 3, 4, 5, 6].map((d) => ({
  id: `d${d}`,
  dayOfWeek: d,
  isOpen: d !== 0,
  openTime: "09:00",
  closeTime: "18:00",
}));

export default async function AdminHorariosPage() {
  let hours = defaults;
  try {
    const db = await prisma.businessHour.findMany({
      orderBy: { dayOfWeek: "asc" },
    });
    if (db.length > 0) {
      hours = db.map((h) => ({
        id: h.id,
        dayOfWeek: h.dayOfWeek,
        isOpen: h.isOpen,
        openTime: h.openTime,
        closeTime: h.closeTime,
      }));
    }
  } catch {
    return (
      <div className="card p-8 text-center">
        <h1 className="font-serif text-2xl font-semibold">
          Base de datos no disponible
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Configura la base de datos para administrar horarios.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Horarios</h1>
        <p className="text-[var(--color-ink-soft)]">
          Define qué días abres y tu horario de atención.
        </p>
      </div>
      <HoursEditor hours={hours} />
    </div>
  );
}
