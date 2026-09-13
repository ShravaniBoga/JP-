import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const STATS = [
  { value: 55, suffix: "", label: "Storeys per tower" },
  { value: 2, suffix: "", label: "Iconic towers" },
  { value: 425, suffix: "", label: "Sky residences" },
  { value: 4.75, suffix: " ac", label: "Landscaped grounds", decimals: 2 },
];

function CountUp({ value, suffix = "", decimals = 0, start }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!start) return;
    const controls = animate(mv, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [start, value, mv]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="border-y border-bronze/15 bg-ink-light bg-gradient-to-b from-ink to-ink-light py-10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <p className="font-display text-4xl text-bronze md:text-5xl">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals || 0}
                start={inView}
              />
            </p>
            <p className="mt-2 text-sm text-ivory/55">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
