import { motion } from "framer-motion";

/**
 * Animated brand mark — a faceted, gem-like emblem built from the same
 * twin-tower motif as the Hero, set inside a slowly rotating diamond
 * frame. It breathes/rotates continuously at rest and speeds up subtly
 * on hover, so the mark reads as alive rather than a static logotype.
 */
export default function Logo({ size = 40, className = "" }) {
  return (
    <motion.div
      className={`relative flex-none ${className}`}
      style={{ width: size, height: size }}
      whileHover="hover"
      initial="rest"
    >
      {/* outer rotating diamond frame */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        variants={{
          hover: { transition: { duration: 6, ease: "linear", repeat: Infinity } },
        }}
      >
        <polygon
          points="50,4 96,50 50,96 4,50"
          fill="none"
          stroke="#C9A66B"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
        <polygon
          points="50,20 80,50 50,80 20,50"
          fill="none"
          stroke="#C9A66B"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
      </motion.svg>

      {/* inner counter-rotating twin towers */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        <motion.rect
          x="38"
          y="34"
          width="10"
          height="34"
          rx="1"
          fill="#C9A66B"
          variants={{
            rest: { opacity: 0.9 },
            hover: { opacity: 1, height: 38, y: 30 },
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.rect
          x="52"
          y="42"
          width="10"
          height="26"
          rx="1"
          fill="#E0C793"
          variants={{
            rest: { opacity: 0.85 },
            hover: { opacity: 1, height: 30, y: 38 },
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.svg>
    </motion.div>
  );
}
