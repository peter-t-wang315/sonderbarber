import { BARBERS, BOOKING_URL } from "@/lib/site";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — SONDER",
  description:
    "Meet the barbers behind SONDER — a modern Toronto barbershop built on craft, patience and swagger.",
};

export default function About() {
  return (
    <div className="snap-page">
      {/* INTRO */}
      <section className="hero snap">
        <div className="aura-wrap">
          <div className="aura" />
        </div>
        <div className="container hero__inner">
          <p className="eyebrow hero__eyebrow">About</p>

          <h1>
            <span className="mask" style={{ "--d": "0.12s" }}>
              <span>The people</span>
            </span>
            <span className="mask" style={{ "--d": "0.24s" }}>
              <span>behind the chair</span>
            </span>
          </h1>

          <div className="hero__rule" />

          <p className="lead hero__lead">
            One room, three chairs, and a shared obsession with getting it right.
          </p>
        </div>

        <div className="cue" aria-hidden="true">
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
        </div>
      </section>

      {/* BARBERS — three columns on one panel */}
      <section className="section snap">
        <Reveal className="container barbers">
          {BARBERS.map((b, i) => (
            <div className="barber reveal-item" key={b.name} style={{ "--i": i }}>
              <div className="barber__media">
                <img src={b.image} alt={`${b.name}, barber at SONDER`} />
              </div>
              <p className="barber__role">{b.role}</p>
              <h2>{b.name}</h2>
              <p className="lead">{b.bio}</p>
              <a
                className="btn btn--ghost"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book with {b.name.split(" ")[0]}
              </a>
            </div>
          ))}
        </Reveal>

        <div className="cue cue--quick" aria-hidden="true">
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
        </div>
      </section>

      {/* ABOUT COPY */}
      <section className="section snap about-copy">
        <Reveal className="container about-copy__inner">
          <div className="about-copy__blurb reveal-item">
            <p className="eyebrow">The craft</p>
            <div className="about-copy__cols">
              <p>
                Located in the heart of Pullman, Washington, our state-of-the-art
                facility combines modern innovation with the timeless craft of
                barbering.
              </p>
              <p>
                We deliberately choose quality over quantity. We don&apos;t rush,
                and we don&apos;t cut corners. Every service is a dedicated,
                meticulous experience tailored entirely to you, ensuring you leave
                the chair looking and feeling your absolute best.
              </p>
            </div>
          </div>

          <p className="about-copy__sign reveal-item" style={{ "--i": 1 }}>
            <span className="about-copy__mark">SONDER</span>
            <span className="about-copy__tagline">
              <span className="about-copy__sep" aria-hidden="true">
                |
              </span>
              <span className="about-copy__tag">Own lane. Own pace.</span>
            </span>
          </p>
        </Reveal>

        <div className="cue cue--quick" aria-hidden="true">
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
          <span className="cue__caret" />
        </div>
      </section>

      {/* CTA */}
      <section className="section snap cta">
        <Reveal className="container">
          <p className="eyebrow reveal-item">Come through</p>
          <h2 className="reveal-item" style={{ "--i": 1 }}>
            Pick your barber. Pick your time.
          </h2>
          <div className="reveal-item" style={{ "--i": 2 }}>
            <a
              className="btn btn--solid"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Chair
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
