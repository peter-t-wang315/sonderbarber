import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { SITE, BOOKING_URL } from "@/lib/site";

// Inter carries body copy, labels and buttons.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display face for the wordmark and headlines.
//
// The real SONDER logotype is an ultra-bold extended grotesque — its closest
// commercial match is PP Monument Extended (Heavy/Black) from Pangram Pangram,
// which is a paid licence. Archivo is a free variable grotesque with a width
// axis; pushed to wdth 125 / wght 900 it lands very close to that silhouette.
//
// To swap in the real thing once licensed: drop the woff2 files in
// app/fonts/, replace this with next/font/local, and keep the same
// --font-display variable name — no other file needs to change.
//
//   import localFont from "next/font/local";
//   const display = localFont({
//     src: [{ path: "./fonts/MonumentExtended-Black.woff2", weight: "900" }],
//     variable: "--font-display",
//     display: "swap",
//   });
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: point this at the real production domain once it's live — it makes
  // canonical and Open Graph URLs absolute.
  metadataBase: new URL("https://sonderbarbers.com"),
  title: {
    default: "SONDER — Own Lane Own Pace",
    template: "%s — SONDER Barbershop | Pullman, WA",
  },
  description:
    "SONDER is a modern men's barbershop in Pullman, WA. Clean fades, sharp lineups, beard trims, and classic cuts. Book your chair with Pullman's premier barbers.",
  keywords: [
    "barbershop Pullman WA",
    "barber Pullman WA",
    "barbers in Pullman WA",
    "men's haircut Pullman",
    "mens barbershop Pullman Washington",
    "fades Pullman",
    "beard trim Pullman WA",
    "Pullman barber shop",
    "haircut near me Pullman",
    "WSU barber",
    "SONDER barbers",
  ],
  applicationName: "SONDER Barbershop",
  category: "Barbershop",
  authors: [{ name: "SONDER Barbershop" }],
  creator: "SONDER Barbershop",
  publisher: "SONDER Barbershop",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SONDER Barbershop",
    title: "SONDER — Modern Men's Barbershop in Pullman, WA",
    description:
      "A modern men's barbershop in Pullman, WA. Clean fades, sharp lineups, beard trims, and classic cuts. Book your chair.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SONDER — Modern Men's Barbershop in Pullman, WA",
    description:
      "A modern men's barbershop in Pullman, WA. Clean fades, sharp lineups, and classic cuts. Book your chair.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Local-search geo hints.
  other: {
    "geo.region": "US-WA",
    "geo.placename": "Pullman",
  },
};

// LocalBusiness structured data — the strongest on-page signal for local
// search ("barbers in Pullman WA"). Google reads this to place the shop on
// Maps / local packs. Keep the facts in sync with lib/site.ts.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: SITE.name,
  description:
    "A modern men's barbershop in Pullman, WA offering clean fades, sharp lineups, beard trims, and classic cuts.",
  url: "https://sonderbarbers.com",
  image: "https://sonderbarbers.com/sonderlogo.png",
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Pullman",
    addressRegion: "WA",
    postalCode: "99163",
    addressCountry: "US",
  },
  areaServed: "Pullman, WA",
  priceRange: "$$",
  sameAs: [SITE.instagram],
  hasMap: "https://maps.google.com/?q=SONDER+Barbershop+Pullman+WA",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: BOOKING_URL,
    name: "Book a chair",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Browser extensions inject attributes into the document shell before React
  // hydrates (e.g. data-__host_prefix_*-filters-channel), which React 19 reports
  // as a hydration mismatch. Suppressed on the two shell nodes only —
  // mismatches inside our own components still surface.
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          // Structured data must be raw JSON in the DOM, hence dangerouslySet.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <ScrollToTop />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
