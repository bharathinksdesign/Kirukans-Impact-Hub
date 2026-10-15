import type { TeamMember } from '@/lib/team-data';
import { img } from '@/lib/site-data';

export function TeamPortrait({ m }: { m: TeamMember }) {
  return (
    <img src={img(m.photo)} alt={`${m.name}, ${m.role} of Kirukans`} width={512} height={512} loading="lazy" className="size-full rounded-2xl object-cover" />
  );
}

export function TeamCard({ m }: { m: TeamMember }) {
  return (
    <article data-testid={`card-team-${m.id}`} className="group h-full overflow-hidden rounded-[1.75rem] bg-card text-plum border-2 border-plum shadow-brand motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-brand-hover flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 p-5 md:p-7 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"><TeamPortrait m={m} /></div>
      </div>
      <div className="p-6">
        <p className="font-hand text-2xl leading-none text-tangerine">{m.role}</p>
        <h3 className="mt-2 text-xl md:text-2xl font-extrabold tracking-tight">{m.name}</h3>
        {m.bio && <p className="mt-3 text-muted-foreground">{m.bio}</p>}
      </div>
    </article>
  );
}
