import Link from "next/link";
import { SITE, NAV_LINKS, BOOKING_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand wordmark">SONDER</div>

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
              <p>128 Ossington Ave</p>
              <p>{SITE.location}</p>
              <p>Tue–Sun · 10–8</p>
            </div>

            <div className="footer__col">
              <h4>Contact</h4>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} SONDER Barber. All rights reserved.</span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
