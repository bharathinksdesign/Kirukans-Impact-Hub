import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';
import { img } from '@/lib/site-data';

export function Hero() {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 120, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 22 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    rotateX.set(-(y - 0.5) * 10);
    rotateY.set((x - 0.5) * 10);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section id="top" className="photo-hero" aria-label="Kirukans community">
      <div className="photo-hero-inner">
        <div className="hero-copy text-plum">
          <p className="font-hand text-3xl text-pink">Trichy's volunteer art crew</p>
          <h1 className="mt-2 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight">
            Madness in Doing{' '}
            <span className="hero-title-emphasis">
              Goodness
              <svg className="hero-title-stroke" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path d="M5 12 C58 4 101 15 155 10 S256 5 307 10 S363 15 395 7" />
                <path d="M14 17 C87 12 128 19 193 15 S305 12 384 14" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-plum/85">
            Kirukans is a creative community turning art into action. We pick up brushes, walk into government schools and hospitals, and leave the walls
            brighter than we found them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`${import.meta.env.BASE_URL}stories`} className="cta-feedback inline-flex items-center gap-2 rounded-full bg-sun text-plum font-bold px-6 py-3" data-testid="link-hero-stories">
              See our stories <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a href={`${import.meta.env.BASE_URL}volunteer`} className="cta-feedback inline-flex items-center gap-2 rounded-full border-2 border-plum text-plum font-bold px-6 py-3 hover:border-plum" data-testid="link-hero-support">
              Support us <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <motion.figure
          className="photo-hero-frame"
          style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY, transformPerspective: 1000 }}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={reducedMotion ? undefined : 'hover'}
          whileTap={reducedMotion ? undefined : 'pressed'}
          tabIndex={-1}
          variants={{
            hidden: { opacity: 0, y: 32, rotate: -3, scale: 0.94 },
            visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] } },
            hover: { y: -8, rotate: 0.7, scale: 1.018, transition: { duration: 0.3 } },
            pressed: { y: -2, rotate: 0, scale: 0.985, transition: { duration: 0.15 } },
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          onPointerCancel={resetTilt}
        >
          <div className="photo-hero-image-window">
          <img
            src={img('page-1-image-7.webp')}
            alt="Children proudly sharing their artwork and certificates at a Kirukans community workshop"
            fetchPriority="high"
            className="photo-hero-image"
          />
          </div>
          <motion.figcaption
            className="photo-hero-caption font-hand"
            variants={{
              hidden: { opacity: 0, x: -30, y: 12, rotate: -12, scale: 0.92 },
              visible: { opacity: 1, x: 0, y: 0, rotate: -5, scale: 1, transition: { delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] } },
              hover: { x: 8, y: -7, rotate: -2, scale: 1, transition: { duration: 0.3 } },
              pressed: { x: 4, y: 0, rotate: -4, scale: 1, transition: { duration: 0.15 } },
            }}
          >
            Art is better together!
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
