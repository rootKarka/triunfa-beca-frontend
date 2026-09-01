import { BookOpenCheck, HeartHandshake, Target, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const CARDS = [
  {
    icon: BookOpenCheck,
    title: "Formación académica",
    text: "Refuerzo y preparación adaptada al nivel de cada estudiante.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento personalizado",
    text: "Orientación para que cada estudiante pueda desarrollar su potencial.",
  },
  {
    icon: Target,
    title: "Preparación preuniversitaria",
    text: "Fortalece tus conocimientos y prepárate para tu próximo desafío académico.",
  },
  {
    icon: Trophy,
    title: "Orientación Beca 18",
    text: "Asesoramiento para estudiantes interesados en postular a Beca 18.",
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="¿Por qué elegir Triunfa Beca?"
          title="Preparándote para alcanzar tus metas"
          subtitle="Una academia cercana, con docentes que acompañan a cada estudiante en su propio ritmo de aprendizaje."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article className="group surface-card h-full rounded-3xl border border-border/60 p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-soft transition-colors group-hover:bg-crimson">
                  <card.icon className="size-7" />
                </span>
                <h3 className="mt-5 text-lg text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
