import { useState } from "react";
import { motion } from "framer-motion";

// Verified against Jayabheri's own project brochure for The Pinnacle
// (Kokapet) and third-party listing data — swap only if the developer
// updates these figures.
const LANDMARK_IMAGE =
  "https://images.unsplash.com/photo-1761937841713-6b43e3f50efa?auto=format&fit=crop&w=1400&q=80";
const LANDMARK_IMAGE_INSET =
  "https://images.unsplash.com/photo-1763909129689-0ef3655fc03c?auto=format&fit=crop&w=700&q=80";

const MILESTONES = [
  { year: "1987", label: "Jayabheri Group founded in Hyderabad" },
  { year: "2000s–2010s", label: "Landmark communities delivered across Gachibowli & Narsingi" },
  { year: "2023", label: "The Pinnacle launched — twin 55-storey towers in Kokapet" },
];

export default function Overview() {
  const [imgFailed, setImgFailed] = useState(false);
  const [insetFailed, setInsetFailed] = useState(false);

  return (
    <section id="overview" className="relative overflow-hidden bg-ink py-16 md:py-24">
      {/* ambient accent glow, replaces the oversized flat numeral with
          something that reads as atmosphere rather than a stray "03" */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-bronze/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* section marker — a slim numbered rule instead of a giant
            watermark digit */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4 md:mb-14"
        >
          <span className="font-display text-sm text-bronze">03</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span className="text-xs uppercase tracking-wide2 text-ivory/40">Overview</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* image column — main frame plus a smaller overlapping inset,
              with a stat card anchored at the corner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mb-16 md:col-span-5 md:mb-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ivory/10 bg-ink-light shadow-soft">
              {!imgFailed ? (
                <img
                  src={LANDMARK_IMAGE}
                  alt="A Jayabheri Group landmark tower"
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#2A3A4D] to-[#0F1720]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            {/* small inset image — landscaped grounds — overlapping the
                top-left corner of the main frame for depth */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute -left-6 -top-6 hidden h-28 w-36 overflow-hidden rounded-xl border-2 border-ink shadow-soft sm:block"
            >
              {!insetFailed ? (
                <img
                  src={LANDMARK_IMAGE_INSET}
                  alt="Landscaped grounds at The Pinnacle"
                  loading="lazy"
                  onError={() => setInsetFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#2A3D2E] to-[#0F1720]" />
              )}
            </motion.div>

            {/* floating stat card, overlapping the image's bottom edge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-8 left-6 right-6 rounded-2xl border border-bronze/25 bg-ink-light/95 p-6 shadow-soft backdrop-blur-sm md:-right-10 md:left-auto md:w-56"
            >
              <p className="font-display text-4xl text-bronze">35+</p>
              <p className="mt-1 text-sm text-ivory/60">
                Years shaping Hyderabad&rsquo;s skyline
              </p>
            </motion.div>
          </motion.div>

          {/* copy column */}
          <div className="flex flex-col gap-10 md:col-span-6 md:col-start-7">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="text-sm tracking-wide2 text-bronze"
              >
                A Jayabheri Group Landmark
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-balance font-display text-4xl font-medium leading-tight text-ivory md:text-5xl"
              >
                Three decades of building Hyderabad&rsquo;s skyline, distilled
                into one address.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-lg leading-relaxed text-ivory/75"
            >
              Jayabheri Group has spent over three decades shaping
              Hyderabad&rsquo;s most recognised addresses. The Pinnacle is its
              most ambitious residential landmark yet — two 55-storey towers
              set on 4.75 acres in Kokapet, with only 425 vaastu-compliant
              homes across both towers and a private elevator lobby for
              every residence.
            </motion.p>

            {/* vertical timeline instead of a second flat paragraph */}
            <div className="relative border-l border-ivory/10 pl-8">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={`relative ${i !== MILESTONES.length - 1 ? "pb-8" : ""}`}
                >
                  <span className="absolute -left-[2.28rem] top-1 h-3 w-3 rounded-full border-2 border-bronze bg-ink" />
                  <p className="font-display text-lg text-bronze">{m.year}</p>
                  <p className="mt-1 text-sm text-ivory/60">{m.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-ivory/10 pt-8 sm:grid-cols-3">
              {[
                ["3 km", "from Outer Ring Road"],
                ["10 km", "from Financial District"],
                ["4.75 ac", "landscaped grounds"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl text-bronze">{value}</p>
                  <p className="mt-1 text-sm text-ivory/55">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
