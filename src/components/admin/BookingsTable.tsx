"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Phone, Mail } from "lucide-react";

type Booking = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
  status: string;
  depositStatus: string;
  depositLabel: string;
  createdAt: string;
};

const statusLabels: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Pendiente", cls: "bg-amber-100 text-amber-800" },
  CONFIRMED: { label: "Confirmada", cls: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelada", cls: "bg-red-100 text-red-700" },
  COMPLETED: { label: "Completada", cls: "bg-blue-100 text-blue-800" },
};

const depositLabels: Record<string, { label: string; cls: string }> = {
  PAID: { label: "Pagado", cls: "bg-green-100 text-green-800" },
  UNPAID: { label: "Sin pagar", cls: "bg-gray-100 text-gray-600" },
  REFUNDED: { label: "Reembolsado", cls: "bg-purple-100 text-purple-700" },
};

const filters = [
  { key: "ALL", label: "Todas" },
  { key: "PENDING", label: "Pendientes" },
  { key: "CONFIRMED", label: "Confirmadas" },
  { key: "CANCELLED", label: "Canceladas" },
];

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [busy, setBusy] = useState<string | null>(null);

  const shown =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  async function updateStatus(id: string, status: string) {
    setBusy(id);
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  }

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === f.key
                ? "bg-[var(--color-rose-deep)] text-white"
                : "bg-white text-[var(--color-ink-soft)] hover:bg-[var(--color-nude-light)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="card p-10 text-center text-[var(--color-ink-soft)]">
          No hay citas en esta categoría.
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map((b) => (
            <div key={b.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold">
                      {b.fullName}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusLabels[b.status]?.cls}`}
                    >
                      {statusLabels[b.status]?.label || b.status}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${depositLabels[b.depositStatus]?.cls}`}
                    >
                      Depósito {b.depositLabel} ·{" "}
                      {depositLabels[b.depositStatus]?.label}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                    <strong>{b.serviceName}</strong> · {fmtDate(b.preferredDate)}{" "}
                    a las {b.preferredTime}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--color-ink-soft)]">
                    <a
                      href={`tel:${b.phone}`}
                      className="flex items-center gap-1 hover:text-[var(--color-rose-deep)]"
                    >
                      <Phone size={14} /> {b.phone}
                    </a>
                    <a
                      href={`mailto:${b.email}`}
                      className="flex items-center gap-1 hover:text-[var(--color-rose-deep)]"
                    >
                      <Mail size={14} /> {b.email}
                    </a>
                  </div>

                  {b.notes && (
                    <p className="mt-2 rounded-lg bg-[var(--color-nude-light)] px-3 py-2 text-sm text-[var(--color-ink-soft)]">
                      “{b.notes}”
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  {b.status !== "CONFIRMED" && (
                    <button
                      disabled={busy === b.id}
                      onClick={() => updateStatus(b.id, "CONFIRMED")}
                      className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                      <Check size={16} /> Confirmar
                    </button>
                  )}
                  {b.status !== "CANCELLED" && (
                    <button
                      disabled={busy === b.id}
                      onClick={() => updateStatus(b.id, "CANCELLED")}
                      className="flex items-center gap-1 rounded-full border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <X size={16} /> Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
