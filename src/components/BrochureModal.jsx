import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Download, X } from "lucide-react";
import { useBrochureModal } from "../context/BrochureModalContext.jsx";

const initialForm = { name: "", phone: "" };

export default function BrochureModal() {
  const { isOpen, close } = useBrochureModal();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: front-end only. Wire this up to your CRM / email endpoint,
    // and point the "download" action at the real brochure PDF, before
    // going live.
    setSubmitted(true);
  };

  const handleExited = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <AnimatePresence onExitComplete={handleExited}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-onaccent/70 p-6 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ivory/10 bg-ink p-8 shadow-soft"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 text-ivory/50 transition-colors hover:text-bronze"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <CheckCircle2 className="text-bronze" size={44} strokeWidth={1.5} />
                  <h3 className="mt-5 font-display text-2xl text-ivory">
                    Thank you, {form.name.split(" ")[0] || "there"}.
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-ivory/60">
                    Your brochure is on its way to your phone and inbox.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 text-sm text-bronze underline underline-offset-4"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3 text-bronze">
                    <Download size={22} />
                    <p className="text-sm tracking-wide2">Project Brochure</p>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-ivory">
                    Get the full brochure — layouts, pricing &amp; specs.
                  </h3>
                  <p className="text-sm leading-relaxed text-ivory/60">
                    Just your name and number — we&rsquo;ll send the PDF
                    straight over.
                  </p>

                  <label className="block">
                    <span className="mb-2 block text-sm text-ivory/45">Full name</span>
                    <input
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Aditi Rao"
                      className="brochure-input"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-ivory/45">Phone</span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 90000 00000"
                      className="brochure-input"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-bronze py-3.5 text-sm font-medium text-onaccent transition-transform hover:scale-[1.01]"
                  >
                    Download Brochure
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <style>{`
              .brochure-input {
                width: 100%;
                background: transparent;
                border: 1px solid rgba(245,241,232,0.15);
                border-radius: 0.75rem;
                padding: 0.8rem 1rem;
                color: #F5F1E8;
                font-size: 0.925rem;
                transition: border-color 0.2s ease;
              }
              .brochure-input::placeholder { color: rgba(245,241,232,0.35); }
              .brochure-input:focus { border-color: #C9A66B; outline: none; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
