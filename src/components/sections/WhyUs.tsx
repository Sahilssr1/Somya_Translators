import { motion } from "framer-motion";
import { WHY_US } from "../../data/content";
import { Reveal, SectionTag, WordReveal } from "../ui";

export default function WhyUs() {
  return (
    <section id="why-us" aria-label="Why Somya" className="bg-bg text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag label="Why Somya" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
            <WordReveal text="Reasons, not promises." accentWords={["promises."]} />
          </h2>
          <Reveal delay={0.15} className="shrink-0">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Eight things that are true about how we work — verifiable in every
              project we deliver.
            </p>
          </Reveal>
        </div>

        {/* ---- Editorial numbered list ---- */}
        <ol className="mt-16 border-t border-line">
          {WHY_US.map((item, i) => {
            const odd = i % 2 === 1;
            return (
              <li key={item.title} className="group relative border-b border-line">
                {/* Highlight bar */}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[2px] bg-accent"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <Reveal
                  delay={0.05}
                  className={`transition-colors duration-500 group-hover:bg-accent-soft ${
                    odd ? "lg:pl-24 xl:pl-40" : ""
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 px-2 py-8 md:grid-cols-[110px_1fr_1fr] md:gap-x-10 md:py-10 lg:grid-cols-[150px_1fr_1fr]">
                    <span
                      aria-hidden="true"
                      className="text-outline font-display text-5xl leading-none font-medium transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--accent)] md:text-7xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl leading-tight font-medium text-balance md:text-3xl lg:text-4xl">
                      {item.title}
                    </h3>
                    <p className="col-span-2 max-w-md text-sm leading-relaxed text-muted md:col-span-1 md:justify-self-end md:text-right lg:text-base">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* ---- Quote strip ---- */}
        <Reveal className="mt-20">
          <figure className="border-y border-line-strong py-12 text-center md:py-16">
            <blockquote className="mx-auto max-w-4xl font-display text-3xl leading-snug font-medium italic text-balance sm:text-4xl lg:text-5xl">
              “Accepted by embassies, courts{" "}
              <span className="text-accent not-italic">&amp;</span> government bodies.”
            </blockquote>
            <figcaption className="mt-6 font-grotesk text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
              Certified translations · ISO 17100:2015
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
