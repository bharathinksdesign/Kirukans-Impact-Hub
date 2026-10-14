import { ArrowUpRight, Images } from 'lucide-react';
import { img, type Project } from '@/lib/site-data';
import { storyHref } from '@/lib/stories';

export function StoryCard({ project: p, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <a
      href={storyHref(p.id)}
      data-testid={`card-project-${p.id}`}
      className={`group h-full w-full text-left overflow-hidden rounded-[1.75rem] bg-card text-plum ring-1 ring-plum/10 shadow-[0_18px_40px_-24px_rgba(26,21,71,0.55)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(26,21,71,0.7)] flex flex-col ${featured ? 'md:flex-row' : ''}`}
    >
      <div className={`relative overflow-hidden ${p.tone} ${featured ? 'md:w-[58%] aspect-[16/11] md:aspect-auto md:min-h-[22rem]' : 'aspect-[4/3]'} flex items-center justify-center`}>
        {p.photos[0] ? (
          <img src={img(p.photos[0].src)} alt={p.photos[0].alt} loading="lazy" className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
        ) : (
          <span className="px-6 text-center text-3xl font-extrabold leading-tight" aria-hidden>{p.title}</span>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold tracking-wide text-plum">{p.date}</span>
        {p.photos.length > 1 && (
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-plum/85 px-3 py-1 text-xs font-semibold text-cream">
            <Images className="size-3.5" aria-hidden /> {p.photos.length} photos
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'md:p-9 md:justify-center' : ''}`}>
        <p className="font-hand text-2xl leading-none text-tangerine">{p.place}</p>
        <h3 className={`mt-2 font-extrabold leading-tight tracking-tight ${featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{p.title}</h3>
        <p className={`mt-3 text-muted-foreground ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>{p.idea}</p>
        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 font-bold">
          <span className="border-b-2 border-sun pb-0.5">Read the story</span>
          <ArrowUpRight className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </a>
  );
}
