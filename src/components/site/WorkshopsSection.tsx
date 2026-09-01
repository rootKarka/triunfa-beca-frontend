import ajedrez from "@/assets/taller-ajedrez.jpg";
import manualidades from "@/assets/taller-manualidades.jpg";
import danza from "@/assets/taller-danza.jpg";
import futsal from "@/assets/taller-futsal.jpg";
import { Reveal, SectionHeading } from "./Reveal";

const TALLERES = [
  { emoji: "♟", name: "Ajedrez", img: ajedrez, text: "Desarrolla concentración, estrategia y pensamiento lógico." },
  { emoji: "🎨", name: "Manualidades", img: manualidades, text: "Creatividad y motricidad a través del arte y el juego." },
  { emoji: "💃", name: "Danza", img: danza, text: "Expresión corporal, ritmo y confianza sobre el escenario." },
  { emoji: "⚽", name: "Futsal", img: futsal, text: "Trabajo en equipo, disciplina y vida activa." },
];

export function WorkshopsSection() {
  return (
    <section id="talleres" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Talleres / Sábados"
          title="Aprende también fuera del aula"
          subtitle="Actividades complementarias para que cada estudiante descubra sus talentos."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TALLERES.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
              <article className="group h-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={t.img}
                    alt={`Taller de ${t.name}`}
                    width={768}
                    height={576}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-lg">
                    {t.emoji}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl text-navy">{t.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
