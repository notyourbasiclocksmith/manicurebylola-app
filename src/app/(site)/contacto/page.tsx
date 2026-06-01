import type { Metadata } from "next";
import { Phone, MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import { site, whatsappLink, dayNames } from "@/lib/config";
import { getBusinessHours } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta a Manicure by Lola en ${site.serviceArea}. WhatsApp, llamada, Instagram y horarios.`,
};

const defaultHours = [
  { dayOfWeek: 0, isOpen: false, openTime: "10:00", closeTime: "16:00" },
  { dayOfWeek: 1, isOpen: true, openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: 2, isOpen: true, openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: 3, isOpen: true, openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: 4, isOpen: true, openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: 5, isOpen: true, openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: 6, isOpen: true, openTime: "10:00", closeTime: "16:00" },
];

export default async function ContactoPage() {
  const dbHours = await getBusinessHours();
  const hours = dbHours.length > 0 ? dbHours : defaultHours;

  return (
    <>
      <section className="bg-[var(--color-nude-light)] py-16">
        <div className="section text-center">
          <p className="eyebrow">Contacto</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">
            Hablemos
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)]">
            Escríbeme por WhatsApp o llámame para resolver cualquier duda y
            reservar tu cita.
          </p>
        </div>
      </section>

      <section className="section grid gap-8 py-16 md:grid-cols-2">
        <div className="space-y-4">
          <a
            href={whatsappLink("Hola Lola, quiero reservar una cita ✨")}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 p-6 transition hover:shadow-lg"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-nude)] text-[var(--color-rose-deep)]">
              <MessageCircle size={22} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold">WhatsApp</p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                Respuesta rápida — toca para escribir
              </p>
            </div>
          </a>

          <a
            href={`tel:${site.phoneHref}`}
            className="card flex items-center gap-4 p-6 transition hover:shadow-lg"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-nude)] text-[var(--color-rose-deep)]">
              <Phone size={22} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold">Llamar</p>
              <p className="text-sm text-[var(--color-ink-soft)]">{site.phone}</p>
            </div>
          </a>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 p-6 transition hover:shadow-lg"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-nude)] text-[var(--color-rose-deep)]">
              <Instagram size={22} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold">Instagram</p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                @{site.instagram}
              </p>
            </div>
          </a>

          <div className="card flex items-center gap-4 p-6">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-nude)] text-[var(--color-rose-deep)]">
              <MapPin size={22} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold">Área de servicio</p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {site.address || site.serviceArea}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
            <Clock size={22} className="text-[var(--color-gold)]" /> Horarios
          </h2>
          <ul className="mt-6 divide-y divide-[var(--color-sand)]">
            {hours.map((h) => (
              <li
                key={h.dayOfWeek}
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">{dayNames[h.dayOfWeek]}</span>
                <span className="text-[var(--color-ink-soft)]">
                  {h.isOpen ? `${h.openTime} – ${h.closeTime}` : "Cerrado"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
