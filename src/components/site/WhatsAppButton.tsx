import { SITE, whatsappLink } from "@/config/site";
import whatsappLogo from "@/assets/whatsapp-logo.png";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${SITE.phoneDisplay}`}
      className="group fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full shadow-card transition-transform duration-300 hover:scale-110 sm:bottom-7 sm:right-7"
    >
      {/* Efecto de parpadeo */}
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40" />

      {/* Segundo círculo para que el efecto sea más visible */}
      <span className="absolute inset-0 rounded-full bg-whatsapp/20 animate-pulse" />

      {/* Logo de WhatsApp */}
      <div className="relative z-10 size-full overflow-hidden rounded-full">
        <img
          src={whatsappLogo}
          alt="WhatsApp"
          className="size-full object-cover"
        />
      </div>
    </a>
  );
}