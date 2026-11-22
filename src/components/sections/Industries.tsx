import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LazyImage, Reveal, SectionTag, WordReveal } from "../ui";
import { INDUSTRIES, type Industry } from "../../data/content";
import { media } from "../../data/media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Asymmetric strip below the selector: three industries, three shapes. */
const STRIP: { industry: Industry; ratio: string; className: string }[] = [
  {
    industry: INDUSTRIES.find((i) => i.slug === "technology")!,
    ratio: "3/2",
    className: "md:col-span-5",
  },
  {
    industry: INDUSTRIES.find((i) => i.slug === "healthcare")!,
    ratio: "4/5",
    className: "md:col-span-4 md:mt-16",
  },
  {
    industry: INDUSTRIES.find((i) => i.slug === "tourism")!,
    ratio: "1/1",
    className: "md:col-span-3 md:mt-28",
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const activeIndustry = INDUSTRIES[active];
  const listRef = useRef<(HTMLButtonElement | null)[]>([]);

  /* Arrow-key navigation across the industry list. */
  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next =
      event.key === "ArrowDown"
        ? (active + 1) % INDUSTRIES.length
        : (active - 1 + INDUSTRIES.length) % INDUSTRIES.length;
    setActive(next);
    listRef.current[next]?.focus();
  };

  return (
    <section id="industries" aria-label="Industries" className="bg-bg text-ink">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 md:px-10 md:py-16">
        <SectionTag label="Where we work" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-display text-[clamp(2.1rem,5vw,4.25rem)] leading-[1.05] font-medium tracking-[-0.01em]">
            <WordReveal text="Fluent in your field." accentWords={["field"]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-sm leading-relaxed text-muted">
              Sixteen industries, each with its own terminology, regulations
              and readers. Select a field to see how we work in it.
            </p>
          </Reveal>
        </div>

        {/* ---- Mobile: horizontal chip rail ---- */}
        <div
          className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 lg:hidden"
          role="group"
          aria-label="Choose an industry"
        >
          {INDUSTRIES.map((industry, i) => (
            <button
              key={industry.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`shrink-0 rounded-full border px-4 py-2 font-grotesk text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                i === active
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* ---- Desktop: vertical list of industry names ---- */}
          <div
            className="hidden lg:col-span-5 lg:block"
            onKeyDown={onListKeyDown}
            role="group"
            aria-label="Choose an industry"
          >
            <ul>
              {INDUSTRIES.map((industry, i) => {
                const isActive = i === active;
                return (
                  <li key={industry.slug} className="border-b border-line">
                    <button
                      ref={(el) => {
                        listRef.current[i] = el;
                      }}
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-baseline gap-4 py-3.5 text-left transition-all duration-300 ${
                        isActive ? "translate-x-2" : "hover:translate-x-1"
                      }`}
                    >
                      <span
                        className={`font-grotesk text-xs font-bold transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-faint"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight font-medium transition-colors duration-300 ${
                          isActive ? "text-ink" : "text-faint group-hover:text-muted"
                        }`}
                      >
                        {industry.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-px w-10 shrink-0 self-center transition-all duration-300 ${
                          isActive ? "bg-accent opacity-100" : "bg-line opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---- Image-led panel for the active industry ---- */}
          <div className="lg:col-span-7">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activeIndustry.slug}
                    src={media(activeIndustry.image)}
                    alt={`${activeIndustry.name} industry`}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 bg-bg px-3 py-1.5 font-grotesk text-[11px] font-bold tracking-[0.24em] text-ink"
                >
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(INDUSTRIES.length).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndustry.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="border border-t-0 border-line bg-surface p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium md:text-3xl">
                      {activeIndustry.name}
                    </h3>
                    <span className="font-grotesk text-xs font-bold tracking-[0.24em] text-accent uppercase">
                      {activeIndustry.slug.replace(/-/g, " ")}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">
                    {activeIndustry.blurb}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {activeIndustry.focus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </div>

        {/* ---- Asymmetric image strip ---- */}
        <div className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12 md:gap-8">
          {STRIP.map(({ industry, ratio, className }) => (
            <figure key={industry.slug} className={className}>
              <Reveal>
                <LazyImage
                  src={media(industry.image)}
                  alt={`${industry.name} — ${industry.blurb}`}
                  ratio={ratio}
                  className="w-full"
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-display text-lg font-medium">
                    {industry.name}
                  </span>
                  <span className="font-grotesk text-[10px] tracking-[0.24em] text-faint uppercase">
                    {industry.focus[0]}
                  </span>
                </figcaption>
              </Reveal>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
