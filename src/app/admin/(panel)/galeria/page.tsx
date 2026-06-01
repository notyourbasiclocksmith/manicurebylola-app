import { prisma } from "@/lib/prisma";
import GalleryManager from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGaleriaPage() {
  let images: Awaited<ReturnType<typeof prisma.galleryImage.findMany>> = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return (
      <div className="card p-8 text-center">
        <h1 className="font-serif text-2xl font-semibold">
          Base de datos no disponible
        </h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Configura la base de datos para administrar la galería.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Galería</h1>
        <p className="text-[var(--color-ink-soft)]">
          Sube fotos de tu trabajo o agrégalas por URL. Elige una categoría.
        </p>
      </div>

      <GalleryManager
        images={images.map((i) => ({
          id: i.id,
          url: i.url,
          caption: i.caption,
          category: i.category,
        }))}
      />
    </div>
  );
}
