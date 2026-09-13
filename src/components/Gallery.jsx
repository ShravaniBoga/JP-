import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Placeholder photography illustrating the type of space for each
 * category — replace with the developer's own photography before launch.
 */
const TILES = [
  {
    label: "Twin Tower Façade",
    image:
      "https://images.unsplash.com/photo-1742071276778-ffee25185ed9?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#2A3A4D] to-[#0F1720]",
  },
  {
    label: "Grand Entrance Water Feature",
    image:
      "https://images.unsplash.com/photo-1765782591116-8f89d767a94a?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#3A4A3E] to-[#161F2B]",
  },
  {
    label: "Rooftop Infinity Pool Deck",
    image:
      "https://images.unsplash.com/photo-1765741836851-8071475d4911?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#243447] to-[#0F1720]",
  },
  {
    label: "Clubhouse Lobby",
    image:
      "https://images.unsplash.com/photo-1758448721205-8465cebc26af?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#3D3220] to-[#161F2B]",
  },
  {
    label: "Landscaped Grounds",
    image:
      "https://images.unsplash.com/photo-1763909129689-0ef3655fc03c?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#2A3D2E] to-[#0F1720]",
  },
  {
    label: "Fitness Studio",
    image:
      "https://images.unsplash.com/photo-1775993167276-743bbcde77e1?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#33291C] to-[#161F2B]",
  },
  {
    label: "Sky Lounge, Level 50",
    image:
      "https://images.unsplash.com/photo-1733457231625-1ecc48767a14?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#2E2A3D] to-[#0F1720]",
  },
  {
    label: "Sample 4.5 BHK Living Room",
    image:
      "https://images.unsplash.com/photo-1758565811176-ccd94357a844?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#33291C] to-[#161F2B]",
  },
  {
    label: "Poolside Cabana Deck",
    image:
      "https://images.unsplash.com/photo-1758448756167-88dc934c58e4?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#243447] to-[#0F1720]",
  },
];

const PAGE_SIZE = 3;

function GalleryTile({ label, image, gradient }) {
  const [broken, setBroken] = useState(false);
  const showImage = image && !broken;

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className={`group relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}
    >
      {showImage ? (
        <motion.img
          src={image}
          alt={label}
          loading="lazy"
          onError={() => setBroken(true)}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          {/* subtle diagonal texture standing in for photography */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #F5F1E8 0px, #F5F1E8 1px, transparent 1px, transparent 14px)",
            }}
          />
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          />
        </>
      )}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-5">
        <span className="text-sm text-ivory/80">{label}</span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < TILES.length; i += PAGE_SIZE) {
      chunks.push(TILES.slice(i, i + PAGE_SIZE));
    }
    return chunks;
  }, []);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalPages = pages.length;

  const goTo = (next) => {
    setDirection(next > page || (page === totalPages - 1 && next === 0) ? 1 : -1);
    setPage(((next % totalPages) + totalPages) % totalPages);
  };

  const handlePrev = () => goTo(page - 1 < 0 ? totalPages - 1 : page - 1);
  const handleNext = () => goTo(page + 1 >= totalPages ? 0 : page + 1);

  return (
    <section id="gallery" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm tracking-wide2 text-bronze">Gallery</p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-medium text-ivory md:text-5xl">
              A closer look, floor by floor.
            </h2>
          </div>

          {/* page indicator dots */}
          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to gallery slide ${i + 1}`}
                className="group/dot p-1.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === page ? "w-6 bg-bronze" : "w-1.5 bg-ivory/25 group-hover/dot:bg-ivory/45"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* carousel: arrows on both sides, three tiles sliding in as a
            group each time */}
        <div className="relative mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous gallery slide"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ivory/15 bg-ink-light/90 p-2.5 text-ivory/70 shadow-soft backdrop-blur-sm transition-all hover:scale-105 hover:border-bronze hover:text-bronze md:-left-5 md:p-3"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={page}
                custom={direction}
                initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
              >
                {pages[page].map((t) => (
                  <GalleryTile key={t.label} {...t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next gallery slide"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ivory/15 bg-ink-light/90 p-2.5 text-ivory/70 shadow-soft backdrop-blur-sm transition-all hover:scale-105 hover:border-bronze hover:text-bronze md:-right-5 md:p-3"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
