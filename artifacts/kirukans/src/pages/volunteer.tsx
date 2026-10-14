import { PageShell } from '@/components/page-shell';
import { Join } from '@/components/join-section';
import { Reveal } from '@/components/reveal';

const steps = [
  { t: 'Tell us who you are', d: 'Share your name and an email or mobile number, and tick the consent box.' },
  { t: 'We read it privately', d: 'Your details reach a private inbox read by the trust team.' },
  { t: 'We reply about volunteering', d: 'Murals, workshops, outreach: we get in touch about how you can help.' },
];

export default function VolunteerPage() {
  return (
    <PageShell
      title="Volunteer | Kirukans Charitable Trust"
      description="Volunteer with Kirukans in Trichy. Paint, create, lend a hand or help a cause by sharing your details with the trust team."
      kicker="Volunteer"
      heading="Bring your hands, we will bring the paint"
      intro="You do not need to be a professional artist. Bring your creativity and care to murals, workshops, outreach and volunteer programs."
    >
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100} className="h-full">
              <li className="h-full list-none rounded-3xl border-2 border-plum bg-white p-6 transition-shadow hover:shadow-[8px_8px_0_0_hsl(var(--sun))]">
                <span className="font-hand text-3xl text-tangerine">0{i + 1}</span>
                <h2 className="text-xl font-extrabold text-plum">{s.t}</h2>
                <p className="mt-2 text-plum/85">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <Join />
    </PageShell>
  );
}
