import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/config/site";
import { Reveal, SectionHeading } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Estamos para ayudarte"
          subtitle="Visítanos o escríbenos: con gusto resolvemos todas tus dudas."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <Reveal>
              <div className="flex items-start gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-crimson text-crimson-foreground">
                  <MapPin className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg text-navy">Dirección</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
                  <p className="text-sm text-muted-foreground">{SITE.addressReference}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
                  <Mail className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg text-navy">Correo</h3>
                  <p className="mt-1 break-all text-sm text-muted-foreground">{SITE.email}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={140}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-whatsapp text-white">
                  <Phone className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg text-navy">WhatsApp</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.phoneDisplay}</p>
                </div>
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {/* Mapa referencial (placeholder visual, reemplazable por Google Maps) */}
            <div className="relative h-80 overflow-hidden rounded-3xl border border-border/60 bg-navy shadow-card lg:h-full">
              <div aria-hidden className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(oklch(1_0_0/.12)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/.12)_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="absolute left-1/4 top-0 h-full w-6 bg-navy-foreground/10" />
                <div className="absolute left-0 top-1/2 h-6 w-full bg-navy-foreground/10" />
                <div className="absolute bottom-6 right-8 size-28 rounded-2xl bg-whatsapp/25" />
              </div>
              <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-crimson text-crimson-foreground shadow-card">
                  <Navigation className="size-7" />
                </span>
                <p className="mt-4 font-display text-xl text-navy-foreground">Academia Triunfa Beca</p>
                <p className="mt-1 text-sm text-navy-foreground/80">{SITE.address}</p>
                <p className="text-sm text-navy-foreground/80">{SITE.addressReference}</p>
                <span className="mt-5 rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-gold-foreground">
                  Mapa referencial
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
