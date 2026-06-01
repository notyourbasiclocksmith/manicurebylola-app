import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "¡Gracias!",
  description: "Tu depósito fue recibido y tu cita está asegurada.",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <section className="section flex min-h-[60vh] items-center justify-center py-20">
      <div className="card max-w-lg p-10 text-center">
        <CheckCircle2
          size={56}
          className="mx-auto text-[var(--color-rose-deep)]"
        />
        <h1 className="mt-5 font-serif text-4xl font-semibold">
          ¡Gracias por tu reserva!
        </h1>
        <p className="mt-4 text-[var(--color-ink-soft)]">
          Tu depósito fue recibido y tu cita está asegurada. Lola te contactará
          para confirmar los detalles. Recuerda que el depósito se aplica al
          total del servicio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-outline">
            Volver al inicio
          </Link>
          <a
            href={whatsappLink("Hola Lola, acabo de pagar mi depósito ✨")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={18} /> Escribir a Lola
          </a>
        </div>
        <p className="mt-6 text-xs text-[var(--color-ink-soft)]">{site.name}</p>
      </div>
    </section>
  );
}
