import Link from "next/link";
import { Instagram, Phone, MessageCircle, MapPin } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-sand)] bg-[var(--color-nude-light)]">
      <div className="section grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-semibold">
            Manicure <span className="text-[var(--color-rose-deep)]">by Lola</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-ink-soft)]">
            {site.tagline}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
            <MapPin size={16} /> {site.serviceArea}
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-soft)]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[var(--color-rose-deep)]">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reservar" className="hover:text-[var(--color-rose-deep)]">
                Reservar cita
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-ink-soft)]">
            <li>
              <a
                href={whatsappLink("Hola Lola, quiero reservar una cita ✨")}
                className="flex items-center gap-2 hover:text-[var(--color-rose-deep)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-2 hover:text-[var(--color-rose-deep)]"
              >
                <Phone size={16} /> {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                className="flex items-center gap-2 hover:text-[var(--color-rose-deep)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} /> @{site.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-sand)] py-5 text-center text-xs text-[var(--color-ink-soft)]">
        © {new Date().getFullYear()} {site.name} · {site.region} · Todos los
        derechos reservados
      </div>
    </footer>
  );
}
