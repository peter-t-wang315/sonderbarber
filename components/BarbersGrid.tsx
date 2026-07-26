"use client";

import { useState } from "react";
import { BARBERS, BOOKING_URL } from "@/lib/site";
import Reveal from "@/components/Reveal";

// At most this many barbers share the grid at once; any more paginate behind
// the prev/next arrows.
const PER_PAGE = 3;

export default function BarbersGrid() {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(BARBERS.length / PER_PAGE);
  const hasNav = BARBERS.length > PER_PAGE;

  const start = page * PER_PAGE;
  const visible = BARBERS.slice(start, start + PER_PAGE);

  // Wrap around, matching the cut viewer's arrows.
  const go = (dir: number) => setPage((p) => (p + dir + pageCount) % pageCount);

  return (
    <Reveal className="container barbers-carousel">
      {hasNav && (
        <button
          type="button"
          className="arrow barbers__nav"
          onClick={() => go(-1)}
          aria-label="Previous barbers"
        >
          <span aria-hidden="true">&#8592;</span>
        </button>
      )}

      {/* --cols keys the grid to the number actually shown, so a partial last
          page (e.g. 1 barber) still centres nicely instead of hugging left. */}
      <div className="barbers" style={{ "--cols": visible.length }}>
        {visible.map((b, i) => (
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
      </div>

      {hasNav && (
        <button
          type="button"
          className="arrow barbers__nav"
          onClick={() => go(1)}
          aria-label="Next barbers"
        >
          <span aria-hidden="true">&#8594;</span>
        </button>
      )}
    </Reveal>
  );
}
