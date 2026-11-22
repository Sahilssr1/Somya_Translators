import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { COMPANY, FAQS } from "../../data/content";
import { Reveal, SectionTag, WordReveal } from "../ui";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-label="Frequently asked questions" className="bg-surface text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* ---- Sticky left column ---- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTag label="Questions" />
            <h2 className="mt-8 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
              <WordReveal text="Asked, answered." accentWords={["answered."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
                The questions every client asks before their first project —
                pricing, timing, quality and confidentiality.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-10 border-t border-line pt-8 text-base leading-relaxed">
                Still curious?{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="link-underline font-semibold text-accent"
                >
                  Write to {COMPANY.email}
                </a>{" "}
                — a project manager replies within working hours.
              </p>
            </Reveal>
          </div>

          {/* ---- Accordion ---- */}
          <div>
            {FAQS.map((faq, i) => {
              const open = openIndex === i;
              const buttonId = `faq-button-${i}`;
              const panelId = `faq-panel-${i}`;
              return (
                <Reveal key={faq.q} delay={i * 0.04}>
                  <div className="border-b border-line first:border-t">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : i)}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                      >
                        <span
                          className={`font-display text-xl font-medium transition-colors duration-300 md:text-2xl ${
                            open ? "text-accent" : "group-hover:text-accent"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            open
                              ? "rotate-45 border-accent bg-accent text-on-accent"
                              : "border-line-strong text-ink group-hover:border-accent"
                          }`}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted md:text-base">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
