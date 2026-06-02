import Link from "next/link";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Instagram,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { site, whatsappLink } from "@/lib/config";
import { getServices, getGallery } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = (await getServices()).slice(0, 6);
  const gallery = (await getGallery()).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-nude-light)] via-[var(--color-cream)] to-[var(--color-cream)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-rose)] opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[var(--color-gold-light)] opacity-30 blur-3xl" />
        <div className="section relative grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={14} /> {site.serviceArea}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] md:text-6xl">
              Manicure
              <span className="block text-[var(--color-rose-deep)]">by Lola</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--color-ink-soft)]">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservar" className="btn-primary">
                Reservar cita
              </Link>
              <Link href="/servicios" className="btn-outline">
                Ver precios
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-[var(--color-ink-soft)]">
              <span className="flex items-center gap-2">
                <Heart size={16} className="text-[var(--color-rose-deep)]" /> Hecho
                con detalle
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[var(--color-gold)]" />
                Limpio y duradero
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2.4rem] bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-gold-light)] opacity-40 blur-2xl" />
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-rose)] via-[var(--color-nude)] to-[var(--color-gold-light)] shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-nails.jpg"
                alt="Manicure nude elegante hecho por Manicure by Lola en Dallas y Addison"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white/95 px-5 py-3 shadow-[var(--shadow-soft)] sm:block">
              <p className="font-serif text-lg font-semibold text-[var(--color-rose-deep)]">
                Uñas que enamoran
              </p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                Limpias · elegantes · duraderas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section py-20">
        <div className="text-center">
          <p className="eyebrow">Servicios & precios</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold">
            Tratamientos para tus uñas
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-ink-soft)]">
            Elige tu servicio y reserva en línea. Para asegurar tu cita se
            requiere un depósito que se aplica al total del servicio.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/servicios" className="btn-outline">
            Ver todos los servicios <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-[var(--color-nude-light)] py-20">
        <div className="section">
          <div className="text-center">
            <p className="eyebrow">Galería</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Trabajos recientes
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.length > 0
              ? gallery.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img.id}
                    src={img.url}
                    alt={img.caption || "Trabajo de uñas de Manicure by Lola"}
                    className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
                  />
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-gold-light)] text-white/80"
                  >
                    <Sparkles size={28} />
                  </div>
                ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/galeria" className="btn-outline">
              Ver galería completa
            </Link>
          </div>
        </div>
      </section>

      {/* SOBRE LOLA */}
      <section className="section grid items-center gap-10 py-20 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-rose)] shadow-[var(--shadow-soft)]" />
        <div>
          <p className="eyebrow">Sobre Lola</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold">
            Hola, soy Lola
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Me especializo en manicures limpias, elegantes y duraderas, cuidando
            cada detalle para que salgas feliz con tus uñas.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/reservar" className="btn-primary">
              Reservar cita
            </Link>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Instagram size={16} /> Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="section pb-8">
        <div className="card flex flex-col items-center gap-5 bg-gradient-to-br from-[var(--color-rose-deep)] to-[var(--color-gold)] p-10 text-center text-white md:p-14">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            ¿Lista para tus uñas perfectas?
          </h2>
          <p className="max-w-md text-white/90">
            Escríbeme por WhatsApp o reserva tu cita en línea. ¡Te espero!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/reservar"
              className="rounded-full bg-white px-7 py-3 font-medium text-[var(--color-rose-deep)] transition hover:opacity-90"
            >
              Reservar cita
            </Link>
            <a
              href={whatsappLink("Hola Lola, quiero reservar una cita ✨")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/70 px-7 py-3 font-medium text-white transition hover:bg-white/10"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
