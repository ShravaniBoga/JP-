import { motion } from "framer-motion";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";

// NOTE: replace with the real sales line and a WhatsApp-enabled number
// before launch — the digits below are the same placeholder used in
// the Enquiry section.
const PHONE_TEL = "+914045678900";
const WHATSAPP_NUMBER = "914045678900";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in The Pinnacle by Jayabheri. Could you share more details?"
);

export default function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ivory/10 bg-ink/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-ivory/10">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex flex-col items-center gap-1 py-3 text-ivory/80"
        >
          <Phone size={18} className="text-bronze" />
          <span className="text-[11px]">Call</span>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-ivory/80"
        >
          <MessageCircle size={18} className="text-bronze" />
          <span className="text-[11px]">WhatsApp</span>
        </a>
        <a
          href="#enquire"
          className="flex flex-col items-center gap-1 bg-bronze py-3 text-onaccent"
        >
          <CalendarCheck size={18} />
          <span className="text-[11px] font-medium">Enquire</span>
        </a>
      </div>
    </motion.div>
  );
}
