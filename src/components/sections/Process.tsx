import { motion } from "framer-motion";
import { PROCESS_STEPS } from "../../data/content";
import { PrimaryButton, Reveal, SectionTag, WordReveal } from "../ui";

export default function Process() {
  return (
    <section id="process" aria-label="How it works" className="bg-bg text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag index="07" label="How it works" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
            <WordReveal text="From brief to delivery in four moves." accentWords={["four"]} />
          </h2>
          <Reveal delay={0.15} className="shrink-0">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              No portals to learn, no tickets to chase — a project manager walks
              your work through each step.
            </p>
          </Reveal>
        </div>

        {/* ---- Journey ---- */}
        <div className="relative mt-16 md:mt-20">
          {/* Mobile vertical line */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong lg:hidden"
          />
          {/* Desktop horizontal line (animated) */}
          <div
            aria-hidden="true"
            className="absolute top-[7px] right-0 left-0 hidden h-px bg-line lg:block"
          >
            <motion.div
              className="h-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <ol className="no-scrollbar flex snap-x snap-mandatory gap-10 overflow-x-auto pb-2 md:gap-8 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-w-[78vw] snap-start pl-8 sm:min-w-[320px] lg:min-w-0 lg:pl-0 lg:pt-10"
              >
                {/* Step marker dot on the line */}
                <span
                  aria-hidden="true"
                  className="absolute top-[3px] left-0 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg lg:top-0"
                />
                <span
                  aria-hidden="true"
                  className="text-outline font-display text-7xl leading-none font-medium select-none md:text-8xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight font-medium text-balance md:text-[1.7rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{step.body}</p>
                <p className="mt-5 font-grotesk text-[11px] font-bold tracking-[0.24em] text-faint uppercase">
                  Step {String(i + 1).padStart(2, "0")} / 04
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ---- CTA ---- */}
        <Reveal className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-medium italic md:text-3xl">
            Step one takes two minutes.
          </p>
          <PrimaryButton to="/quote">Start step one →</PrimaryButton>
        </Reveal>
      </div>
    </section>
  );
}
