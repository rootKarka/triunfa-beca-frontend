import ajedrez from "@/assets/taller-ajedrez.jpg";
import manualidades from "@/assets/taller-manualidades.jpg";
import futsal from "@/assets/taller-futsal.jpg";
import { Reveal, SectionHeading } from "./Reveal";
import { useTalleresImages } from "@/hooks/useTalleresImages";
import { buildImageUrl } from "@/lib/api/images-api";
import { useSecciones } from "@/hooks/useSecciones";

const TALLERES = [
  { emoji: "♟", name: "Ajedrez", img: ajedrez, text: "Desarrolla concentración, estrategia y pensamiento lógico." },
  { emoji: "🎨", name: "Manualidades", img: manualidades, text: "Creatividad y motricidad a través del arte y el juego." },
  { emoji: "⚽", name: "Futbol", img: futsal, text: "Trabajo en equipo, disciplina y vida activa." },
];

export function WorkshopsSection() {
  const { imagenes } = useTalleresImages();
  const { getSeccion, isHidden } = useSecciones();
  const seccion = getSeccion("TALLERES / SÁBADOS");

  if (isHidden("TALLERES / SÁBADOS")) return null;

  return (
    <section id="talleres" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={seccion?.etiqueta ?? "Talleres / Sábados"}
          title={seccion?.titulo ?? "Aprende también fuera del aula"}
          subtitle={seccion?.descripcion ?? "Actividades complementarias para que cada estudiante descubra sus talentos."}
        />

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {TALLERES.map((t, i) => {
            const imagenApi = imagenes.find(
              (img) => img.grupo?.trim().toLowerCase() === t.name.toLowerCase()
            );
            const src = imagenApi ? buildImageUrl(imagenApi.url) : t.img;

            return (
              <Reveal key={t.name} delay={i * 90} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                <article className="group h-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={src}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}