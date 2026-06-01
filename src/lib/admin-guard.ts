import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

// Lanza una respuesta 401 si no hay sesión admin. Úsalo al inicio de cada
// route handler de /api/admin.
export function guard(): NextResponse | null {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return null;
}
