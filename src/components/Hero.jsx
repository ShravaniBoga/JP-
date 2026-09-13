import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useBrochureModal } from "../context/BrochureModalContext.jsx";

// Window grid generator for a tower — small rects that "light up"
// after the tower outline finishes drawing. `dim` scales the whole
// thing down (fewer rows, softer glow) so it reads as a distant
// building rather than competing with the two hero towers.
function TowerWindows({
  x,
  y,
  width,
  height,
  delayBase,
  cols = 4,
  gap = 18,
  dim = false,
}) {
  const rows = Math.floor(height / gap);
  const windows = [];
  const maxOpacity = dim ? 0.4 : 0.85;
  const restOpacity = dim ? 0.22 : 0.5;
  const skip = dim ? 2 : 3; // sparser lighting for background buildings
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + 6 + c * ((width - 12) / cols);
      const wy = y + 10 + r * gap;
      // sparse, irregular lighting — not every window, feels organic
      if ((r + c) % skip === 0) continue;
      windows.push(
        <motion.rect
          key={`${r}-${c}`}
          x={wx}
          y={wy}
          width={(width - 12) / cols - 4}
          height={gap < 14 ? 3 : 8}
          rx={1}
          fill="#C9A66B"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, maxOpacity, restOpacity] }}
          transition={{
            delay: delayBase + Math.random() * 1.4,
            duration: 2.2,
            times: [0, 0.4, 1],
          }}
        />,
      );
    }
  }
  return <>{windows}</>;
}

// A smaller background building silhouette — outline draw-on plus its
// own dim, sparse window-lighting pass, so the whole skyline feels
// alive rather than just the two hero towers.
function BackgroundTower({
  x,
  y,
  width,
  height,
  delay,
  opacity = 0.35,
  cols = 2,
}) {
  return (
    <>
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="#8FA0B0"
        strokeOpacity={opacity}
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay, ease: "easeInOut" }}
      />
      <TowerWindows
        x={x}
        y={y}
        width={width}
        height={height}
        cols={cols}
        gap={22}
        delayBase={delay + 1.4}
        dim
      />
    </>
  );
}

export default function Hero() {
  const { open: openBrochure } = useBrochureModal();
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {/* atmospheric sky gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-soft via-ink to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />

      {/* skyline — confined to the right half of the section so it never
          collides with the copy block, which lives on the left */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] items-end justify-center opacity-90 md:flex lg:w-1/2">
        <motion.svg
          viewBox="0 0 520 420"
          className="h-[68vh] w-auto max-w-none"
          fill="none"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          {/* distant skyline filler, built up behind the two hero towers */}
          <BackgroundTower
            x={20}
            y={210}
            width={34}
            height={210}
            delay={0.1}
            opacity={0.22}
          />
          <BackgroundTower
            x={62}
            y={170}
            width={30}
            height={250}
            delay={0.2}
            opacity={0.28}
          />
          <BackgroundTower
            x={340}
            y={190}
            width={32}
            height={230}
            delay={0.5}
            opacity={0.28}
          />
          <BackgroundTower
            x={380}
            y={230}
            width={26}
            height={190}
            delay={0.6}
            opacity={0.22}
          />
          <BackgroundTower
            x={430}
            y={150}
            width={36}
            height={270}
            delay={0.7}
            opacity={0.3}
          />
          <BackgroundTower
            x={476}
            y={250}
            width={24}
            height={170}
            delay={0.8}
            opacity={0.2}
          />

          {/* Tower A (taller, hero) */}
          <motion.rect
            x="230"
            y="40"
            width="60"
            height="380"
            stroke="#E0C793"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
          <TowerWindows
            x={230}
            y={40}
            width={60}
            height={380}
            delayBase={1.6}
          />

          {/* Tower B (shorter, offset, hero) */}
          <motion.rect
            x="150"
            y="110"
            width="52"
            height="310"
            stroke="#E0C793"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
          />
          <TowerWindows
            x={150}
            y={110}
            width={52}
            height={310}
            delayBase={1.9}
          />

          {/* ground line */}
          <motion.line
            x1="10"
            y1="420"
            x2="510"
            y2="420"
            stroke="#C9A66B"
            strokeWidth="1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            style={{ transformOrigin: "50% 50%" }}
          />
        </motion.svg>
      </div>

      {/* copy — anchored to the left column, capped so it never runs under
          the skyline on wide screens */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pb-20">
        <div className="max-w-xl md:max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 text-sm tracking-wide2 text-bronze">
            Kokapet–Puppalguda, Hyderabad
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-balance font-display text-5xl font-medium leading-[1.08] text-ivory md:text-7xl">
            Home, elevated above the skyline.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-balance text-base leading-relaxed text-ivory/70 md:text-lg">
            Two towers, fifty-five storeys each, rising above Hyderabad&rsquo;s
            western skyline — where private elevators, Gandipet Lake views, and
            a resort-scale clubhouse meet everyday life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#enquire"
              className="rounded-full bg-bronze px-7 py-3.5 text-sm font-medium text-onaccent transition-transform hover:scale-[1.03]">
              Book a Site Visit
            </a>
            <a
              href="#residences"
              className="rounded-full border border-ivory/25 px-7 py-3.5 text-sm text-ivory transition-colors hover:border-bronze hover:text-bronze">
              Explore Residences
            </a>
            <button
              type="button"
              onClick={openBrochure}
              className="inline-flex items-center gap-2 px-2 py-3.5 text-sm text-ivory/70 transition-colors hover:text-bronze">
              <Download size={16} />
              Download Brochure
            </button>
          </motion.div>
        </div>
      </div>

      {/* compact skyline for small screens — sits low, behind the copy,
          faded so it never fights for attention with the text above it */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center opacity-30 md:hidden">
        <svg
          viewBox="0 0 400 200"
          className="h-[26vh] w-auto max-w-none"
          fill="none">
          <rect
            x="120"
            y="10"
            width="60"
            height="190"
            stroke="#E0C793"
            strokeWidth="1.5"
          />
          <TowerWindows
            x={120}
            y={10}
            width={60}
            height={190}
            cols={3}
            gap={16}
            delayBase={0.6}
          />
          <rect
            x="210"
            y="50"
            width="52"
            height="150"
            stroke="#E0C793"
            strokeWidth="1.5"
          />
          <TowerWindows
            x={210}
            y={50}
            width={52}
            height={150}
            cols={3}
            gap={16}
            delayBase={0.9}
          />
          <rect
            x="70"
            y="90"
            width="30"
            height="110"
            stroke="#8FA0B0"
            strokeWidth="1"
          />
          <TowerWindows
            x={70}
            y={90}
            width={30}
            height={110}
            cols={2}
            gap={20}
            delayBase={1.1}
            dim
          />
          <rect
            x="280"
            y="80"
            width="28"
            height="120"
            stroke="#8FA0B0"
            strokeWidth="1"
          />
          <TowerWindows
            x={280}
            y={80}
            width={28}
            height={120}
            cols={2}
            gap={20}
            delayBase={1.3}
            dim
          />
        </svg>
      </div>

      {/* scroll cue — a slim illuminated track with a bead of light
          traveling down it, echoing the elevator/light-well motif
          instead of a plain bouncing arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/50 md:flex">
        <div className="relative h-11 w-px overflow-hidden bg-ivory/15">
          <motion.span
            className="absolute left-1/2 top-0 h-3 w-[3px] -translate-x-1/2 rounded-full bg-bronze shadow-[0_0_6px_1px_rgba(201,166,107,0.8)]"
            animate={{ y: [-4, 44], opacity: [0, 1, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
              times: [0, 0.15, 0.85, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
