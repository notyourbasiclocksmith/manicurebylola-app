"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { dayNames } from "@/lib/config";

type Hour = {
  id: string;
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
};

export default function HoursEditor({ hours }: { hours: Hour[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(hours);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(day: number, field: keyof Hour, value: string | boolean) {
    setRows((rs) =>
      rs.map((r) => (r.dayOfWeek === day ? { ...r, [field]: value } : r))
    );
  }

  async function saveAll() {
    setSaving(true);
    await fetch("/api/admin/hours", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hours: rows.map((r) => ({
          dayOfWeek: r.dayOfWeek,
          isOpen: r.isOpen,
          openTime: r.openTime,
          closeTime: r.closeTime,
        })),
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="card divide-y divide-[var(--color-sand)] p-2">
        {rows.map((r) => (
          <div
            key={r.dayOfWeek}
            className="flex flex-wrap items-center gap-4 px-3 py-3"
          >
            <span className="w-28 font-medium">{dayNames[r.dayOfWeek]}</span>

            <label className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
              <input
                type="checkbox"
                checked={r.isOpen}
                onChange={(e) => update(r.dayOfWeek, "isOpen", e.target.checked)}
                className="h-4 w-4 accent-[var(--color-rose-deep)]"
              />
              Abierto
            </label>

            <div className="flex items-center gap-2">
              <input
                type="time"
                className="input w-32"
                value={r.openTime}
                disabled={!r.isOpen}
                onChange={(e) => update(r.dayOfWeek, "openTime", e.target.value)}
              />
              <span className="text-[var(--color-ink-soft)]">a</span>
              <input
                type="time"
                className="input w-32"
                value={r.closeTime}
                disabled={!r.isOpen}
                onChange={(e) =>
                  update(r.dayOfWeek, "closeTime", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={saveAll} disabled={saving} className="btn-primary">
        {saving ? (
          <Loader2 size={18} className="animate-spin" />
        ) : saved ? (
          "Guardado ✓"
        ) : (
          <>
            <Save size={18} /> Guardar horarios
          </>
        )}
      </button>
    </div>
  );
}
