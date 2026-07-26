import { BOOKING_URL, SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CutViewer from "@/components/CutViewer";

export default function Home() {
  return (
    <div className="snap-page">
      {/* HERO */}
      <section className="hero snap">
        <div className="aura-wrap">
          <div className="aura" />
        </div>
        <div className="container hero__inner">
          <p className="eyebrow hero__eyebrow">Pullman · Est. 2026</p>

          <h1>
            <span className="mask" style={{ "--d": "0.12s" }}>
              <span>Own Lane</span>
            </span>
            <span className="mask" style={{ "--d": "0.24s" }}>
              <span>Own Pace</span>
            </span>
          </h1>

          <div className="hero__rule" />

          <div className="hero__actions">
            <a
              className="btn btn--solid"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Chair
              <span className="btn__arrow" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </div>
        </div>

        <div className="cue" aria-hidden="true">
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section snap" id="services">
        <div className="container">
          <Reveal>
            <div className="reveal-item">
              <CutViewer />
            </div>
          </Reveal>
        </div>

        <div className="cue cue--quick" aria-hidden="true">
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
        </div>
      </section>

      {/* VISIT */}
      <section className="section visit snap">
        <Reveal className="container visit__inner">
          <div className="reveal-item">
            <p className="eyebrow">Visit</p>
            <p className="visit__line">{SITE.address}</p>
            <p className="visit__line muted">{SITE.location}</p>
          </div>
          <div className="reveal-item" style={{ "--i": 1 }}>
            <p className="eyebrow">Hours</p>
            {SITE.hours.map((h) => (
              <p className="visit__line" key={h.days}>
                {h.days} <span className="muted">{h.time}</span>
              </p>
            ))}
          </div>
          <div className="reveal-item" style={{ "--i": 2 }}>
            <p className="eyebrow">Book</p>
            <a
              className="btn btn--ghost"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve Now
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
