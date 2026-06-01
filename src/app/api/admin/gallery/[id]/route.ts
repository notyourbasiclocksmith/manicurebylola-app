import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";
import path from "path";
import fs from "fs/promises";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./public/uploads";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const denied = guard();
  if (denied) return denied;

  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    });
    if (image?.url.startsWith("/api/uploads/")) {
      const filename = image.url.replace("/api/uploads/", "");
      await fs
        .unlink(path.join(UPLOAD_DIR, filename))
        .catch(() => undefined);
    }
    await prisma.galleryImage.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se pudo eliminar la imagen" },
      { status: 500 }
    );
  }
}
