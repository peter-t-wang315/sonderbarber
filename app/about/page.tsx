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

        <div className="cue" aria-hidden="true" />
      </section>

      {/* BARBERS — one panel each */}
      {BARBERS.map((b) => (
        <section className="section snap" key={b.name}>
          <Reveal className="container barber">
            <div className="barber__media reveal-item">
              <img src={b.image} alt={`${b.name}, barber at SONDER`} />
            </div>
            <p className="barber__role reveal-item" style={{ "--i": 1 }}>
              {b.role}
            </p>
            <h2 className="reveal-item" style={{ "--i": 2 }}>
              {b.name}
            </h2>
            <p className="lead reveal-item" style={{ "--i": 3 }}>
              {b.bio}
            </p>
            <a
              className="btn btn--ghost reveal-item"
              style={{ "--i": 4 }}
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book with {b.name.split(" ")[0]}
            </a>
          </Reveal>

          <div className="cue cue--quick" aria-hidden="true" />
        </section>
      ))}

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
