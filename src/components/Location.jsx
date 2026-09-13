import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const MAP_QUERY = "Puppalguda, Kokapet, Hyderabad, Telangana";

const LOCATION_IMAGE =
  "https://images.unsplash.com/photo-1761935554215-e6dc9940550d?auto=format&fit=crop&w=1400&q=80";

const POINTS = [
  { label: "Outer Ring Road", distance: "3 km", ring: 1 },
  { label: "Financial District", distance: "10 km", ring: 2 },
  { label: "HITEC City", distance: "12 km", ring: 3 },
  { label: "Gandipet Lake", distance: "Adjacent", ring: 1.4 },
];

const ringRadii = [70, 110, 150];

export default function Location() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="location" className="bg-ink py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="text-sm tracking-wide2 text-bronze">Location</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-medium text-ivory md:text-5xl">
            Kokapet&rsquo;s western edge, minutes from everywhere that matters.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ivory/70">
            Set in Puppalguda on Hyderabad&rsquo;s fast-growing western
            corridor, The Pinnacle sits close to the Outer Ring Road with
            direct reach to the Financial District and HITEC City — and
            unobstructed views over Gandipet Lake to the west.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li
                key={p.label}
                className="flex items-center justify-between border-b border-ivory/10 pb-3"
              >
                <span className="text-sm text-ivory/70">{p.label}</span>
                <span className="font-display text-base text-bronze">
                  {p.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* animated map — a slow Ken Burns pan/zoom on a real aerial night
            shot, with the existing radial distance diagram layered on top
            so it stays informative as well as attention-grabbing */}
        <div className="flex items-center justify-center md:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-md overflow-hidden rounded-full border border-bronze/20 shadow-soft"
          >
            {imgOk ? (
              <img
                src={LOCATION_IMAGE}
                alt="Aerial night view of a city, illustrating the surrounding urban corridor"
                loading="lazy"
                onError={() => setImgOk(false)}
                className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-60"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-ink-soft to-ink" />
            )}
            <div className="absolute inset-0 bg-ink/45" />

            <svg viewBox="0 0 340 340" className="absolute inset-0 h-full w-full">
              {ringRadii.map((r, i) => (
                <motion.circle
                  key={r}
                  cx="170"
                  cy="170"
                  r={r}
                  fill="none"
                  stroke="#C9A66B"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  style={{ transformOrigin: "170px 170px" }}
                />
              ))}

              {/* pulsing centre — the tower */}
              <motion.circle
                cx="170"
                cy="170"
                r="7"
                fill="#C9A66B"
                animate={{ scale: [1, 1.4, 1], opacity: [0.9, 0.3, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                style={{ transformOrigin: "170px 170px" }}
              />
              <circle cx="170" cy="170" r="4" fill="#F5F1E8" />

              {/* orbiting points */}
              {[
                { angle: -40, r: 70, label: "ORR" },
                { angle: 30, r: 110, label: "Fin. District" },
                { angle: 150, r: 150, label: "HITEC City" },
                { angle: -150, r: 90, label: "Gandipet Lake" },
              ].map((p) => {
                const rad = (p.angle * Math.PI) / 180;
                const x = 170 + p.r * Math.cos(rad);
                const y = 170 + p.r * Math.sin(rad);
                return (
                  <g key={p.label}>
                    <circle cx={x} cy={y} r="3.5" fill="#F5F1E8" fillOpacity="0.85" />
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#F5F1E8"
                      fillOpacity="0.7"
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>

      {/* real, interactive map — sits below the atmospheric radial
          diagram so visitors can still check the actual commute
          themselves, not just admire the illustration */}
      <div className="mx-auto mt-10 max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-ivory/10 shadow-soft"
        >
          <iframe
            title="Map showing The Pinnacle's location in Puppalguda, Kokapet, Hyderabad"
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
            className="h-72 w-full md:h-96"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-bronze hover:underline"
        >
          Get Directions
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
