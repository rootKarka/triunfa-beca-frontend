import { Award, CheckCircle2, FileText, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const PUNTOS = [
  "Orientación sobre requisitos y etapas del concurso",
  "Preparación académica para el examen",
  "Acompañamiento en la organización de tus documentos",
];

export function Beca18Section({ onRequest }: { onRequest: () => void }) {
  return (
    <section id="beca18" className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 size-64 rounded-full bg-brand-light/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 size-72 rounded-full bg-crimson/25 blur-3xl" />
        <Award className="absolute right-8 top-10 size-24 text-gold/20" />
        <div className="absolute left-1/2 top-6 h-24 w-24 rotate-45 rounded-3xl border-4 border-gold/20" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full bg-crimson px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-crimson-foreground">
            Programa especial
          </span>
          <h2 className="mt-4 text-3xl text-navy-foreground sm:text-4xl lg:text-5xl">
            ¿Quieres postular a <span className="text-gold">Beca 18</span>?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-foreground/80">
            Te acompañamos en el proceso y te brindamos orientación para que puedas conocer mejor los
            requisitos y oportunidades disponibles.
          </p>

          <ul className="mt-6 space-y-3">
            {PUNTOS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm font-semibold text-navy-foreground/90">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>

          <button
            onClick={onRequest}
            className="mt-8 rounded-full bg-gold-gradient px-8 py-3.5 text-base font-extrabold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
          >
            Quiero asesoramiento
          </button>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { icon: FileText, t: "Requisitos claros", d: "Te explicamos paso a paso qué necesitas presentar." },
              { icon: Users, t: "Asesoría cercana", d: "Resolvemos tus dudas junto a tu familia." },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-navy-foreground/15 bg-navy-foreground/10 p-6 backdrop-blur">
                <c.icon className="size-8 text-gold" />
                <h3 className="mt-3 text-lg text-navy-foreground">{c.t}</h3>
                <p className="mt-1 text-sm text-navy-foreground/75">{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
