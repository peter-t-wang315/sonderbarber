// Central place for site-wide constants.
// Swap BOOKING_URL for the real Setmore booking page when it's ready.
export const BOOKING_URL = "https://sonderbarbers.setmore.com/";

export const SITE = {
  name: "SONDER",
  tagline: "Own Lane Own Pace",
  address: "725 South Grand Ave.",
  location: "Pullman, WA",
  email: "sonderbarbers@gmail.com",
  instagram: "https://www.instagram.com/sonderbarbers/",
  // Opening hours, one entry per day-range. Rendered in the home Visit
  // section and the footer.
  hours: [
    { days: "Mon – Fri", time: "8am – 6pm" },
    { days: "Sat", time: "8am – 4pm" },
  ],
};

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
];

// Service menu, shown in the cut viewer on the home page.
//
// ─── TEMPORARY: STATIC PHOTOS (changed 2026-07-26) ──────────────────────────
// We don't have panoramic / turntable photography yet — only a single static
// photo per cut, dropped into public/haircuts/. So each Service is now just a
// { title, image } pair and CutViewer shows one photo + its name (no rotation,
// no price). See components/CutViewer.tsx for the matching static viewer.
//
// WHEN THE PANORAMIC CUTS ARRIVE: restore the frames-based version preserved
// in the commented block directly below (FRAME_COUNT + frames() helper +
// the { title, price, frames } SERVICES array), and swap CutViewer back to the
// turntable implementation preserved at the bottom of that file.
export type Service = { title: string; image: string };

export const SERVICES: Service[] = [
  { title: "Blowout Taper", image: "/haircuts/blowout-taper.jpeg" },
  { title: "Burst Fade", image: "/haircuts/burst-fade.jpeg" },
  { title: "Mullet", image: "/haircuts/mullet.jpeg" },
  { title: "Skin Fade", image: "/haircuts/skin-fade.jpeg" },
  { title: "Taper Fade", image: "/haircuts/taper-fade.jpeg" },
];

// ─── ORIGINAL TURNTABLE DATA — restore when panoramic frames are available ──
//
// `frames` is an ordered rotation: one image per angle, left profile (-90°)
// through front (0°) to right profile (+90°). The files under public/frames
// are generated placeholders — run `node scripts/gen-frames.mjs` to rebuild
// them. Replace a cut's folder with real turntable photography of the SAME
// head (same subject, same lighting, camera stepped around it) and the scrub
// becomes a true rotation. Frame count is read from the array, so shooting 12
// angles instead of 7 needs no code change.
//
// const FRAME_COUNT = 7;
//
// const frames = (slug: string) =>
//   Array.from({ length: FRAME_COUNT }, (_, i) => `/frames/${slug}/${i + 1}.svg`);
//
// export type Service = { title: string; price: string; frames: string[] };
//
// export const SERVICES: Service[] = [
//   { title: "Signature Cut", price: "$55", frames: frames("signature-cut") },
//   { title: "Skin Fade", price: "$60", frames: frames("skin-fade") },
//   { title: "Beard Sculpt", price: "$35", frames: frames("beard-sculpt") },
//   { title: "Cut & Beard", price: "$80", frames: frames("cut-beard") },
//   { title: "Head Shave", price: "$45", frames: frames("head-shave") },
//   { title: "The Kids' Chair", price: "$30", frames: frames("kids-chair") },
// ];

// Filler barber roster for the About page.
export type Barber = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const BARBERS: Barber[] = [
  {
    name: "Dre Alvarez",
    role: "Founder",
    bio: "Fifteen years behind the chair and a fade that could cut glass. Marcus opened SONDER to build the room he always wanted to work in — quiet lights, loud confidence, and zero rushed cuts.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
  },
  // {
  //   name: "Dro Sanchez",
  //   role: "Senior Barber · Texture & Curls",
  //   bio: "Dro treats every head like a sculpture. Specialising in textured crops, curly tapers, and the kind of line-up you check three times in the mirror on the way out.",
  //   image:
  //     "https://images.unsplash.com/photo-1521490878406-4864b3f70a8c?auto=format&fit=crop&w=900&q=80",
  // },
  // {
  //   name: "Theo Kane",
  //   role: "Barber · Classic & Beard",
  //   bio: "Old-school scissor work meets new-wave detailing. Theo lives for a clean beard sculpt and a timeless side part — hot towel included, always.",
  //   image:
  //     "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80",
  // },
];
