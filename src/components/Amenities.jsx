import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import {
  Waves,
  Building2,
  Dumbbell,
  Trees,
  Footprints,
  Baby,
  BellRing,
  Clapperboard,
} from "lucide-react";

/**
 * Placeholder photography illustrating the type of space each amenity
 * offers — replace with the developer's own photography before launch.
 * Each card also has a soft gradient fallback (matching the Gallery
 * section's placeholder treatment) that shows instantly and stays visible
 * behind the photo, so a slow or blocked image never leaves an empty card.
 */
const AMENITIES = [
  {
    icon: Waves,
    title: "Infinity Pool",
    desc: "An edgeless deck overlooking the Kokapet skyline, lit for evening swims.",
    image: "https://images.unsplash.com/photo-1758448756167-88dc934c58e4?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#243447] to-[#0F1720]",
  },
  {
    icon: Building2,
    title: "Sky Lounge",
    desc: "A private upper-floor lounge for residents, framed by panoramic glazing.",
    image: "https://images.unsplash.com/photo-1733457231625-1ecc48767a14?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#2E2A3D] to-[#0F1720]",
  },
  {
    icon: Dumbbell,
    title: "Clubhouse & Spa",
    desc: "Full gymnasium, spa treatment rooms, and dedicated yoga & meditation decks.",
    image: "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#3D3220] to-[#161F2B]",
  },
  {
    icon: Clapperboard,
    title: "Mini Theatre",
    desc: "A private screening room reserved for residents and their guests.",
    image: "https://images.unsplash.com/photo-1717915604557-94283edbcc1b?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#2A3A4D] to-[#0F1720]",
  },
  {
    icon: Trees,
    title: "Zen Gardens",
    desc: "Dense, tropical landscaping across sunken seating decks and walking paths.",
    image: "https://images.unsplash.com/photo-1761092409160-590d57eb0aaf?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#3A4A3E] to-[#161F2B]",
  },
  {
    icon: Footprints,
    title: "Jogging Track",
    desc: "A vehicle-free perimeter track threading through the landscaped grounds.",
    image: "https://images.unsplash.com/photo-1711605159499-cca2cbdde081?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#243447] to-[#161F2B]",
  },
  {
    icon: Baby,
    title: "Kids' Play Deck",
    desc: "A separate, supervised play area shielded from vehicular movement.",
    image: "https://images.unsplash.com/photo-1763561553595-a60112a2977e?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#33291C] to-[#161F2B]",
  },
  {
    icon: BellRing,
    title: "Concierge Service",
    desc: "Front-desk concierge and dedicated resident support, around the clock.",
    image: "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?auto=format&fit=crop&w=900&q=80",
    gradient: "from-[#2A3A4D] to-[#161F2B]",
  },
];

function AmenityCard({ icon: Icon, title, desc, image, gradient }) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className={`group relative h-[380px] w-[260px] flex-none select-none snap-start overflow-hidden rounded-2xl border border-ivory/10 bg-gradient-to-br sm:h-[420px] sm:w-[280px] md:w-[320px] ${gradient}`}
    >
      {!failed && (
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-ink/30"
      />

      <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-bronze/50 bg-ink/60 backdrop-blur-sm">
        <Icon className="text-bronze" size={20} strokeWidth={1.5} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-xl text-ivory">{title}</h3>
        <motion.p
          variants={{
            rest: { opacity: 0, height: 0, marginTop: 0 },
            hover: { opacity: 1, height: "auto", marginTop: 8 },
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden text-sm leading-relaxed text-ivory/70"
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Amenities() {
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });

  // Duplicate the set once so the ping-pong drift has enough width to
  // travel across before reversing, without ever showing a seam.
  const loop = [...AMENITIES, ...AMENITIES];

  // Measure the scrollable range so manual dragging can go the full
  // width of the track, not just the auto-drift's shorter distance.
  useEffect(() => {
    function measure() {
      if (!containerRef.current || !trackRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      setBounds({ left: -(trackWidth - containerWidth), right: 0 });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The automatic left-right drift — pauses on hover/touch/drag, exactly
  // as before, just driven by a motion value so it can share the same
  // transform as manual dragging.
  useEffect(() => {
    if (paused || dragging || !trackRef.current) {
      animationRef.current?.stop();
      return;
    }
    const trackWidth = trackRef.current.scrollWidth;
    const distance = -trackWidth * 0.38;
    let cancelled = false;

    async function drift() {
      while (!cancelled) {
        animationRef.current = animate(x, distance, { duration: 17, ease: "easeInOut" });
        await animationRef.current;
        if (cancelled) break;
        animationRef.current = animate(x, 0, { duration: 17, ease: "easeInOut" });
        await animationRef.current;
      }
    }
    drift();

    return () => {
      cancelled = true;
      animationRef.current?.stop();
    };
  }, [paused, dragging, x]);

  return (
    <section id="amenities" className="overflow-hidden bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div>
          <p className="text-sm tracking-wide2 text-bronze">Amenities</p>
          <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-medium text-ivory md:text-5xl">
            A resort, folded into everyday life.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ivory/45">
            Drifts left to right on its own — or drag the row yourself to browse at your own pace.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="hide-scrollbar mt-10 cursor-grab overflow-x-hidden active:cursor-grabbing"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
      >
        <motion.div
          ref={trackRef}
          className="flex w-max gap-5 px-6 md:px-10"
          style={{ x }}
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.06}
          dragMomentum={true}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setTimeout(() => setDragging(false), 500)}
        >
          {loop.map((a, i) => (
            <AmenityCard key={`${a.title}-${i}`} {...a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
