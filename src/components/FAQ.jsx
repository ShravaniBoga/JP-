import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const QUESTIONS = [
  {
    q: "What configurations are available at The Pinnacle?",
    a: "Two residence types: a 3.5 BHK at 2,692 sq.ft. and a 4.5 BHK at 4,622 sq.ft., both with private elevator lobbies and only four homes per floor.",
  },
  {
    q: "Is the project RERA registered?",
    a: "Yes. The RERA registration number is available on request and will be published here ahead of launch — you can also verify it directly at telangana.rera.gov.in.",
  },
  {
    q: "What is the expected possession timeline?",
    a: "Possession timelines are shared during your site visit, along with construction milestones and payment schedules specific to each tower and floor.",
  },
  {
    q: "Can I book a site visit before making a decision?",
    a: "Absolutely. Use the enquiry form or call our sales team directly to schedule a private walkthrough of the sample residences and clubhouse.",
  },
  {
    q: "Are the amenities shared across both towers?",
    a: "Yes. The clubhouse, infinity pool, sky lounge, and landscaped grounds are shared resort-style amenities accessible to residents of both towers.",
  },
  {
    q: "What financing or home loan assistance is available?",
    a: "Our sales team works with a panel of leading banks and NBFCs to help structure financing, and can walk you through eligibility during your visit.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-ivory/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg text-ivory md:text-xl">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-bronze/40 text-bronze"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ivory/65">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm tracking-wide2 text-bronze">FAQ</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-medium text-ivory md:text-5xl">
            Answers, before you ask.
          </h2>
        </div>

        <div className="mt-10">
          {QUESTIONS.map((item, i) => (
            <FAQItem
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ivory/50">
          Still have a question?{" "}
          <a href="#enquire" className="text-bronze underline underline-offset-4">
            Ask our sales team
          </a>
          .
        </p>
      </div>
    </section>
  );
}
