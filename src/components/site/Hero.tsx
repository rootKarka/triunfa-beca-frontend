import { Atom, BookOpen, GraduationCap, PenTool, Sigma, Sparkles } from "lucide-react";
import heroMain from "@/assets/hero-students.jpg";
import heroKid from "@/assets/hero-student-2.jpg";
import heroGrads from "@/assets/hero-student-3.jpg";
import { SITE, scrollToSection } from "@/config/site";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-hero-gradient pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Elementos gráficos educativos sutiles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-navy-foreground/15">
        <Sigma className="animate-float absolute left-6 top-32 size-16" />
        <Atom className="animate-float absolute right-10 top-24 size-20 [animation-delay:1.5s]" />
        <BookOpen className="animate-float absolute bottom-16 left-1/4 size-14 [animation-delay:.8s]" />
        <PenTool className="animate-float absolute bottom-28 right-1/3 size-12 [animation-delay:2.2s]" />
        <span className="absolute left-1/3 top-16 font-display text-3xl">a² + b² = c²</span>
        <span className="absolute bottom-10 right-8 font-display text-2xl">π · r²</span>
        <div className="absolute -left-24 top-1/2 size-72 rounded-full bg-brand-light/25 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-gold-foreground">
            <Sparkles className="size-4" /> Academia {SITE.name}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.1] text-navy-foreground sm:text-5xl lg:text-6xl">
            Tu esfuerzo de hoy{" "}
            <span className="relative inline-block text-gold">construye tu futuro.</span>
          </h1>
          <p className="mt-4 text-lg font-semibold text-navy-foreground/95 sm:text-xl">
            Prepárate, aprende y alcanza tus metas con Triunfa Beca.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-navy-foreground/75 sm:text-base lg:mx-0">
            Formación académica para estudiantes de Inicial, Primaria, Secundaria y Preuniversitario,
            además de asesoramiento para postulantes a Beca 18.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              onClick={() => scrollToSection("#informacion")}
              className="rounded-full bg-crimson px-7 py-3.5 text-base font-extrabold text-crimson-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Solicitar información
            </button>
            <button
              onClick={() => scrollToSection("#matricula")}
              className="rounded-full bg-gold-gradient px-7 py-3.5 text-base font-extrabold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
            >
              Quiero matricularme
            </button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 text-center lg:max-w-md lg:text-left">
            {[
              { k: "4", v: "Niveles académicos" },
              { k: "2", v: "Turnos disponibles" },
              { k: "4", v: "Talleres los sábados" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-navy-foreground/10 px-3 py-4 backdrop-blur">
                <dt className="font-display text-2xl text-gold">{s.k}</dt>
                <dd className="mt-1 text-xs font-semibold text-navy-foreground/80">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage de fotografías */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <img
              src={heroMain}
              alt="Estudiantes de secundaria sonriendo con sus cuadernos"
              width={1024}
              height={1280}
              className="w-full rounded-[2rem] border-4 border-navy-foreground/20 object-cover shadow-card"
            />
            <img
              src={heroKid}
              alt="Niña estudiando con sus libros"
              width={768}
              height={768}
              loading="lazy"
              className="absolute -bottom-6 -left-4 hidden w-32 rounded-2xl border-4 border-background object-cover shadow-card sm:block sm:w-40"
            />
            <img
              src={heroGrads}
              alt="Jóvenes celebrando su ingreso a la universidad"
              width={768}
              height={768}
              loading="lazy"
              className="absolute -right-4 top-8 hidden w-32 rounded-2xl border-4 border-background object-cover shadow-card sm:block sm:w-36"
            />
            <div className="absolute -bottom-5 right-4 flex items-center gap-2 rounded-2xl bg-background px-4 py-3 shadow-card">
              <GraduationCap className="size-6 text-crimson" />
              <div className="text-left leading-tight">
                <p className="font-display text-sm text-navy">Beca 18</p>
                <p className="text-[11px] font-semibold text-muted-foreground">Asesoría para postular</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
