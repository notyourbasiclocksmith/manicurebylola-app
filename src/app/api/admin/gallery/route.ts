import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./public/uploads";
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request) {
  const denied = guard();
  if (denied) return denied;

  const contentType = req.headers.get("content-type") || "";

  // --- Subida de archivo (multipart) ---
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const caption = String(form.get("caption") || "");
    const category = String(form.get("category") || "general");

    if (!file) {
      return NextResponse.json({ error: "Falta el archivo" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato no permitido (usa JPG, PNG, WEBP o GIF)" },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "La imagen supera el límite de 8 MB" },
        { status: 400 }
      );
    }

    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
    } catch (e) {
      console.error("Error guardando archivo:", e);
      return NextResponse.json(
        { error: "No se pudo guardar la imagen" },
        { status: 500 }
      );
    }

    const url = `/api/uploads/${filename}`;
    const image = await prisma.galleryImage.create({
      data: { url, caption: caption || null, category },
    });
    return NextResponse.json({ ok: true, image });
  }

  // --- Agregar por URL externa (JSON) ---
  const body = await req.json().catch(() => ({}));
  if (!body.url || typeof body.url !== "string") {
    return NextResponse.json({ error: "Falta la URL" }, { status: 400 });
  }
  const image = await prisma.galleryImage.create({
    data: {
      url: body.url,
      caption: body.caption || null,
      category: body.category || "general",
    },
  });
  return NextResponse.json({ ok: true, image });
}
