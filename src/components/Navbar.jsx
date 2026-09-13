import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import useTheme from "../hooks/useTheme.js";
import { useBrochureModal } from "../context/BrochureModalContext.jsx";

const LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { open: openBrochure } = useBrochureModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <Logo size={38} />
          <span
            className="font-display text-2xl tracking-wide text-ivory"
            aria-label="Jayabheri The Pinnacle"
          >
            J<span className="italic text-bronze">P</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-ivory/80 transition-colors hover:text-bronze"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={openBrochure}
            aria-label="Download Brochure"
            title="Download Brochure"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-bronze hover:text-bronze"
          >
            <Download size={16} />
          </button>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a
            href="#enquire"
            className="rounded-full border border-bronze/60 px-5 py-2.5 text-sm text-bronze transition-colors hover:bg-bronze hover:text-onaccent"
          >
            Book a Visit
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-ivory"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 bg-ink md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-ivory/85"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#enquire"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-bronze py-3 text-center text-sm font-medium text-onaccent"
                >
                  Book a Visit
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openBrochure();
                  }}
                  className="mt-1 flex w-full items-center justify-center gap-2 py-3 text-sm text-ivory/70"
                >
                  <Download size={16} />
                  Download Brochure
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
