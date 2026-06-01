import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

// Si no hay clave configurada todavía, exportamos null para que el flujo
// muestre un mensaje claro en lugar de romper el build.
export const stripe = key
  ? new Stripe(key, { apiVersion: "2025-02-24.acacia" })
  : null;

export const stripeEnabled = Boolean(key);
