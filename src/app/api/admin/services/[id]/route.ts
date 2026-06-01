import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const denied = guard();
  if (denied) return denied;

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};

  if (body.priceCents === null || typeof body.priceCents === "number") {
    data.priceCents = body.priceCents;
  }
  if (typeof body.priceNote === "string" || body.priceNote === null) {
    data.priceNote = body.priceNote || null;
  }
  if (typeof body.durationMin === "number") {
    data.durationMin = Math.max(15, Math.round(body.durationMin));
  }
  if (typeof body.depositCents === "number") {
    data.depositCents = Math.max(0, Math.round(body.depositCents));
  }
  if (typeof body.active === "boolean") {
    data.active = body.active;
  }

  try {
    const service = await prisma.service.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ ok: true, service });
  } catch {
    return NextResponse.json(
      { error: "No se pudo actualizar el servicio" },
      { status: 500 }
    );
  }
}
