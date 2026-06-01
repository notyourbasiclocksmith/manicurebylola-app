import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/config";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: site.name,
    description: site.tagline,
    url: site.url,
    image: `${site.url}/og.jpg`,
    telephone: site.phoneHref,
    email: site.email,
    areaServed: site.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "US",
    },
    sameAs: [site.instagramUrl],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
