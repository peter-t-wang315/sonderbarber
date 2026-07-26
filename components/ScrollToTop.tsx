"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Next.js resets scroll on navigation, but the global `scroll-behavior: smooth`
// turns that reset into an animated crawl (and the home page's scroll snapping
// can leave you mid-page). Force an instant jump to the top on every route change.
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
