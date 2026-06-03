import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import { site } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Servicios y precios",
  description:
    "Builder gel, gel manicure, acrylic nails, refill, nail art y removal en Dallas y Addison. Consulta precios y reserva tu cita con depósito en línea.",
};

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <>
      <section className="bg-[var(--color-nude-light)] py-16">
        <div className="section text-center">
          <p className="eyebrow">Servicios & precios</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">
            Nuestros servicios
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-ink-soft)]">
            Cada servicio incluye duración aproximada y precio. Para confirmar tu
            cita se requiere un depósito de ${site.depositNormal} que se aplica
            al total del servicio.
          </p>
        </div>
      </section>

      <section className="section py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-[var(--color-nude-light)] p-8 text-center">
          <h2 className="font-serif text-2xl font-semibold">
            ¿No sabes cuál elegir?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[var(--color-ink-soft)]">
            Escríbeme y te ayudo a elegir el servicio perfecto para ti.
          </p>
          <Link href="/contacto" className="btn-primary mt-5">
            Contáctame
          </Link>
        </div>
      </section>
    </>
  );
}
