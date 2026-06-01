import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-cream)] px-4 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-[var(--color-ink-soft)]">
        La página que buscas no existe o fue movida.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Volver al inicio
      </Link>
    </div>
  );
}
