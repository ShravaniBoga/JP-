import Logo from "./Logo.jsx";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
  { label: "Enquire", href: "#enquire" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-ink py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <p
                className="font-display text-2xl tracking-wide text-ivory"
                aria-label="Jayabheri The Pinnacle"
              >
                J<span className="italic text-bronze">P</span>
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/50">
              Puppalguda, Kokapet, Hyderabad, Telangana. A residential
              landmark by Jayabheri Properties Private Limited.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-ivory/60 transition-colors hover:text-bronze"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-ivory/10 pt-8 text-xs leading-relaxed text-ivory/35">
          <p>
            RERA Registration: [Insert current RERA No. before publishing —
            verify at telangana.rera.gov.in]. All images, layouts, and
            specifications on this page are indicative and subject to
            approval by competent authorities. Furniture, décor, and
            landscaping shown are for representation only. Sales are subject
            to the terms of the Agreement of Sale.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} Jayabheri Properties Private
            Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
