import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CONFIGS = {
  "3.5 BHK": {
    area: "2,692 sq.ft.",
    beds: "3 Bedrooms + Study",
    baths: "4 Bathrooms",
    outdoor: "2 Balconies",
    rooms: [
      { label: "Living / Dining", x: 10, y: 10, w: 46, h: 40 },
      { label: "Master Bed", x: 60, y: 10, w: 30, h: 26 },
      { label: "Kitchen", x: 10, y: 54, w: 22, h: 22 },
      { label: "Bed 2", x: 36, y: 54, w: 22, h: 22 },
      { label: "Bed 3", x: 60, y: 40, w: 30, h: 20 },
      { label: "Study", x: 60, y: 63, w: 30, h: 13 },
    ],
  },
  "4.5 BHK": {
    area: "4,622 sq.ft.",
    beds: "4 Bedrooms + Study",
    baths: "5 Bathrooms",
    outdoor: "3 Balconies + Private Deck",
    rooms: [
      { label: "Living / Dining", x: 8, y: 8, w: 44, h: 34 },
      { label: "Master Bed", x: 56, y: 8, w: 34, h: 24 },
      { label: "Kitchen", x: 8, y: 46, w: 20, h: 20 },
      { label: "Bed 2", x: 32, y: 46, w: 20, h: 20 },
      { label: "Bed 3", x: 56, y: 36, w: 34, h: 18 },
      { label: "Bed 4", x: 8, y: 70, w: 24, h: 20 },
      { label: "Study", x: 56, y: 58, w: 16, h: 16 },
      { label: "Private Deck", x: 74, y: 58, w: 16, h: 32 },
    ],
  },
};

const FLOOR_BAND = {
  "3.5 BHK": { from: 0.55, to: 0.78, note: "Mid-rise · floors 22–38" },
  "4.5 BHK": { from: 0.06, to: 0.3, note: "Sky floors · 40–55" },
};

function FloorIndicator({ active }) {
  const band = FLOOR_BAND[active];
  const floors = 22;
  return (
    <div className="hidden flex-col items-center gap-3 md:flex">
      <svg viewBox="0 0 40 220" className="h-56 w-8" fill="none">
        <rect x="8" y="4" width="24" height="212" rx="2" stroke="#F5F1E8" strokeOpacity="0.15" strokeWidth="1" />
        {Array.from({ length: floors }).map((_, i) => (
          <line
            key={i}
            x1="8"
            x2="32"
            y1={4 + (i * 212) / floors}
            y2={4 + (i * 212) / floors}
            stroke="#F5F1E8"
            strokeOpacity="0.08"
          />
        ))}
        <motion.rect
          x="8"
          width="24"
          rx="1.5"
          fill="#C9A66B"
          fillOpacity="0.35"
          animate={{
            y: 4 + band.from * 212,
            height: (band.to - band.from) * 212,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.rect
          x="8"
          width="24"
          rx="1.5"
          fill="none"
          stroke="#C9A66B"
          strokeWidth="1"
          animate={{
            y: 4 + band.from * 212,
            height: (band.to - band.from) * 212,
            opacity: [0.9, 0.4, 0.9],
          }}
          transition={{
            y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </svg>
      <p className="max-w-[6rem] text-center text-[11px] leading-snug text-ivory/45">
        {band.note}
      </p>
    </div>
  );
}

export default function Residences() {
  const [active, setActive] = useState("3.5 BHK");
  const config = CONFIGS[active];

  return (
    <section id="residences" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm tracking-wide2 text-bronze">Residences</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-ivory md:text-5xl">
              Two configurations. One standard of light.
            </h2>
          </div>

          <div className="flex gap-2 rounded-full border border-ivory/15 p-1">
            {Object.keys(CONFIGS).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative rounded-full px-5 py-2.5 text-sm transition-colors ${
                  active === key ? "text-onaccent" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {active === key && (
                  <motion.span
                    layoutId="config-pill"
                    className="absolute inset-0 rounded-full bg-bronze"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{key}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          {/* schematic floor plan + animated floor position indicator */}
          <div className="md:col-span-7">
            <div className="flex gap-6">
              <div className="relative flex-1 rounded-2xl border border-ivory/10 bg-ink-light p-6 shadow-soft">
                <AnimatePresence mode="wait">
                  <motion.svg
                    key={active}
                    viewBox="0 0 100 100"
                    className="h-auto w-full"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                  {config.rooms.map((r, i) => (
                    <motion.g
                      key={r.label}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: `${r.x + r.w / 2}% ${r.y + r.h / 2}%` }}
                    >
                      <rect
                        x={r.x}
                        y={r.y}
                        width={r.w}
                        height={r.h}
                        fill="none"
                        stroke="#C9A66B"
                        strokeOpacity="0.55"
                        strokeWidth="0.4"
                      />
                      <text
                        x={r.x + r.w / 2}
                        y={r.y + r.h / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="2.6"
                        fill="#F5F1E8"
                        fillOpacity="0.65"
                      >
                        {r.label}
                      </text>
                    </motion.g>
                  ))}
                  </motion.svg>
                </AnimatePresence>
              </div>
              <FloorIndicator active={active} />
            </div>
            <p className="mt-3 text-xs text-ivory/40">
              Indicative layout — not to scale. Final plans available on request.
            </p>
          </div>

          {/* specs */}
          <div className="md:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {[
                  ["Super built-up area", config.area],
                  ["Configuration", config.beds],
                  ["Bathrooms", config.baths],
                  ["Outdoor space", config.outdoor],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between border-b border-ivory/10 pb-4"
                  >
                    <span className="text-sm text-ivory/55">{label}</span>
                    <span className="font-display text-lg text-ivory">
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <a
              href="#enquire"
              className="mt-10 inline-block rounded-full bg-bronze px-7 py-3.5 text-sm font-medium text-onaccent transition-transform hover:scale-[1.03]"
            >
              Request Full Floor Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
