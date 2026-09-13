/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // These resolve through CSS variables (see src/index.css) so the
        // whole site re-themes when `.light` is toggled on <html>, without
        // touching every component's className.
        ink: {
          DEFAULT: "var(--c-ink)", // page / section background
          light: "var(--c-ink-light)",
          soft: "var(--c-ink-soft)",
        },
        bronze: {
          DEFAULT: "#C9A66B", // champagne bronze — primary accent, constant across themes
          light: "#E0C793",
          dark: "#9C7C46",
        },
        ivory: {
          DEFAULT: "var(--c-ivory)", // primary text colour
          dim: "var(--c-ivory-dim)",
        },
        sage: {
          DEFAULT: "#4A5D53", // muted sage — secondary accent (zen gardens)
          light: "#6B8175",
        },
        // Fixed near-black used for text sitting on top of the bronze
        // accent colour (buttons, active pills) — must stay dark in both
        // light and dark mode for contrast.
        onaccent: "#141A22",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.14em",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(201,166,107,0.18), transparent 60%)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
