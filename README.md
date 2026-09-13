# Jayabheri The Pinnacle — Landing Page

A premium, animated one-page React site for **Jayabheri The Pinnacle**
(Puppalguda / Kokapet, Hyderabad), built with Vite + React 18, Tailwind CSS,
and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## What's inside

```
src/
  hooks/
    useTheme.js     — dark/light mode state, persisted to localStorage
  components/
    Logo.jsx          — animated rotating brand emblem (used in Navbar + Footer)
    ThemeToggle.jsx    — sun/moon dark-light mode switch
    Navbar.jsx      — sticky nav, blurs on scroll, mobile slide-down menu
    Hero.jsx         — animated skyline (SVG draw-on + "lights on"), positioned
                        to the right of the copy block; headline, CTAs, scroll cue
    Overview.jsx      — "A Jayabheri Group Landmark": image + floating stat card,
                        vertical milestone timeline, quick-fact grid
    Highlights.jsx    — count-up stat band (55 storeys / 2 towers / 425 homes / 4.74 ac)
    Residences.jsx    — 3.5 BHK / 4.5 BHK toggle, animated schematic floor plan
                        + floor-position indicator
    Amenities.jsx     — looping ping-pong marquee (drifts right, then back,
                        on repeat) of real stock photography with icon overlays
    Lifestyle.jsx      — "a rhythm, not just a residence" — three lifestyle moments
    Gallery.jsx       — photo grid (real stock photography, see note below)
    Location.jsx      — animated Ken Burns background photo + radial "distance
                        rings" diagram layered on top
    FAQ.jsx            — accordion of common buyer questions
    Enquiry.jsx        — contact form + a highlighted, pulsing "Call Now" CTA
    Footer.jsx          — nav, contact, RERA disclaimer
```

## Before you publish this live

1. **Photography.** `Amenities.jsx`, `Gallery.jsx`, `Overview.jsx`,
   `Lifestyle.jsx`, and `Location.jsx` use real stock photography from
   Unsplash (free under the Unsplash License, no attribution required) to
   illustrate the *type* of space — these are not photos of Jayabheri The
   Pinnacle. Every `<img>` also falls back to a soft gradient tile if a URL
   is ever slow or blocked, so a section never shows a broken image icon.
   Replace the URLs with your own licensed property photography before
   publishing.
2. **RERA number.** The footer has a placeholder — insert the verified,
   current RERA registration number for this exact project/phase before
   publishing (check https://telangana.rera.gov.in).
3. **Form submission.** `Enquiry.jsx`'s form is front-end only. Wire the
   `handleSubmit` function up to your CRM, an email API route, or a service
   like Formspree/Netlify Forms. The "Call Now" button is a real `tel:` link.
4. **Contact details.** Phone/email in `Enquiry.jsx` and `Footer.jsx` are
   placeholders — replace with the real sales line and inbox.
5. **Copy & figures.** Unit sizes, tower height, and amenities are drawn
   from current public listings for this project — double-check every
   number against the developer's own brochure before publishing, since
   pricing/configuration details can change.

## Design notes

- **Palette:** deep ink navy (`#0F1720`) base, champagne bronze (`#C9A66B`)
  accent, warm ivory (`#F5F1E8`) text, muted sage (`#4A5D53`) as a quiet
  secondary — evokes marble, brass fixtures, and the towers' landscaped
  "zen gardens" rather than a generic dark-mode SaaS palette. Colours are
  driven by CSS variables (`src/index.css`) so the whole site re-themes when
  light mode is toggled, without per-component light/dark classes.
- **Type:** Fraunces (serif, display/headlines) + Manrope (sans, UI/body).
- **Motion:** one orchestrated hero sequence (skyline draws on, windows
  light up in sequence) rather than fade-up on every section. Other motion
  responds to user action — hovering a gallery tile, toggling a floor plan,
  or is genuinely continuous (the Amenities marquee, the Location Ken Burns
  pan) so the page never feels static.
- Respects `prefers-reduced-motion` (see `src/index.css`).
