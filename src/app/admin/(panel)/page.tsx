import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/config";
import BookingsTable from "@/components/admin/BookingsTable";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  let bookings: Awaited<ReturnType<typeof prisma.booking.findMany>> = [];
  let services: { id: string; name: string }[] = [];
  let dbError = false;

  try {
    [bookings, services] = await Promise.all([
      prisma.booking.findMany({
        include: { service: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      prisma.service.findMany({ select: { id: true, name: true } }),
    ]);
  } catch {
    dbError = true;
  }

  const paidTotal = bookings
    .filter((b) => b.depositStatus === "PAID")
    .reduce((sum, b) => sum + b.depositCents, 0);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    deposits: formatPrice(paidTotal),
  };

  if (dbError) {
    return (
      <div className="card p-8 text-center">
        <h1 className="font-serif text-2xl font-semibold">
          Base de datos no disponible
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Configura <code>DATABASE_URL</code> y ejecuta las migraciones para ver
          las citas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Citas</h1>
        <p className="text-[var(--color-ink-soft)]">
          Confirma, cancela y revisa los depósitos pagados.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Total citas" value={String(stats.total)} />
        <Stat label="Pendientes" value={String(stats.pending)} />
        <Stat label="Confirmadas" value={String(stats.confirmed)} />
        <Stat label="Depósitos cobrados" value={stats.deposits} highlight />
      </div>

      <BookingsTable
        bookings={bookings.map((b) => ({
          id: b.id,
          fullName: b.fullName,
          phone: b.phone,
          email: b.email,
          serviceName: (b as { service?: { name: string } }).service?.name || "—",
          preferredDate: b.preferredDate.toISOString(),
          preferredTime: b.preferredTime,
          notes: b.notes,
          status: b.status,
          depositStatus: b.depositStatus,
          depositLabel: formatPrice(b.depositCents),
          createdAt: b.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">
        {label}
      </p>
      <p
        className={`mt-1 font-serif text-3xl font-semibold ${
          highlight ? "text-[var(--color-rose-deep)]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
