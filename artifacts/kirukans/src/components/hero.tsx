import { img } from '@/lib/site-data';

export function Hero() {
  return (
    <section id="top" className="photo-hero" aria-label="Kirukans community">
      <h1 className="sr-only">Kirukans — Madness in Doing Goodness</h1>
      <div className="photo-hero-inner">
        <figure className="photo-hero-frame">
          <img
            src={img('page-1-image-7.webp')}
            alt="Children proudly sharing their artwork and certificates at a Kirukans community workshop"
            fetchPriority="high"
            className="photo-hero-image"
          />
          <figcaption className="photo-hero-caption font-hand">Art is better together!</figcaption>
        </figure>
      </div>
    </section>
  );
}
