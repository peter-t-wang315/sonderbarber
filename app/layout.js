import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Inter — a clean neo-grotesque in the Helvetica lineage, closest free match
// to the heavy, tightly-tracked SONDER wordmark.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "SONDER — A Modern Barbershop",
  description:
    "SONDER is a modern barbershop. Clean fades, sharp lines, and a room with swagger. Book your chair.",
};

export default function RootLayout({ children }) {
  // Browser extensions inject attributes into the document shell before React
  // hydrates (e.g. data-__host_prefix_*-filters-channel), which React 19 reports
  // as a hydration mismatch. Suppressed on the two shell nodes only —
  // mismatches inside our own components still surface.
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
