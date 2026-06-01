import { prisma } from "@/lib/prisma";
import PricesEditor from "@/components/admin/PricesEditor";

export const dynamic = "force-dynamic";

export default async function AdminPreciosPage() {
  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return (
      <div className="card p-8 text-center">
        <h1 className="font-serif text-2xl font-semibold">
          Base de datos no disponible
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Configura la base de datos y ejecuta el seed para administrar precios.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Precios y servicios</h1>
        <p className="text-[var(--color-ink-soft)]">
          Edita precios, depósitos, duración y activa/desactiva servicios.
        </p>
      </div>

      <PricesEditor
        services={services.map((s) => ({
          id: s.id,
          name: s.name,
          priceCents: s.priceCents,
          priceNote: s.priceNote,
          durationMin: s.durationMin,
          depositCents: s.depositCents,
          active: s.active,
        }))}
      />
    </div>
  );
}
