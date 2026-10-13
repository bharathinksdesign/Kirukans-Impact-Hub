import { ArrowDown, ArrowUpRight } from 'lucide-react';
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
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section id="top" className="photo-hero" aria-label="Kirukans community">
      <div className="photo-hero-inner">
        <div className="hero-copy text-cream">
          <p className="font-hand text-3xl text-sun">Trichy's volunteer art crew</p>
          <h1 className="mt-2 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight">
            Madness in <span className="text-sun">Doing</span>{' '}
            <span className="text-teal">Goodness</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-cream/85">
            Kirukans is a creative community turning art into action. We pick up brushes, walk into government schools and hospitals, and leave the walls
            brighter than we found them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#stories" className="inline-flex items-center gap-2 rounded-full bg-sun text-plum font-bold px-6 py-3 hover:bg-cream transition-colors" data-testid="link-hero-stories">
              See our stories <ArrowDown className="size-4" aria-hidden />
            </a>
            <a href="#support" className="inline-flex items-center gap-2 rounded-full border-2 border-teal text-teal font-bold px-6 py-3 hover:bg-teal hover:text-plum transition-colors" data-testid="link-hero-support">
              Support us <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <motion.figure
          className="photo-hero-frame"
          style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY, transformPerspective: 1000 }}
          animate={{ y: reducedMotion ? 0 : [0, -8, 0] }}
          transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
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
            animate={{ rotate: reducedMotion ? -5 : [-5, -3.5, -5], y: reducedMotion ? 0 : [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Art is better together!
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
