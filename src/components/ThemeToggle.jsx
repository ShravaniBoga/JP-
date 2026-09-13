import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggle, className = "" }) {
  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-bronze hover:text-bronze ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center"
      >
        {isLight ? <Sun size={16} /> : <Moon size={16} />}
      </motion.span>
    </button>
  );
}
