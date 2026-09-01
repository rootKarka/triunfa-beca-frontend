import { Info, Moon, Sun } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const TURNOS = [
  { icon: Sun, name: "Turno Mañana", dias: "Lunes a viernes", hora: "8:30 AM - 12:00 PM", accent: "bg-gold-gradient text-gold-foreground" },
  { icon: Moon, name: "Turno Tarde", dias: "Lunes a viernes", hora: "3:00 PM - 6:00 PM", accent: "bg-crimson text-crimson-foreground" },
];

export function ScheduleSection() {
  return (
    <section id="horarios" className="bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Horarios" title="Horarios de atención y clases" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {TURNOS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <article className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1.5">
                <div className={`flex items-center gap-3 px-6 py-5 ${t.accent}`}>
                  <t.icon className="size-7" />
                  <h3 className="text-xl">{t.name}</h3>
                </div>
                <div className="px-6 py-7 text-center">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">{t.dias}</p>
                  <p className="mt-2 font-display text-3xl text-navy">{t.hora}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-4 text-center text-sm font-semibold text-navy">
            <Info className="size-5 shrink-0 text-brand" />
            Consulta disponibilidad y horarios según el programa académico.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
