"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BOOKING_URL } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav">
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
        </div>
      </div>
    </header>
  );
}
