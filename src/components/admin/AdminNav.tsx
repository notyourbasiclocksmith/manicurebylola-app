"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  DollarSign,
  Images,
  Clock,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Citas", icon: CalendarDays },
  { href: "/admin/precios", label: "Precios", icon: DollarSign },
  { href: "/admin/galeria", label: "Galería", icon: Images },
  { href: "/admin/horarios", label: "Horarios", icon: Clock },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-[var(--color-sand)] bg-white">
      <div className="section flex flex-wrap items-center justify-between gap-3 py-3">
        <span className="font-serif text-xl font-semibold">
          Panel <span className="text-[var(--color-rose-deep)]">Lola</span>
        </span>

        <nav className="flex flex-wrap items-center gap-1">
          {links.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--color-rose-deep)] text-white"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-nude-light)]"
                }`}
              >
                <Icon size={16} /> {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-nude-light)]"
          >
            <ExternalLink size={16} /> Ver sitio
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>
    </header>
  );
}
