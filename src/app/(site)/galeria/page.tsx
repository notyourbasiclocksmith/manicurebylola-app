import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Fotos de trabajos de Manicure by Lola: builder gel, diseños naturales, nail art y antes/después en Dallas y Addison.",
};

const categories = [
  { key: "builder-gel", label: "Builder Gel" },
  { key: "natural", label: "Diseños naturales" },
  { key: "nail-art", label: "Nail Art" },
  { key: "antes-despues", label: "Antes y después" },
];

export default async function GaleriaPage() {
  const images = await getGallery();

  return (
    <>
      <section className="bg-[var(--color-nude-light)] py-16">
        <div className="section text-center">
          <p className="eyebrow">Galería</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">
            Mi trabajo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)]">
            Diseños hechos con amor y detalle. Builder gel, estilos naturales,
            nail art y resultados antes y después.
          </p>
        </div>
      </section>

      <section className="section py-16">
        {images.length === 0 ? (
          <div className="rounded-[2rem] bg-[var(--color-nude-light)] p-12 text-center">
            <Sparkles
              size={36}
              className="mx-auto text-[var(--color-rose-deep)]"
            />
            <p className="mt-4 font-serif text-2xl font-semibold">
              Pronto verás fotos aquí
            </p>
            <p className="mx-auto mt-2 max-w-md text-[var(--color-ink-soft)]">
              Lola podrá subir sus mejores trabajos desde el panel de
              administración.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {categories.map((cat) => {
              const imgs = images.filter((i) => i.category === cat.key);
              if (imgs.length === 0) return null;
              return (
                <div key={cat.key}>
                  <h2 className="mb-6 font-serif text-3xl font-semibold">
                    {cat.label}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {imgs.map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id}
                        src={img.url}
                        alt={img.caption || cat.label}
                        className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Imágenes sin categoría reconocida */}
            {(() => {
              const known = categories.map((c) => c.key);
              const rest = images.filter((i) => !known.includes(i.category));
              if (rest.length === 0) return null;
              return (
                <div>
                  <h2 className="mb-6 font-serif text-3xl font-semibold">Más</h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {rest.map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id}
                        src={img.url}
                        alt={img.caption || "Trabajo de uñas"}
                        className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>
    </>
  );
}
