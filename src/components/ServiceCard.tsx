import Link from "next/link";
import { Clock } from "lucide-react";
import { formatPrice } from "@/lib/config";

type Props = {
  service: {
    slug: string;
    name: string;
    description: string;
    priceCents: number | null;
    priceNote: string | null;
    durationMin: number;
  };
};

export default function ServiceCard({ service }: Props) {
  const price = service.priceCents != null ? formatPrice(service.priceCents) : null;

  return (
    <div className="card flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold">{service.name}</h3>
        <div className="text-right">
          {price ? (
            <span className="font-serif text-2xl font-semibold text-[var(--color-rose-deep)]">
              {price}
            </span>
          ) : (
            <span className="text-sm font-medium text-[var(--color-gold)]">
              {service.priceNote || "Consultar"}
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        {service.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
          <Clock size={14} /> ~{service.durationMin} min
        </span>
        <Link
          href={`/reservar?servicio=${service.slug}`}
          className="btn-outline text-sm"
        >
          Reservar
        </Link>
      </div>
    </div>
  );
}
