import { useState, type CSSProperties } from 'react';

const beforeImage = '/images/manakkal-wall-before-aligned.webp';
const afterImage = '/images/manakkal-wall-after.webp';
const mobileBeforeImage = '/images/manakkal-wall-before-mobile-extended.webp';
const mobileAfterImage = '/images/manakkal-wall-after-mobile-extended.webp';

export function MuralComparison() {
  const [position, setPosition] = useState(50);

  return (
    <section
      id="mural-comparison"
      className="mural-comparison-section relative overflow-hidden bg-teal/15 px-5 py-16 md:py-24"
      aria-labelledby="mural-comparison-title"
      data-testid="section-mural-comparison"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-9 lg:grid-cols-[1.22fr_0.78fr] lg:gap-14">
        <div className="max-w-xl lg:order-2">
          <p className="font-hand text-2xl text-plum md:text-3xl" data-testid="text-mural-comparison-eyebrow">
            One wall. A new world.
          </p>
          <h2
            id="mural-comparison-title"
            className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-tight text-plum md:text-5xl"
            data-testid="heading-mural-comparison"
          >
            See what a little colour can make possible.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-plum/75 md:text-lg" data-testid="text-mural-comparison-description">
            Kirukans’ first mural turned the library block at Manakkal Government Primary School into a celebration of learning.
            Drag the line to see the change.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-l-4 border-sun pl-4 text-sm font-bold text-plum">
            <span data-testid="text-mural-comparison-project">“The Power of Education”</span>
            <span className="font-medium text-plum/65" data-testid="text-mural-comparison-location">Manakkal · June 2021</span>
          </div>
        </div>

        <div className="min-w-0 lg:order-1">
          <div
            className="mural-compare-frame relative isolate aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border-[5px] border-cream bg-cream md:aspect-[2.16/1] md:rounded-[2rem]"
            style={{ '--compare-position': `${position}%` } as CSSProperties}
            data-testid="mural-comparison-frame"
          >
            <div className="absolute inset-0">
              <picture>
                <source media="(max-width: 767px)" srcSet={mobileAfterImage} />
                <img
                  src={afterImage}
                  alt="The completed education mural on the library block at Manakkal Government Primary School."
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  data-testid="img-mural-after"
                />
              </picture>
              <div className="mural-compare-before-layer absolute inset-0">
                <picture>
                  <source media="(max-width: 767px)" srcSet={mobileBeforeImage} />
                  <img
                    src={beforeImage}
                    alt="The unpainted library block wall at Manakkal Government Primary School before the mural."
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    data-testid="img-mural-before"
                  />
                </picture>
              </div>

              <div className="mural-compare-divider pointer-events-none absolute bottom-0 top-0 z-10" aria-hidden="true">
                <span className="mural-compare-handle">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m9 7-5 5 5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={position}
                onChange={(event) => setPosition(Number(event.currentTarget.value))}
                aria-label="Compare the Manakkal school wall before and after Kirukans’ mural"
                aria-valuetext={`${position}% of the original wall visible`}
                aria-describedby="mural-comparison-instructions"
                className="mural-compare-input absolute inset-0 z-20 h-full w-full cursor-ew-resize"
                data-testid="input-mural-comparison"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between px-1 text-xs font-semibold text-plum/70 sm:text-sm">
            <span data-testid="label-mural-before">Before</span>
            <span data-testid="label-mural-after">After</span>
          </div>
          <p id="mural-comparison-instructions" className="mt-2 text-center text-sm font-medium text-plum/70" data-testid="text-mural-comparison-instructions">
            Drag, tap, or use the arrow keys to compare
          </p>
          <p className="mt-1 text-center text-xs text-plum/60 md:hidden">
            Top and bottom edges extended with AI.
          </p>
        </div>
      </div>
    </section>
  );
}
