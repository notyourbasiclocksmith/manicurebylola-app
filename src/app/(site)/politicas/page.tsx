import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Políticas",
  description:
    "Políticas de reserva, depósito, cancelaciones y retrasos de Manicure by Lola.",
};

const policies = [
  {
    title: "Depósito requerido para reservar",
    text: "Para confirmar tu cita se requiere un depósito. El depósito se aplica al total del servicio el día de tu cita.",
  },
  {
    title: "Retrasos de más de 15 minutos",
    text: "Llegar tarde más de 15 minutos puede requerir reagendar tu cita, ya que el tiempo está reservado especialmente para ti.",
  },
  {
    title: "Cancelaciones con menos de 24 horas",
    text: "Las cancelaciones con menos de 24 horas de anticipación pueden perder el depósito.",
  },
  {
    title: "No-shows",
    text: "Si no asistes a tu cita sin avisar (no-show), el depósito no es reembolsable.",
  },
  {
    title: "El depósito se aplica al total",
    text: "El monto del depósito se descuenta del precio final del servicio que realices.",
  },
  {
    title: "Cambios de diseño",
    text: "Los cambios de diseño durante la cita pueden modificar el precio final del servicio.",
  },
];

export default function PoliticasPage() {
  return (
    <>
      <section className="bg-[var(--color-nude-light)] py-16">
        <div className="section text-center">
          <p className="eyebrow">Políticas</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">
            Políticas de cita
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)]">
            Para cuidar tu tiempo y el mío, te pido leer estas políticas antes de
            reservar. ¡Gracias por tu comprensión!
          </p>
        </div>
      </section>

      <section className="section py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {policies.map((p) => (
            <div key={p.title} className="card flex gap-4 p-6">
              <CheckCircle2
                className="mt-0.5 shrink-0 text-[var(--color-rose-deep)]"
                size={22}
              />
              <div>
                <h2 className="font-serif text-xl font-semibold">{p.title}</h2>
                <p className="mt-1 text-[var(--color-ink-soft)]">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/reservar" className="btn-primary">
            Entiendo, reservar cita
          </Link>
        </div>
      </section>
    </>
  );
}
