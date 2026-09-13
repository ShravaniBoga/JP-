import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

const initialForm = { name: "", phone: "", email: "", config: "3.5 BHK", message: "" };

export default function Enquiry() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: front-end only. Wire this up to your CRM / email endpoint
    // (e.g. POST to an API route, or a service like Formspree) before going live.
    setSubmitted(true);
  };

  return (
    <section id="enquire" className="bg-ink-light py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="text-sm tracking-wide2 text-bronze">Enquire</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-medium text-ivory md:text-5xl">
            Reserve your window on the skyline.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ivory/70">
            Share a few details and the Jayabheri sales team will schedule a
            private site visit and walk you through pricing, availability,
            and RERA documentation.
          </p>

          {/* highlighted "call now" CTA — pulsing ring draws the eye
              straight to the fastest path to a human */}
          <motion.a
            href="tel:+914045678900"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="animate-pulse-ring mt-8 inline-flex items-center gap-3 rounded-full bg-bronze px-7 py-4 text-base font-semibold text-onaccent shadow-soft"
          >
            <Phone size={20} className="fill-onaccent/10" />
            Call Now — +91 40 4567 8900
          </motion.a>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-3 text-ivory/70">
              <Mail size={18} className="text-bronze" />
              <span>sales@jayabherithepinnacle.com</span>
            </div>
            <div className="flex items-center gap-3 text-ivory/70">
              <MapPin size={18} className="text-bronze" />
              <span>Puppalguda, Kokapet, Hyderabad</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="relative overflow-hidden rounded-2xl border border-ivory/10 bg-ink p-8 shadow-soft md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <CheckCircle2 className="text-bronze" size={44} strokeWidth={1.5} />
                  <h3 className="mt-5 font-display text-2xl text-ivory">
                    Thank you, {form.name.split(" ")[0] || "there"}.
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-ivory/60">
                    Our team will reach out within one business day to
                    confirm your site visit.
                  </p>
                  <button
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                    className="mt-8 text-sm text-bronze underline underline-offset-4"
                  >
                    Submit another enquiry
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
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Full name">
                      <input
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Aditi Rao"
                        className="input"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="+91 90000 00000"
                        className="input"
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      className="input"
                    />
                  </Field>

                  <Field label="Interested in">
                    <select
                      value={form.config}
                      onChange={update("config")}
                      className="input"
                    >
                      <option>3.5 BHK</option>
                      <option>4.5 BHK</option>
                      <option>Not sure yet</option>
                    </select>
                  </Field>

                  <Field label="Message (optional)">
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Preferred visit date, questions, etc."
                      className="input resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-bronze py-3.5 text-sm font-medium text-onaccent transition-transform hover:scale-[1.01]"
                  >
                    Request a Callback
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* scoped input styling */}
      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(245,241,232,0.15);
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          color: #F5F1E8;
          font-size: 0.925rem;
          transition: border-color 0.2s ease;
        }
        .input::placeholder { color: rgba(245,241,232,0.35); }
        .input:focus { border-color: #C9A66B; outline: none; }
        select.input option { background: #0F1720; }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ivory/45">{label}</span>
      {children}
    </label>
  );
}
