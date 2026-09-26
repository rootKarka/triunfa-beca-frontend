import { BookOpenCheck, GraduationCap, HeartHandshake, Target, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useAboutImages } from "@/hooks/useAboutImages";
import { useIngresantesImages } from "@/hooks/useIngresantesImages";
import { buildImageUrl } from "@/lib/api/images-api";
import { useSecciones } from "@/hooks/useSecciones";

const CARDS = [
  { icon: BookOpenCheck, key: "Formación académica", title: "Formación académica", text: "Refuerzo y preparación adaptada al nivel de cada estudiante." },
  { icon: HeartHandshake, key: "Acompañamiento personalizado", title: "Acompañamiento personalizado", text: "Orientación para que cada estudiante pueda desarrollar su potencial." },
  { icon: Target, key: "Preparación preuniversitaria", title: "Preparación preuniversitaria", text: "Fortalece tus conocimientos y prepárate para tu próximo desafío académico." },
  { icon: Trophy, key: "Orientación Beca 18", title: "Orientación Beca 18", text: "Asesoramiento para estudiantes interesados en postular a Beca 18." },
];

const INGRESANTES = [
  { carrera: "Ingeniería Civil", universidad: "Universidad Continental", modalidad: "Ingresante destacado" },
  { carrera: "Ingeniería Agraria", universidad: "UCSS", modalidad: "Ingresante destacado" },
  { carrera: "Derecho", universidad: "UPC", modalidad: "Ingresante destacado" },
  { carrera: "Arquitectura", universidad: "UPC", modalidad: "Ingresante destacado" },
];

export function AboutSection() {
  const { imagenes } = useAboutImages();
  const { imagenes: ingresantesImagenes } = useIngresantesImages();
  const { getSeccion, isHidden } = useSecciones();
  const seccion = getSeccion("¿POR QUÉ ELEGIR TRIUNFA BECA?");

  if (isHidden("¿POR QUÉ ELEGIR TRIUNFA BECA?")) return null;

  return (
    <section id="nosotros" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={seccion?.etiqueta ?? "¿Por qué elegir Triunfa Beca?"}
          title={seccion?.titulo ?? "Preparándote para alcanzar tus metas"}
          subtitle={seccion?.descripcion ?? "Una academia cercana, con docentes que acompañan a cada estudiante en su propio ritmo de aprendizaje."} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => {
            const imagenApi = imagenes.find((img) =>
              (img.grupo ?? img.texto_alt)?.toLowerCase() === card.key.toLowerCase()
            );

            return (
              <Reveal key={card.title} delay={i * 90}>
                <article className="group surface-card h-full overflow-hidden rounded-3xl border border-border/60 transition-transform duration-300 hover:-translate-y-1.5">
                  {imagenApi ? (
                    <div className="relative h-40 w-full overflow-hidden">
                      <img src={buildImageUrl(imagenApi.url)} alt={imagenApi.texto_alt ?? card.title}
                        className="size-full object-cover" />
                    </div>
                  ) : (
                    <div className="p-6 pb-0">
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-soft transition-colors group-hover:bg-crimson">
                        <card.icon className="size-7" />
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-lg text-navy">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand">
              Resultados que nos respaldan
            </span>
            <h3 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">Nuestros Ingresantes</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Estudiantes que alcanzaron sus metas académicas e ingresaron a prestigiosas universidades con el apoyo de Triunfa Beca.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INGRESANTES.map((item, i) => {
              const imagen = ingresantesImagenes.find((img) => img.grupo === item.carrera);

              return (
                <Reveal key={`${item.carrera}-${item.universidad}-${i}`} delay={i * 80}>
                  <div className="group h-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg">
                    {imagen && (
                      <div className="flex h-56 w-full items-end justify-center overflow-hidden bg-slate-50">
                        <img src={buildImageUrl(imagen.url)} alt={imagen.texto_alt ?? item.carrera}
                          className="h-full w-full object-contain object-bottom" />
                      </div>
                    )}

                    <div className="p-6">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}