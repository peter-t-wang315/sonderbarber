import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  title: "SONDER — A Modern Barbershop",
  description:
    "SONDER is a modern barbershop. Clean fades, sharp lines, and a room with swagger. Book your chair.",
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
