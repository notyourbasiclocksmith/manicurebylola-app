import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./public/uploads";

const mime: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: Request,
  { params }: { params: { file: string } }
) {
  // Evita path traversal: solo el nombre base.
  const safe = path.basename(params.file);
  const ext = path.extname(safe).toLowerCase();
  if (!mime[ext]) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, safe));
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": mime[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}
