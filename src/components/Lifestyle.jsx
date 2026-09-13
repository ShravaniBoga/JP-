import { useState } from "react";
import { motion } from "framer-motion";

const MOMENTS = [
  {
    title: "Mornings, unhurried",
    desc: "First light over Gandipet Lake from a private balcony, before the city wakes.",
    image:
      "https://images.unsplash.com/photo-1758565811176-ccd94357a844?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "An evening lap",
    desc: "The infinity edge catches the last of the sun while the towers cool into blue hour.",
    image:
      "https://images.unsplash.com/photo-1758448756167-88dc934c58e4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Coming home",
    desc: "A concierge who knows your name, and a lobby that never feels like a lobby.",
    image:
      "https://images.unsplash.com/photo-1758448721205-8465cebc26af?auto=format&fit=crop&w=1000&q=80",
  },
];

function MomentCard({ title, desc, image, index }) {
  const [broken, setBroken] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover="hover"
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-ivory/10"
    >
      {image && !broken ? (
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          onError={() => setBroken(true)}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
          initial="rest"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-soft to-ink" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-xl text-ivory">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ivory/65">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function Lifestyle() {
  return (
    <section id="lifestyle" className="bg-ink-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-sm tracking-wide2 text-bronze">Lifestyle</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-medium text-ivory md:text-5xl">
            A rhythm, not just a residence.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ivory/70">
            The Pinnacle is designed around how a day actually unfolds —
            quiet mornings, an easy commute, and evenings that feel like a
            small escape without ever leaving home.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {MOMENTS.map((m, i) => (
            <MomentCard key={m.title} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
