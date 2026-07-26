import Link from "next/link";
import { SITE, NAV_LINKS, BOOKING_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <img
            className="footer__brand"
            src="/sonderlogo-black.png"
            alt="SONDER"
          />

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Menu</h4>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book
              </a>
            </div>

            <div className="footer__col">
              <h4>Visit</h4>
              <p>{SITE.address}</p>
              <p>{SITE.location}</p>
              {SITE.hours.map((h) => (
                <p key={h.days}>
                  {h.days} · {h.time}
                </p>
              ))}
            </div>

            <div className="footer__col">
              <h4>Contact</h4>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a
                className="footer__social"
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} SONDER Barber. All rights reserved.
          </span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
