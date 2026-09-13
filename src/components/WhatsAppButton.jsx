import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// NOTE: placeholder number — replace with the real WhatsApp business
// line before launch.
const WHATSAPP_NUMBER = "914045678900";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in The Pinnacle by Jayabheri. Could you share more details?"
);

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-bronze text-onaccent shadow-soft md:flex"
    >
      <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full" />
      <MessageCircle size={24} strokeWidth={2} />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs text-ivory opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
