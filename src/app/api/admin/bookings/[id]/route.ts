import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

const validStatus = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const denied = guard();
  if (denied) return denied;

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};

  if (typeof body.status === "string" && validStatus.includes(body.status)) {
    data.status = body.status;
  }
  if (typeof body.adminNote === "string") {
    data.adminNote = body.adminNote;
  }
  if (typeof body.depositStatus === "string") {
    data.depositStatus = body.depositStatus;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nada que actualizar" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ ok: true, booking });
  } catch {
    return NextResponse.json(
      { error: "No se pudo actualizar la cita" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const denied = guard();
  if (denied) return denied;
  try {
    await prisma.booking.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se pudo eliminar la cita" },
      { status: 500 }
    );
  }
}
