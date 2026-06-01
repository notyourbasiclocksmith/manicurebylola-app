"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";

type Service = {
  id: string;
  name: string;
  priceCents: number | null;
  priceNote: string | null;
  durationMin: number;
  depositCents: number;
  active: boolean;
};

function toDollars(cents: number | null): string {
  return cents == null ? "" : (cents / 100).toString();
}

export default function PricesEditor({ services }: { services: Service[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(
    services.map((s) => ({
      ...s,
      priceStr: toDollars(s.priceCents),
      depositStr: toDollars(s.depositCents),
    }))
  );
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  function update(id: string, field: string, value: string | boolean) {
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  async function save(id: string) {
    const row = rows.find((r) => r.id === id);
    if (!row) return;
    setSavingId(id);

    const priceCents =
      row.priceStr.trim() === ""
        ? null
        : Math.round(parseFloat(row.priceStr) * 100);
    const depositCents = Math.round(parseFloat(row.depositStr || "0") * 100);

    await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceCents: Number.isNaN(priceCents as number) ? null : priceCents,
        priceNote: row.priceNote,
        durationMin: Number(row.durationMin) || 60,
        depositCents: Number.isNaN(depositCents) ? 0 : depositCents,
        active: row.active,
      }),
    });

    setSavingId(null);
    setSavedId(id);
    setTimeout(() => setSavedId((s) => (s === id ? null : s)), 1800);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.id} className="card p-5">
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[140px] flex-1">
              <p className="font-serif text-lg font-semibold">{r.name}</p>
              <label className="mt-2 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                <input
                  type="checkbox"
                  checked={r.active}
                  onChange={(e) => update(r.id, "active", e.target.checked)}
                  className="h-4 w-4 accent-[var(--color-rose-deep)]"
                />
                Visible en el sitio
              </label>
            </div>

            <div className="w-28">
              <label className="label">Precio ($)</label>
              <input
                className="input"
                inputMode="decimal"
                placeholder="—"
                value={r.priceStr}
                onChange={(e) => update(r.id, "priceStr", e.target.value)}
              />
            </div>

            <div className="w-40">
              <label className="label">Nota (si sin precio)</label>
              <input
                className="input"
                placeholder="Precio pendiente / desde"
                value={r.priceNote || ""}
                onChange={(e) => update(r.id, "priceNote", e.target.value)}
              />
            </div>

            <div className="w-24">
              <label className="label">Depósito ($)</label>
              <input
                className="input"
                inputMode="decimal"
                value={r.depositStr}
                onChange={(e) => update(r.id, "depositStr", e.target.value)}
              />
            </div>

            <div className="w-24">
              <label className="label">Duración (min)</label>
              <input
                className="input"
                inputMode="numeric"
                value={r.durationMin}
                onChange={(e) => update(r.id, "durationMin", e.target.value)}
              />
            </div>

            <button
              onClick={() => save(r.id)}
              disabled={savingId === r.id}
              className="btn-primary text-sm"
            >
              {savingId === r.id ? (
                <Loader2 size={16} className="animate-spin" />
              ) : savedId === r.id ? (
                "Guardado ✓"
              ) : (
                <>
                  <Save size={16} /> Guardar
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
