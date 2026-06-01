"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/config";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-sand)] bg-[var(--color-cream)]/90 backdrop-blur">
      <div className="section flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold text-[var(--color-ink)]">
            Manicure <span className="text-[var(--color-rose-deep)]">by Lola</span>
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            {site.city}, {site.state}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-deep)]"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/reservar" className="btn-primary text-sm">
            Reservar cita
          </Link>
        </nav>

        <button
          aria-label="Abrir menú"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-sand)] bg-[var(--color-cream)] md:hidden">
          <div className="section flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-base font-medium text-[var(--color-ink)] hover:bg-[var(--color-nude-light)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/reservar"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Reservar cita
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
