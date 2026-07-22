import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — SONDER",
  description: "The SONDER shop is on its way. Grooming goods, coming soon.",
};

export default function Shop() {
  return (
    <div className="snap-page">
      <section className="hero snap">
        <div className="aura-wrap">
          <div className="aura" />
        </div>
        <div className="container hero__inner">
          <p className="eyebrow hero__eyebrow">The SONDER Shop</p>

          <h1 className="building__word">
            <span className="mask" style={{ "--d": "0.12s" }}>
              <span>
                Building<span className="dots">…</span>
              </span>
            </span>
          </h1>

          <div className="hero__rule" />

          <p className="lead hero__lead">Grooming goods · Dropping soon</p>
        </div>
      </section>
    </div>
  );
}
