import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo-triunfa-beca.png";
import { NAV_LINKS, SITE, scrollToSection } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="inline-flex items-center rounded-2xl bg-navy-foreground px-4 py-3">
            <img src={logo} alt="Logo de Triunfa Beca" width={889} height={466} loading="lazy" className="h-12 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-navy-foreground/75">{SITE.tagline}</p>
        </div>

        <nav>
          <h3 className="text-lg text-gold">Navegación</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollToSection(l.href)}
                  className="text-sm font-semibold text-navy-foreground/80 transition-colors hover:text-gold"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-lg text-gold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              {SITE.phoneDisplay}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                {SITE.address}
                <br />
                {SITE.addressReference}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/15 py-5 text-center text-xs text-navy-foreground/70">
        © 2026 Triunfa Beca. Todos los derechos reservados.
      </div>
    </footer>
  );
}
