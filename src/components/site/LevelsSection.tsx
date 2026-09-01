import { Blocks, GraduationCap, Library, PencilRuler } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import type { NivelValue } from "./forms.types";

const LEVELS: { icon: typeof Blocks; name: NivelValue; text: string; accent: string }[] = [
  {
    icon: Blocks,
    name: "Inicial",
    text: "Primeros pasos para desarrollar habilidades y aprender jugando.",
    accent: "bg-gold text-gold-foreground",
  },
  {
    icon: PencilRuler,
    name: "Primaria",
    text: "Refuerzo académico y acompañamiento para fortalecer conocimientos.",
    accent: "bg-brand text-primary-foreground",
  },
  {
    icon: Library,
    name: "Secundaria",
    text: "Refuerzo y preparación para afrontar con éxito cada etapa escolar.",
    accent: "bg-crimson text-crimson-foreground",
  },
  {
    icon: GraduationCap,
    name: "Preuniversitario",
    text: "Preparación académica para estudiantes que buscan ingresar a la universidad.",
    accent: "bg-navy text-navy-foreground",
  },
];

export function LevelsSection({ onRequest }: { onRequest: (nivel: NivelValue) => void }) {
  return (
    <section id="niveles" className="bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Niveles académicos"
          title="Encuentra el programa ideal para ti"
          subtitle="Reforzamiento en todos los niveles, con turnos de mañana y tarde de lunes a viernes."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((level, i) => (
            <Reveal key={level.name} delay={i * 90} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                <span className={`inline-flex size-16 items-center justify-center rounded-2xl ${level.accent}`}>
                  <level.icon className="size-8" />
                </span>
                <h3 className="mt-5 text-2xl text-navy">{level.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{level.text}</p>
                <button
                  onClick={() => onRequest(level.name)}
                  className="mt-6 rounded-full border-2 border-brand px-5 py-2.5 text-sm font-extrabold text-brand transition-colors hover:bg-brand hover:text-primary-foreground"
                >
                  Solicitar información
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
