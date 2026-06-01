import type { Metadata } from "next";
import { Suspense } from "react";
import { getServices } from "@/lib/data";
import { stripeEnabled } from "@/lib/stripe";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reservar cita",
  description:
    "Reserva tu cita de manicure en línea con Manicure by Lola. Asegura tu lugar con un depósito que se aplica al total del servicio.",
};

export default async function ReservarPage() {
  const services = await getServices();

  return (
    <>
      <section className="bg-[var(--color-nude-light)] py-16">
        <div className="section text-center">
          <p className="eyebrow">Reservas</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">
            Reserva tu cita
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)]">
            Completa tus datos y asegura tu lugar con un depósito. El depósito se
            aplica al total del servicio.
          </p>
        </div>
      </section>

      <section className="section py-16">
        <div className="mx-auto max-w-2xl">
          <Suspense fallback={<div className="card p-8">Cargando…</div>}>
            <BookingForm services={services} stripeEnabled={stripeEnabled} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
