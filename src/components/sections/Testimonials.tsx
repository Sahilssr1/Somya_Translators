import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../../data/content";
import { media } from "../../data/media";
import { LazyImage, Reveal, SectionTag } from "../ui";

const AUTO_ADVANCE_MS = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, go]);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-label="Client voices"
      className="relative overflow-hidden bg-[#080D16] text-white"
    >
      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag index="08" label="Client voices" light />

        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
            {/* ---- Featured quote ---- */}
            <div>
              <span
                aria-hidden="true"
                className="font-display text-[7rem] leading-[0.6] text-[#FF5F57] select-none md:text-[10rem]"
              >
                &ldquo;
              </span>
              <div className="min-h-[16rem] sm:min-h-[13rem] lg:min-h-[15rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-2xl leading-snug font-medium text-balance sm:text-3xl lg:text-[2.6rem] lg:leading-[1.25]"
                  >
                    {current.quote}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* ---- Controls ---- */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[#FF5F57] hover:bg-[#FF5F57] hover:text-[#ffffff]"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[#FF5F57] hover:bg-[#FF5F57] hover:text-[#ffffff]"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                <p className="font-grotesk text-sm tracking-[0.2em] text-[#A6B0C0]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}{" "}
                  <span className="text-white/40">/ {String(TESTIMONIALS.length).padStart(2, "0")}</span>
                </p>
                <div className="flex gap-2" role="tablist" aria-label="Choose a testimonial">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial from ${t.name}`}
                      onClick={() => setIndex(i)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === index ? "w-8 bg-[#FF5F57]" : "w-2 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Portrait + attribution ---- */}
            <div className="flex flex-col items-start lg:items-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-[280px]"
                >
                  <LazyImage
                    src={media(current.image)}
                    alt={`Portrait of ${current.name}`}
                    ratio="3 / 4"
                    className="rounded-t-full rounded-b-2xl"
                  />
                  <p className="mt-5 font-display text-xl font-medium lg:text-right">{current.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#A6B0C0] lg:text-right">
                    {current.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---- Mandatory demo label ---- */}
        <Reveal className="mt-16 border-t border-white/10 pt-6">
          <p className="font-grotesk text-[11px] tracking-[0.2em] text-[#A6B0C0] uppercase">
            Sample testimonials — fictional demo content for illustration.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
