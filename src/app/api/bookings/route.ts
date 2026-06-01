import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";
import { bookingSchema } from "@/lib/validation";
import { getServiceBySlug } from "@/lib/data";
import { site } from "@/lib/config";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message || "Datos inválidos";
    return NextResponse.json({ error: first }, { status: 400 });
  }
  const data = parsed.data;

  const service = await getServiceBySlug(data.serviceSlug);
  if (!service) {
    return NextResponse.json(
      { error: "El servicio seleccionado no existe" },
      { status: 400 }
    );
  }

  const depositCents = service.depositCents ?? 2000;

  // Crear la reserva en estado PENDING
  let booking;
  try {
    booking = await prisma.booking.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        notes: data.notes || null,
        policyAccepted: data.policyAccepted,
        serviceId: (service as { id: string }).id,
        depositCents,
        status: "PENDING",
        depositStatus: "UNPAID",
      },
    });
  } catch (e) {
    console.error("Error creando reserva:", e);
    return NextResponse.json(
      { error: "No se pudo guardar la reserva. Intenta más tarde." },
      { status: 500 }
    );
  }

  // Si Stripe no está configurado, devolvemos la reserva sin checkout.
  if (!stripeEnabled || !stripe) {
    return NextResponse.json({ ok: true, bookingId: booking.id });
  }

  const baseUrl = site.url;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Sin payment_method_types: Stripe muestra automáticamente tarjeta +
      // Apple Pay / Google Pay según lo habilitado en el Dashboard.
      customer_email: data.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: depositCents,
            product_data: {
              name: `Depósito — ${service.name}`,
              description: `Depósito para asegurar tu cita de ${service.name}. Se aplica al total del servicio.`,
            },
          },
        },
      ],
      metadata: {
        bookingId: booking.id,
        serviceName: service.name,
      },
      success_url: `${baseUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/reservar?cancelado=1`,
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (e) {
    console.error("Error creando checkout de Stripe:", e);
    // La reserva ya quedó guardada; permitimos continuar sin pago en línea.
    return NextResponse.json({ ok: true, bookingId: booking.id });
  }
}
