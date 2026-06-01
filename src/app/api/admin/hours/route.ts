import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function PATCH(req: Request) {
  const denied = guard();
  if (denied) return denied;

  const body = await req.json().catch(() => ({}));
  if (!Array.isArray(body.hours)) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    for (const h of body.hours) {
      const dayOfWeek = Number(h.dayOfWeek);
      if (dayOfWeek < 0 || dayOfWeek > 6) continue;
      const openTime = timeRe.test(h.openTime) ? h.openTime : "09:00";
      const closeTime = timeRe.test(h.closeTime) ? h.closeTime : "18:00";
      const isOpen = Boolean(h.isOpen);

      await prisma.businessHour.upsert({
        where: { dayOfWeek },
        update: { isOpen, openTime, closeTime },
        create: { dayOfWeek, isOpen, openTime, closeTime },
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se pudieron guardar los horarios" },
      { status: 500 }
    );
  }
}
