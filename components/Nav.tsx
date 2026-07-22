"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, BOOKING_URL } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation — the panel would otherwise stay open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes, and an open menu locks the page behind it.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav${open ? " is-open" : ""}`}>
      <div className="container nav__inner">
        <Link href="/" className="nav__brand" aria-label="SONDER home">
          SONDER<sup>®</sup>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname === link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__cta">
          <a
            className="nav__book"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Two stacked copies: the first slides up and out, the second
                follows it in, so the label rolls over on hover. */}
            <span className="nav__book-roll">
              <span>Book Now</span>
              <span aria-hidden="true">Book Now</span>
            </span>
          </a>

          {/* Three bars that fold into an X while the panel is open. */}
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__panel" hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname === link.href}
              style={{ "--i": i }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ "--i": NAV_LINKS.length }}
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
