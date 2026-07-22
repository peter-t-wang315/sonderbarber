/**
 * Generates schematic turntable frames — one SVG per angle, per cut.
 *
 * These are placeholders that communicate the rotation idea: a stylised head
 * drawn at yaw angles from -90° (left profile) through 0° (front) to +90°
 * (right profile), with the silhouette, features and hair mass all following
 * the angle. Replace public/frames/* with real turntable photography when it
 * exists; the filenames and count are the only contract.
 *
 * Run: node scripts/gen-frames.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "frames");

const W = 800;
const H = 1000;
const FRAMES = 7;

// Head is an ellipsoid: half-width ear-to-ear, half-depth front-to-back.
const A = 150; // half width
const B = 190; // half depth
const RY = 210; // half height
const CX = W / 2;
const CY = 430;

const CUTS = [
  { slug: "signature-cut", top: 52, sides: 26, beard: 0, density: 1 },
  { slug: "skin-fade", top: 62, sides: 6, beard: 0, density: 1 },
  { slug: "beard-sculpt", top: 34, sides: 20, beard: 1, density: 1 },
  { slug: "cut-beard", top: 52, sides: 10, beard: 1, density: 1 },
  { slug: "head-shave", top: 6, sides: 3, beard: 0, density: 0.2 },
  { slug: "kids-chair", top: 40, sides: 30, beard: 0, density: 1 },
];

const rad = (deg) => (deg * Math.PI) / 180;
const r2 = (n) => Math.round(n * 100) / 100;

function frame(cut, index) {
  // -90 .. +90 across the frame count.
  const yaw = -90 + (180 / (FRAMES - 1)) * index;
  const t = rad(yaw);
  const sin = Math.sin(t);
  const cos = Math.cos(t);

  // Projected silhouette half-width of the ellipsoid at this yaw. A head is
  // deeper than it is wide, so the profile view is the widest.
  const half = Math.sqrt((A * cos) ** 2 + (B * sin) ** 2);

  // The face plane slides across the silhouette as the head turns.
  const faceShift = B * sin * 0.34;
  const fx = CX + faceShift;
  const facing = Math.max(0, cos); // 1 front-on, 0 in profile

  // Vertical landmarks.
  const hairline = CY - 96;
  const eyeY = CY + 4;
  const noseY = CY + 84;
  const mouthY = CY + 142;

  const label =
    yaw === 0
      ? "FRONT"
      : `${yaw < 0 ? "L" : "R"}${String(Math.abs(Math.round(yaw))).padStart(2, "0")}°`;

  // Near eye survives further into the turn than the far one.
  const nearEyeOpacity = r2(Math.pow(facing, 0.45));
  const farEyeOpacity = r2(Math.max(0, (facing - 0.34) / 0.66));
  const eyeSpread = r2(52 * Math.max(facing, 0.25));

  // Nose sits on the face plane; at full profile its tip breaks the
  // silhouette edge, which is what sells the turn.
  const protrude = (half - Math.abs(faceShift) + 10) * Math.abs(sin) * 0.84;
  const noseTipX = r2(fx + Math.sign(sin || 1) * protrude);
  const noseBaseX = r2(fx);

  // Ear rides toward the back of the skull and is hidden head-on.
  const earX = r2(CX - sin * half * 0.5);
  const earOpacity = r2(Math.min(1, Math.abs(sin) * 1.4));

  // The hairline slants as the head turns: it stays high over the brow and
  // drops toward the back of the skull, which is where hair actually sits.
  const dip = RY * 0.78 * Math.abs(sin) * (0.34 + cut.sides / 70);
  const yFront = r2(hairline);
  const yBack = r2(hairline + dip);
  const yLeft = sin > 0 ? yBack : yFront;
  const yRight = sin > 0 ? yFront : yBack;

  const hairRx = r2(half + cut.sides);
  const hairRy = r2(RY + cut.top);
  const hairCx = r2(CX - sin * 22); // hair mass trails the turn

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#191919"/>
      <stop offset="1" stop-color="#0d0d0d"/>
    </linearGradient>
    <radialGradient id="key" cx="0.5" cy="0.36" r="0.62">
      <stop offset="0" stop-color="#f3efe6" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#f3efe6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4f4a41"/>
      <stop offset="0.5" stop-color="#6f695c"/>
      <stop offset="1" stop-color="#413c34"/>
    </linearGradient>
    <clipPath id="skull">
      <ellipse cx="${r2(CX)}" cy="${CY}" rx="${r2(half)}" ry="${RY}"/>
    </clipPath>
    <clipPath id="above-hairline">
      <path d="M 0 0 H ${W} V ${yRight} Q ${r2(CX)} ${r2((yLeft + yRight) / 2 + 26)} 0 ${yLeft} Z"/>
    </clipPath>
    <clipPath id="jaw">
      <rect x="0" y="${r2(CY + 60)}" width="${W}" height="${H}"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#key)"/>

  <!-- shoulders -->
  <path d="M ${r2(CX - 330)} ${H} C ${r2(CX - 300)} ${r2(CY + 330)}, ${r2(CX - 150)} ${r2(CY + 268)}, ${CX} ${r2(CY + 268)} C ${r2(CX + 150)} ${r2(CY + 268)}, ${r2(CX + 300)} ${r2(CY + 330)}, ${r2(CX + 330)} ${H} Z" fill="#222120"/>
  <!-- neck -->
  <rect x="${r2(CX - 52 + faceShift * 0.2)}" y="${r2(CY + RY - 70)}" width="104" height="160" rx="46" fill="#37322c"/>

  <!-- skull -->
  <ellipse cx="${r2(CX)}" cy="${CY}" rx="${r2(half)}" ry="${RY}" fill="url(#skin)"/>

  <!-- the back of the head falls into shadow as it turns away -->
  <g clip-path="url(#skull)">
    <ellipse cx="${r2(CX - sin * half * 0.75)}" cy="${CY}" rx="${r2(half * 0.8)}" ry="${RY}" fill="#1d1b18" opacity="${r2(Math.abs(sin) * 0.5)}"/>
  </g>

  <!-- ear -->
  <g clip-path="url(#skull)">
    <ellipse cx="${earX}" cy="${r2(CY + 10)}" rx="17" ry="32" fill="#3f3a32" opacity="${earOpacity}"/>
  </g>

  <!-- brow line -->
  <path d="M ${r2(fx - eyeSpread - 26)} ${r2(eyeY - 30)} Q ${r2(fx)} ${r2(eyeY - 46)} ${r2(fx + eyeSpread + 26)} ${r2(eyeY - 30)}" stroke="#2e2b26" stroke-width="7" fill="none" stroke-linecap="round" opacity="${r2(facing * 0.8)}"/>

  <!-- eyes: near one is on the side the face is turning toward -->
  <ellipse cx="${r2(fx + Math.sign(sin || 1) * eyeSpread)}" cy="${eyeY}" rx="15" ry="8" fill="#191713" opacity="${nearEyeOpacity}"/>
  <ellipse cx="${r2(fx - Math.sign(sin || 1) * eyeSpread)}" cy="${eyeY}" rx="15" ry="8" fill="#191713" opacity="${farEyeOpacity}"/>

  <!-- nose: a wedge off the face plane, tip leading the turn -->
  <path d="M ${noseBaseX} ${r2(noseY - 76)} L ${noseTipX} ${r2(noseY - 8)} L ${noseBaseX} ${r2(noseY + 4)} Z" fill="#807869" opacity="0.95"/>
  <ellipse cx="${r2(fx + sin * 14)}" cy="${r2(noseY - 2)}" rx="${r2(14 + 5 * Math.abs(sin))}" ry="10" fill="#807869" opacity="0.9"/>

  <!-- mouth -->
  <path d="M ${r2(fx - 30 + sin * 10)} ${mouthY} Q ${r2(fx + sin * 18)} ${r2(mouthY + 10)} ${r2(fx + 30 + sin * 10)} ${mouthY}" stroke="#2b2823" stroke-width="6" fill="none" stroke-linecap="round" opacity="${r2(Math.max(0.15, facing))}"/>

  <!-- beard -->
  ${
    cut.beard
      ? `<g clip-path="url(#skull)"><g clip-path="url(#jaw)"><ellipse cx="${r2(fx * 0.5 + CX * 0.5)}" cy="${r2(CY + 150)}" rx="${r2(half * 0.98)}" ry="130" fill="#ded8cc" opacity="0.92"/></g></g>`
      : ""
  }

  <!-- hair mass sits over the skull and trails the turn -->
  <g clip-path="url(#above-hairline)">
    <ellipse cx="${hairCx}" cy="${r2(CY - cut.top * 0.3)}" rx="${hairRx}" ry="${hairRy}" fill="#ece7dc" opacity="${cut.density}"/>
  </g>

  <!-- angle readout -->
  <text x="56" y="${H - 56}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#f3efe6" fill-opacity="0.62">${label}</text>
  <text x="${W - 56}" y="${H - 56}" text-anchor="end" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#f3efe6" fill-opacity="0.35">${String(index + 1).padStart(2, "0")}/${String(FRAMES).padStart(2, "0")}</text>
</svg>
`;
}

let count = 0;
for (const cut of CUTS) {
  const dir = join(OUT, cut.slug);
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < FRAMES; i++) {
    writeFileSync(join(dir, `${i + 1}.svg`), frame(cut, i));
    count++;
  }
}
console.log(`wrote ${count} frames for ${CUTS.length} cuts`);
