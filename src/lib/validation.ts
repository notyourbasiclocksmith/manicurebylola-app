import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Ingresa tu nombre completo").max(120),
  phone: z.string().min(7, "Ingresa un teléfono válido").max(30),
  email: z.string().email("Ingresa un email válido"),
  serviceSlug: z.string().min(1, "Selecciona un servicio"),
  preferredDate: z.string().min(1, "Selecciona una fecha"),
  preferredTime: z.string().min(1, "Selecciona una hora"),
  notes: z.string().max(1000).optional().or(z.literal("")),
  policyAccepted: z
    .boolean()
    .refine((v) => v === true, "Debes aceptar la política de depósito"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
