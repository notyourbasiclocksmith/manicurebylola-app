"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CreditCard } from "lucide-react";
import { formatPrice, site } from "@/lib/config";
import type { ServiceLike } from "@/lib/data";

const times = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export default function BookingForm({
  services,
  stripeEnabled,
}: {
  services: ServiceLike[];
  stripeEnabled: boolean;
}) {
  const params = useSearchParams();
  const preselected = params.get("servicio") || services[0]?.slug || "";

  const [serviceSlug, setServiceSlug] = useState(preselected);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const selected = services.find((s) => s.slug === serviceSlug);
  const todayStr = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      serviceSlug,
      preferredDate: String(data.get("preferredDate") || ""),
      preferredTime: String(data.get("preferredTime") || ""),
      notes: String(data.get("notes") || ""),
      policyAccepted: data.get("policyAccepted") === "on",
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Ocurrió un error. Intenta de nuevo.");
        setLoading(false);
        return;
      }
      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl;
        return;
      }
      setDone(true);
      setLoading(false);
      form.reset();
    } catch {
      setError("No se pudo conectar. Revisa tu internet e intenta de nuevo.");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold text-[var(--color-rose-deep)]">
          ¡Solicitud recibida!
        </h2>
        <p className="mt-3 text-[var(--color-ink-soft)]">
          Lola revisará tu solicitud y te contactará para confirmar. Recuerda que
          el depósito asegura tu cita.
        </p>
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
          Para enviar tu depósito por Zelle o Cash App, escríbele por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">
            Nombre completo *
          </label>
          <input id="fullName" name="fullName" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Teléfono *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="input"
            placeholder="(817) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="email">
          Email *
        </label>
        <input id="email" name="email" type="email" required className="input" />
      </div>

      <div>
        <label className="label" htmlFor="service">
          Servicio deseado *
        </label>
        <select
          id="service"
          className="input"
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
        >
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
              {s.priceCents != null ? ` — ${formatPrice(s.priceCents)}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="preferredDate">
            Fecha preferida *
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={todayStr}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="preferredTime">
            Hora preferida *
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            required
            className="input"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una hora
            </option>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="notes">
          Notas adicionales
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="input"
          placeholder="Ideas de diseño, inspiración, alergias, etc."
        />
      </div>

      {/* Resumen del depósito */}
      <div className="rounded-2xl bg-[var(--color-nude-light)] p-5">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Para confirmar tu cita se requiere un depósito. El depósito se aplica al
          total del servicio.
        </p>
        {selected && (
          <p className="mt-2 font-medium">
            Depósito para {selected.name}:{" "}
            <span className="text-[var(--color-rose-deep)]">
              {formatPrice(selected.depositCents)}
            </span>
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--color-ink-soft)]">
        <input
          type="checkbox"
          name="policyAccepted"
          required
          className="mt-1 h-4 w-4 accent-[var(--color-rose-deep)]"
        />
        <span>
          Entiendo que el depósito no es reembolsable si cancelo con menos de 24
          horas o no asisto a mi cita. He leído las{" "}
          <a href="/politicas" className="underline" target="_blank">
            políticas
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Procesando…
          </>
        ) : stripeEnabled ? (
          <>
            <CreditCard size={18} /> Pagar depósito y reservar
          </>
        ) : (
          "Enviar solicitud de cita"
        )}
      </button>

      {!stripeEnabled && (
        <p className="text-center text-xs text-[var(--color-ink-soft)]">
          El pago en línea se activará pronto. Por ahora enviarás tu solicitud y
          Lola te indicará cómo enviar el depósito por Zelle o Cash App.
        </p>
      )}

      <p className="text-center text-xs text-[var(--color-ink-soft)]">
        ¿Prefieres pagar por Zelle, Cash App o efectivo? Escríbele a Lola por
        WhatsApp al confirmar. {site.name}
      </p>
    </form>
  );
}
