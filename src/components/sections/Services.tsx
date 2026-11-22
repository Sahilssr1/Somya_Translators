import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal, SectionTag } from "../ui";
import { SERVICES } from "../../data/content";
import { media } from "../../data/media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Always-dark section: literal dark palette, not theme tokens. */

function ServiceImage({ index, className }: { index: number; className: string }) {
  const service = SERVICES[index];
  return (
    <div className={`relative overflow-hidden bg-[#101827] ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={service.slug}
          src={media(service.image)}
          alt={service.title}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 bg-[#080D16]/80 px-3 py-1.5 font-grotesk text-[10px] font-bold tracking-[0.28em] text-[#55D6C2] uppercase"
      >
        {String(index + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const activeService = SERVICES[active];

  const toggle = (index: number) => {
    setActive(index);
    setExpanded((current) => (current === index ? null : index));
  };

  return (
    <section
      id="services"
      aria-label="Services"
      className="overflow-hidden bg-[#080D16] text-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag index="02" label="What we do" light />

        <Reveal>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.1rem,5vw,4.25rem)] leading-[1.05] font-medium tracking-[-0.01em]">
            Sixteen ways to be{" "}
            <span className="text-[#55D6C2] italic">understood.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl leading-relaxed text-[#A6B0C0]">
            Translation, localization and multimedia — sixteen services, one
            standard. Hover the list to preview each one; select a service to
            see what it delivers.
          </p>
        </Reveal>

        {/* Mobile image panel (above the list) */}
        <div className="mt-12 lg:hidden">
          <ServiceImage index={active} className="aspect-[16/9] w-full" />
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* ---- Sticky visual panel (desktop) ---- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 self-start">
              <ServiceImage index={active} className="aspect-[4/3] w-full" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-6"
                >
                  <p className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#55D6C2] uppercase">
                    {activeService.category}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-snug">
                    {activeService.tagline}
                  </p>
                  <p className="mt-3 leading-relaxed text-[#A6B0C0]">
                    {activeService.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Oversized numbered list ---- */}
          <div className="lg:col-span-7">
            <ul className="border-b border-white/10">
              {SERVICES.map((service, i) => {
                const isActive = i === active;
                const isExpanded = expanded === i;
                return (
                  <li key={service.slug} className="border-t border-white/10">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => toggle(i)}
                      aria-expanded={isExpanded}
                      aria-controls={`service-details-${service.slug}`}
                      className="group flex w-full items-baseline gap-4 py-5 text-left md:gap-6 md:py-6"
                    >
                      <span
                        className={`font-grotesk text-xs font-bold transition-colors duration-300 md:text-sm ${
                          isActive ? "text-[#55D6C2]" : "text-[#6B7688]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-tight font-medium transition-all duration-300 ${
                          isActive
                            ? "translate-x-1 text-white md:translate-x-2"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span className="hidden shrink-0 font-grotesk text-[10px] font-bold tracking-[0.24em] text-[#6B7688] uppercase sm:block">
                        {service.category}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 text-xl transition-transform duration-300 ${
                          isExpanded
                            ? "rotate-90 text-[#55D6C2]"
                            : "text-white/50 group-hover:translate-x-1 group-hover:text-[#55D6C2]"
                        }`}
                      >
                        →
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`service-details-${service.slug}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-8 md:pl-12">
                            <p className="max-w-xl leading-relaxed text-[#A6B0C0]">
                              {service.description}
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {service.deliverables.map((item) => (
                                <li
                                  key={item}
                                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-[#A6B0C0]"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <Link
                              to="/quote"
                              className="group/link mt-6 inline-flex items-center gap-2 font-grotesk text-sm font-bold tracking-[0.14em] text-[#55D6C2] uppercase"
                            >
                              <span className="link-underline">
                                Request this service
                              </span>
                              <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover/link:translate-x-1"
                              >
                                →
                              </span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Marquee strip of service names ---- */}
      <div
        className="overflow-hidden border-t border-white/10 py-6 md:py-8"
        aria-hidden="true"
      >
        <div className="text-outline-hero flex w-max animate-marquee font-display text-3xl whitespace-nowrap md:text-5xl">
          {[0, 1].map((copy) => (
            <span key={copy} className="pr-2">
              {SERVICES.map((service) => (
                <span key={service.slug}>
                  {service.title}
                  <span className="mx-6 text-[#55D6C2] md:mx-8">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
