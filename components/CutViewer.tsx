"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/site";

const wrap = (v: number, n: number) => ((v % n) + n) % n;

/*
 * ─── TEMPORARY: STATIC CUT VIEWER (changed 2026-07-26) ──────────────────────
 *
 * We don't have panoramic / turntable photography yet — only a single static
 * photo per cut (public/haircuts/*.jpeg, wired up in lib/site.ts). So the
 * original drag/swipe/wheel/arrow-key turntable was replaced by this static
 * gallery: one photo + its name at a time, with prev/next arrows to step
 * between cuts. The price was removed.
 *
 * WHEN THE PANORAMIC CUTS ARRIVE:
 *   1. Restore the frames-based SERVICES (FRAME_COUNT + frames() helper) in
 *      lib/site.ts — the old version is preserved in a comment there.
 *   2. Replace this component with the ORIGINAL TURNTABLE VIEWER preserved in
 *      the block comment at the bottom of this file.
 * ────────────────────────────────────────────────────────────────────────────
 */
export default function CutViewer() {
  const [cut, setCut] = useState(0);
  const service = SERVICES[cut];
  const goCut = (dir: number) => setCut((c) => wrap(c + dir, SERVICES.length));

  return (
    <div className="viewer">
      <button
        type="button"
        className="arrow viewer__nav viewer__nav--prev"
        onClick={() => goCut(-1)}
        aria-label="Previous cut"
      >
        <span aria-hidden="true">&#8592;</span>
      </button>

      <div className="viewer__stage">
        <img
          key={service.image}
          className="is-on"
          src={service.image}
          alt={service.title}
          draggable={false}
        />
      </div>

      <button
        type="button"
        className="arrow viewer__nav viewer__nav--next"
        onClick={() => goCut(1)}
        aria-label="Next cut"
      >
        <span aria-hidden="true">&#8594;</span>
      </button>

      <div className="viewer__meta">
        <span className="viewer__count">
          {String(cut + 1).padStart(2, "0")} /{" "}
          {String(SERVICES.length).padStart(2, "0")}
        </span>
        <h3 key={service.title}>{service.title}</h3>
      </div>
    </div>
  );
}

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * ORIGINAL TURNTABLE VIEWER — restore when real panoramic/turntable frames are
 * available (see notes above and in lib/site.ts). Kept verbatim for reference.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * "use client";
 *
 * import {
 *   useCallback,
 *   useEffect,
 *   useRef,
 *   useState,
 *   type KeyboardEvent as ReactKeyboardEvent,
 *   type PointerEvent as ReactPointerEvent,
 * } from "react";
 * import { SERVICES } from "@/lib/site";
 *
 * // Pixels of horizontal travel per angle step. Lower = twitchier rotation.
 * const DRAG_STEP = 54;
 * const WHEEL_STEP = 46;
 *
 * const wrap = (v: number, n: number) => ((v % n) + n) % n;
 *
 * // Two-level viewer.
 * //
 * //   Edge arrows / click        -> change cut
 * //   Horizontal drag or swipe   -> scrub the angle frames of the current cut
 * //   Horizontal trackpad wheel  -> same scrub
 * //   Arrow keys (stage focused) -> step one angle at a time
 * //
 * // All frames of a cut are mounted and stacked, with only the active one
 * // opaque, so scrubbing swaps an already-decoded image instead of fetching.
 * export default function CutViewer() {
 *   const [cut, setCut] = useState(0);
 *   const [frame, setFrame] = useState(0);
 *   const [touched, setTouched] = useState(false);
 *
 *   const stageRef = useRef<HTMLDivElement>(null);
 *   const drag = useRef<{ x: number; frame: number } | null>(null);
 *   const wheelAcc = useRef(0);
 *
 *   const service = SERVICES[cut];
 *   const frameCount = service.frames.length;
 *
 *   // Warm the browser cache for the neighbouring cuts so arrowing across is
 *   // instant, not a flash of empty stage.
 *   useEffect(() => {
 *     const neighbours = [-1, 0, 1].map(
 *       (o) => SERVICES[wrap(cut + o, SERVICES.length)]
 *     );
 *     neighbours.forEach((s) =>
 *       s.frames.forEach((src) => {
 *         const img = new window.Image();
 *         img.src = src;
 *       })
 *     );
 *   }, [cut]);
 *
 *   const goCut = useCallback((dir: number) => {
 *     setCut((c) => wrap(c + dir, SERVICES.length));
 *     setFrame(0);
 *     setTouched(true);
 *   }, []);
 *
 *   const scrub = useCallback(
 *     (steps: number) => {
 *       if (!steps) return;
 *       setFrame((f) => wrap(f + steps, frameCount));
 *       setTouched(true);
 *     },
 *     [frameCount]
 *   );
 *
 *   // Trackpad / shift-wheel horizontal scrubbing. Non-passive so the gesture
 *   // can be claimed before the page reacts to it.
 *   useEffect(() => {
 *     const el = stageRef.current;
 *     if (!el) return;
 *
 *     const onWheel = (e: WheelEvent) => {
 *       const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
 *       if (!dx) return;
 *       e.preventDefault();
 *       wheelAcc.current += dx;
 *       const steps = Math.trunc(wheelAcc.current / WHEEL_STEP);
 *       if (steps) {
 *         wheelAcc.current -= steps * WHEEL_STEP;
 *         scrub(steps);
 *       }
 *     };
 *
 *     el.addEventListener("wheel", onWheel, { passive: false });
 *     return () => el.removeEventListener("wheel", onWheel);
 *   }, [scrub]);
 *
 *   const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
 *     if (e.pointerType === "mouse" && e.button !== 0) return;
 *     drag.current = { x: e.clientX, frame };
 *     e.currentTarget.setPointerCapture(e.pointerId);
 *   };
 *
 *   const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
 *     const d = drag.current;
 *     if (!d) return;
 *     const steps = Math.round((e.clientX - d.x) / DRAG_STEP);
 *     const next = wrap(d.frame - steps, frameCount);
 *     if (next !== frame) {
 *       setFrame(next);
 *       setTouched(true);
 *     }
 *   };
 *
 *   const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
 *     if (!drag.current) return;
 *     drag.current = null;
 *     if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
 *       e.currentTarget.releasePointerCapture(e.pointerId);
 *     }
 *   };
 *
 *   const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
 *     if (e.key === "ArrowLeft") {
 *       e.preventDefault();
 *       scrub(-1);
 *     } else if (e.key === "ArrowRight") {
 *       e.preventDefault();
 *       scrub(1);
 *     }
 *   };
 *
 *   return (
 *     <div className="viewer">
 *       <button
 *         type="button"
 *         className="arrow viewer__nav viewer__nav--prev"
 *         onClick={() => goCut(-1)}
 *         aria-label="Previous cut"
 *       >
 *         <span aria-hidden="true">&#8592;</span>
 *       </button>
 *
 *       <div
 *         className={`viewer__stage${drag.current ? " is-dragging" : ""}`}
 *         ref={stageRef}
 *         tabIndex={0}
 *         role="group"
 *         aria-label={`${service.title} — angle ${frame + 1} of ${frameCount}. Drag or use arrow keys to rotate.`}
 *         onPointerDown={onPointerDown}
 *         onPointerMove={onPointerMove}
 *         onPointerUp={endDrag}
 *         onPointerCancel={endDrag}
 *         onKeyDown={onKeyDown}
 *       >
 *         {service.frames.map((src, i) => (
 *           <img
 *             key={`${cut}-${i}`}
 *             src={src}
 *             alt={i === 0 ? service.title : ""}
 *             aria-hidden={i !== 0}
 *             className={i === frame ? "is-on" : ""}
 *             draggable={false}
 *           />
 *         ))}
 *
 *         <span className={`viewer__hint${touched ? " is-gone" : ""}`}>
 *           Drag to rotate
 *         </span>
 *       </div>
 *
 *       <button
 *         type="button"
 *         className="arrow viewer__nav viewer__nav--next"
 *         onClick={() => goCut(1)}
 *         aria-label="Next cut"
 *       >
 *         <span aria-hidden="true">&#8594;</span>
 *       </button>
 *
 *       <div className="viewer__ticks" aria-hidden="true">
 *         {service.frames.map((_, i) => (
 *           <span key={i} className={i === frame ? "is-on" : ""} />
 *         ))}
 *       </div>
 *
 *       <div className="viewer__meta">
 *         <span className="viewer__count">
 *           {String(cut + 1).padStart(2, "0")} /{" "}
 *           {String(SERVICES.length).padStart(2, "0")}
 *         </span>
 *         <h3 key={service.title}>{service.title}</h3>
 *         <span className="viewer__price">{service.price}</span>
 *       </div>
 *     </div>
 *   );
 * }
 */
