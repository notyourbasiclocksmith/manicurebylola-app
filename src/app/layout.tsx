import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-loaded",
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Uñas en ${site.city}, ${site.state}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Manicure profesional en Fort Worth: builder gel, gel manicure, acrylic nails, nail art y más. Uñas elegantes, limpias y duraderas. Reserva tu cita en línea.",
  keywords: [
    "manicure near me",
    "builder gel nails",
    "nail salon Fort Worth",
    "gel manicure",
    "nails in Fort Worth",
    "manicure by lola",
    "acrylic nails Fort Worth",
    "nail art",
  ],
  openGraph: {
    type: "website",
    locale: "es_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Uñas elegantes en ${site.city}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
  alternates: { canonical: site.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
