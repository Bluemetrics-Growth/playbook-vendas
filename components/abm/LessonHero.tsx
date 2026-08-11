import { Play, Clock, Video } from "lucide-react";
import { abmSections } from "@/content/abm/sections";

/**
 * Cabeçalho de aula estilo plataforma de curso: trilha, número da aula e um
 * slot de vídeo 16:9. Quando `videoUrl` existir na seção, embeda; senão mostra
 * um placeholder "vídeo em breve" sobre a capa da aula.
 */
export function LessonHero({ slug }: { slug: string }) {
  const idx = abmSections.findIndex((s) => s.slug === slug);
  if (idx === -1) return null;
  const section = abmSections[idx];

  return (
    <div className="mb-7 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-fg-muted">
        <span className="font-medium text-fg">Módulo ABM</span>
        <span className="text-fg-hint">·</span>
        <span>Aula {idx + 1} de {abmSections.length}</span>
        {section.duration ? (
          <>
            <span className="text-fg-hint">·</span>
            <span className="inline-flex items-center gap-1"><Clock size={13} /> {section.duration}</span>
          </>
        ) : null}
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-bm-black sm:aspect-[21/9]">
        {section.videoUrl ? (
          <iframe
            src={section.videoUrl}
            title={`Aula: ${section.title}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${section.cover})` }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,10,0.25), rgba(6,6,10,0.78))" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-2">
                <Play size={26} className="ml-1" fill="currentColor" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-black/40 px-3 py-1 text-body-sm text-white backdrop-blur-sm">
                <Video size={14} /> Vídeo desta aula em breve
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
