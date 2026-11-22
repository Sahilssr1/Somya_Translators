import { motion } from "framer-motion";
import { CERTIFICATIONS, QUALITY_STEPS } from "../../data/content";
import { media } from "../../data/media";
import { LazyImage, Reveal, SectionTag, WordReveal } from "../ui";

export default function Quality() {
  return (
    <section id="quality" aria-label="Quality and trust" className="relative overflow-hidden bg-[#080D16] text-white">
      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag index="06" label="Quality & trust" light />

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---- Sticky left column ---- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
              <WordReveal text="Quality is a process, not a promise." />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#A6B0C0]">
                Every project follows the same five-stage discipline — the TEP
                model behind ISO 17100:2015. No shortcuts, no exceptions, no
                single pair of eyes.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <LazyImage
                src={media("qualityImage")}
                alt="A Somya Translators linguist reviewing a translation with care"
                ratio="4 / 3"
                className="rounded-2xl"
              />
              <p className="mt-3 font-grotesk text-[11px] tracking-[0.2em] text-[#A6B0C0] uppercase">
                Three specialists touch every word before it reaches you
              </p>
            </Reveal>
          </div>

          {/* ---- Vertical timeline ---- */}
          <ol className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[19px] w-px bg-white/15 md:left-[23px]"
            />
            {QUALITY_STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-6 pb-12 last:pb-0 md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF5F57]/50 bg-[#080D16] font-grotesk text-xs font-bold text-[#FF5F57] md:h-12 md:w-12 md:text-sm"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1 md:pt-2">
                  <h3 className="font-display text-2xl font-medium md:text-3xl">{step.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#A6B0C0] md:text-base">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ---- Certifications band ---- */}
        <div className="mt-24 border-t border-white/10 pt-14 md:mt-32">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#A6B0C0] uppercase">
                Certifications &amp; standards
              </h3>
              <p className="font-display text-lg text-[#FF5F57] italic md:text-xl">
                ISO 17100:2015 — certified translation processes.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.08}>
                <div
                  className={`flex flex-col gap-3 border-b border-white/10 py-8 first:border-t md:flex-row md:items-baseline md:justify-between md:gap-10 ${
                    cert.verified ? "" : "opacity-70"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <h4 className="font-display text-2xl font-medium md:text-3xl lg:text-4xl">
                      {cert.name}
                    </h4>
                    {cert.verified ? (
                      <span className="rounded-full border border-[#FF5F57]/60 bg-[#FF5F57]/10 px-3 py-1 font-grotesk text-[10px] font-bold tracking-[0.16em] text-[#FF5F57] uppercase">
                        Verified credential
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/25 bg-white/[0.04] px-3 py-1 font-grotesk text-[10px] font-bold tracking-[0.16em] text-[#A6B0C0] uppercase">
                        Demonstration placeholder
                      </span>
                    )}
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-[#A6B0C0]">{cert.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- Security / confidentiality note ---- */}
          <Reveal className="mt-14">
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h4 className="font-display text-xl font-medium md:text-2xl">
                  Confidential by design
                </h4>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A6B0C0]">
                  NDA-bound linguists, encrypted file handling and strict access
                  control — only the team working on your project ever sees your
                  documents. We are happy to sign your NDA before you share
                  anything.
                </p>
              </div>
              <p className="shrink-0 font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#FF5F57] uppercase">
                NDA · Encrypted · Access-controlled
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
