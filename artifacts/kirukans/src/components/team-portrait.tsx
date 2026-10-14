import type { TeamMember } from '@/lib/team-data';
import { BRAND_PALETTE as palette } from '@/lib/brand-palette';

export function TeamPortrait({ m }: { m: TeamMember }) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={`Illustrative placeholder portrait for sample member ${m.name}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill={m.bg} />
      <circle cx="165" cy="45" r="46" fill={palette.light} opacity=".35" />
      <circle cx="28" cy="205" r="34" fill={palette.light} opacity=".25" />
      {m.hairStyle === 'long' && <rect x="58" y="62" width="84" height="110" rx="42" fill={m.hair} />}
      {m.hairStyle === 'bun' && <circle cx="100" cy="46" r="20" fill={m.hair} />}
      <path d="M30 240c0-52 30-72 70-72s70 20 70 72z" fill={m.shirt} />
      <rect x="86" y="140" width="28" height="34" rx="10" fill={m.skin} />
      <ellipse cx="100" cy="106" rx="40" ry="46" fill={m.skin} />
      {m.hairStyle === 'curly' ? (
        <g fill={m.hair}>{[66, 82, 100, 118, 134].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 64 : 70} r="16" />)}</g>
      ) : (
        <path d="M58 100c-4-46 28-62 48-60 26 2 40 24 36 60-6-22-18-30-42-30-22 0-36 8-42 30z" fill={m.hair} />
      )}
      <circle cx="86" cy="108" r="3.5" fill={palette.black} />
      <circle cx="114" cy="108" r="3.5" fill={palette.black} />
      <path d="M88 128q12 10 24 0" stroke={palette.black} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function TeamCard({ m }: { m: TeamMember }) {
  return (
    <article data-testid={`card-team-${m.id}`} className="group h-full overflow-hidden rounded-[1.75rem] bg-card text-plum ring-1 ring-plum/10 shadow-[0_18px_40px_-24px_rgba(26,21,71,0.55)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[4/4.2] overflow-hidden">
        <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"><TeamPortrait m={m} /></div>
        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold text-plum">Sample profile</span>
      </div>
      <div className="p-6">
        <p className="font-hand text-2xl leading-none text-tangerine">{m.role}</p>
        <h3 className="mt-2 text-xl md:text-2xl font-extrabold tracking-tight">{m.name}</h3>
        <p className="mt-3 text-muted-foreground">{m.bio}</p>
      </div>
    </article>
  );
}
