import { BookOpenCheck, GraduationCap, HeartHandshake, Target, Trophy } from "lucide-react";
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

const INGRESANTES = [
  {
    carrera: "Ingeniería Civil",
    universidad: "Universidad Continental",
    modalidad: "Ingresante destacado",
  },
  {
    carrera: "Ingeniería Agraria",
    universidad: "UCSS",
    modalidad: "Ingresante destacado",
  },
  {
    carrera: "Derecho",
    universidad: "UPC",
    modalidad: "Ingresante destacado",
  },
  {
    carrera: "Arquitectura",
    universidad: "UPC",
    modalidad: "Ingresante destacado",
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

        {/* Pilares institucionales */}
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

        {/* Sección de Casos de Éxito / Ingresantes */}
        <div className="mt-20">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand">
              Resultados que nos respaldan
            </span>
            <h3 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
              Nuestros Ingresantes
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Estudiantes que alcanzaron sus metas académicas e ingresaron a prestigiosas universidades con el apoyo de Triunfa Beca.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INGRESANTES.map((item, i) => (
              <Reveal key={`${item.carrera}-${item.universidad}-${i}`} delay={i * 80}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gold-gradient text-gold-foreground">
                        <GraduationCap className="size-5" />
                      </span>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {item.modalidad}
                      </span>
                    </div>
                    <h4 className="mt-4 text-base font-bold text-navy">{item.carrera}</h4>
                    <p className="mt-1 text-sm font-semibold text-crimson">{item.universidad}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}