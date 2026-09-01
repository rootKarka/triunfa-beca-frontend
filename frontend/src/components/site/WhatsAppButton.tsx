import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/config/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${SITE.phoneDisplay}`}
      className="group fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-card transition-transform duration-300 hover:scale-110 hover:rotate-6 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 group-hover:hidden" />
      <MessageCircle className="relative size-7" strokeWidth={2.2} />
    </a>
  );
}
