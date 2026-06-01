"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Link2, Trash2, Loader2 } from "lucide-react";

type Img = {
  id: string;
  url: string;
  caption: string | null;
  category: string;
};

const categories = [
  { key: "builder-gel", label: "Builder Gel" },
  { key: "natural", label: "Diseños naturales" },
  { key: "nail-art", label: "Nail Art" },
  { key: "antes-despues", label: "Antes y después" },
  { key: "general", label: "General" },
];

export default function GalleryManager({ images }: { images: Img[] }) {
  const router = useRouter();
  const [category, setCategory] = useState("builder-gel");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("caption", caption);
    fd.append("category", category);
    const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
    setBusy(false);
    e.target.value = "";
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "No se pudo subir la imagen");
      return;
    }
    setCaption("");
    router.refresh();
  }

  async function addByUrl() {
    if (!url.trim()) return;
    setError(null);
    setBusy(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, caption, category }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "No se pudo agregar la imagen");
      return;
    }
    setUrl("");
    setCaption("");
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar esta foto?")) return;
    setBusy(true);
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="card space-y-4 p-6">
        <h2 className="font-serif text-xl font-semibold">Agregar foto</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Categoría</label>
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Descripción (opcional)</label>
            <input
              className="input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ej: French con detalle dorado"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="btn-outline cursor-pointer justify-center">
            <Upload size={16} /> Subir desde el dispositivo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadFile}
              disabled={busy}
            />
          </label>

          <div className="flex gap-2">
            <input
              className="input"
              placeholder="…o pega una URL de imagen"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={addByUrl}
              disabled={busy}
              className="btn-primary shrink-0 text-sm"
            >
              <Link2 size={16} /> Agregar
            </button>
          </div>
        </div>

        {busy && (
          <p className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
            <Loader2 size={16} className="animate-spin" /> Procesando…
          </p>
        )}
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      {images.length === 0 ? (
        <p className="text-center text-[var(--color-ink-soft)]">
          Aún no hay fotos. ¡Sube la primera!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="card group relative overflow-hidden p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.caption || "Foto"}
                className="aspect-square w-full object-cover"
              />
              <button
                onClick={() => remove(img.id)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-red-600 shadow transition hover:bg-red-600 hover:text-white"
                aria-label="Eliminar"
              >
                <Trash2 size={15} />
              </button>
              <span className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-0.5 text-[0.65rem] text-white">
                {categories.find((c) => c.key === img.category)?.label ||
                  img.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
