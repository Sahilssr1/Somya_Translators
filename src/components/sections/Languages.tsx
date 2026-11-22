import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { REGIONS } from "../../data/content";
import { Reveal, SectionTag, WordReveal } from "../ui";

/* Hotspot positions (percentages over the 1000×500 map viewBox). */
const HOTSPOTS: Record<string, { left: string; top: string }> = {
  india: { left: "66%", top: "45%" },
  asia: { left: "76%", top: "28%" },
  europe: { left: "51.5%", top: "24%" },
  africa: { left: "52%", top: "50%" },
  americas: { left: "19%", top: "40%" },
};

/** Stylised world map — simplified continent blobs, not geographically precise. */
function WorldMap({ activeId }: { activeId: string }) {
  const land = "fill-white/[0.06] stroke-white/20";
  return (
    <svg
      viewBox="0 0 1000 500"
      className="h-full w-full"
      role="img"
      aria-label="Stylised world map showing the regions Somya Translators serves"
    >
      {/* Graticule */}
      {[100, 200, 300, 400].map((y) => (
        <line key={y} x1="0" y1={y} x2="1000" y2={y} className="stroke-white/[0.05]" strokeDasharray="2 8" />
      ))}
      {[200, 400, 600, 800].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="500" className="stroke-white/[0.05]" strokeDasharray="2 8" />
      ))}

      {/* North America */}
      <path
        className={land}
        strokeWidth="1.5"
        d="M 58 150 C 88 92, 168 68, 232 94 C 272 114, 282 162, 250 202 C 228 232, 198 238, 168 216 C 118 200, 58 202, 58 150 Z"
      />
      {/* South America */}
      <path
        className={land}
        strokeWidth="1.5"
        d="M 235 262 C 260 240, 302 250, 312 292 C 318 332, 292 382, 266 398 C 244 382, 224 330, 230 290 C 232 278, 232 270, 235 262 Z"
      />
      {/* Europe */}
      <path
        className={land}
        strokeWidth="1.5"
        d="M 470 110 C 490 84, 542 78, 562 104 C 578 126, 562 156, 530 162 C 500 166, 464 146, 470 110 Z"
      />
      {/* Africa */}
      <path
        className={land}
        strokeWidth="1.5"
        d="M 465 200 C 490 174, 546 168, 576 200 C 596 230, 582 286, 546 316 C 510 332, 478 300, 464 258 C 458 234, 458 216, 465 200 Z"
      />
      {/* Asia */}
      <path
        className={land}
        strokeWidth="1.5"
        d="M 590 90 C 660 58, 762 64, 832 100 C 872 126, 862 176, 810 206 C 758 236, 678 230, 628 200 C 594 176, 574 122, 590 90 Z"
      />
      {/* India — highlighted */}
      <motion.path
        strokeWidth="1.5"
        d="M 640 196 C 656 184, 676 190, 682 212 C 688 236, 676 262, 660 267 C 644 256, 634 226, 640 196 Z"
        className="stroke-[#55D6C2]"
        initial={false}
        animate={{
          fill: activeId === "india" ? "rgba(85, 214, 194, 0.45)" : "rgba(85, 214, 194, 0.18)",
        }}
        transition={{ duration: 0.5 }}
      />
      {/* Oceania */}
      <path
        className={land}
        strokeWidth="1.5"
        d="M 830 320 C 860 304, 906 310, 922 336 C 932 362, 900 382, 864 376 C 838 368, 818 346, 830 320 Z"
      />
    </svg>
  );
}

export default function Languages() {
  const [activeId, setActiveId] = useState(REGIONS[0].id);
  const active = REGIONS.find((r) => r.id === activeId) ?? REGIONS[0];

  return (
    <section id="languages" aria-label="Languages" className="relative overflow-hidden bg-[#080D16] text-white">
      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag index="04" label="Languages" light />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
            <WordReveal text="One world. Two hundred voices." />
          </h2>
          <Reveal delay={0.15} className="shrink-0">
            <p className="max-w-xs text-sm leading-relaxed text-[#A6B0C0]">
              200+ languages, 300+ language pairs — each one handled by a native
              linguist who lives in the culture, not just the dictionary.
            </p>
          </Reveal>
        </div>

        {/* ---- Interactive map ---- */}
        <Reveal className="mt-14">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
            <WorldMap activeId={activeId} />

            {/* Hotspot buttons */}
            {REGIONS.map((region) => {
              const pos = HOTSPOTS[region.id];
              const isActive = region.id === activeId;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(region.id)}
                  aria-pressed={isActive}
                  aria-label={`Show languages for ${region.label}`}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55D6C2]"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-pulse-ring rounded-full border border-[#55D6C2] [transform-box:fill-box] [transform-origin:center]"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#55D6C2] shadow-[0_0_18px_2px_rgba(85,214,194,0.7)]"
                          : "bg-white/70 group-hover:bg-[#55D6C2] group-hover:scale-125"
                      }`}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-full border px-2.5 py-1 font-grotesk text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-all duration-300 ${
                      isActive
                        ? "border-[#55D6C2]/50 bg-[#080D16] text-[#55D6C2] opacity-100"
                        : "border-white/10 bg-[#080D16]/80 text-white/80 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  >
                    {region.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- Region tabs ---- */}
        <div
          role="group"
          aria-label="Choose a region"
          className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1"
        >
          {REGIONS.map((region, i) => {
            const isActive = region.id === activeId;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveId(region.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-5 py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
                  isActive
                    ? "border-[#55D6C2] bg-[#55D6C2] text-[#06231F]"
                    : "border-white/15 text-white/80 hover:border-white/40 hover:text-white"
                }`}
              >
                <span className="mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                {region.label}
                <span className="ml-2 opacity-60">{region.languages.length}</span>
              </button>
            );
          })}
        </div>

        {/* ---- Selected region panel ---- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-3xl font-medium md:text-4xl">{active.label}</h3>
              <p className="max-w-xl text-sm leading-relaxed text-[#A6B0C0]">{active.blurb}</p>
            </div>

            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {active.languages.map((lang, i) => (
                <motion.li
                  key={lang.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-4 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,3fr)] md:py-5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-grotesk text-[11px] text-[#55D6C2]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-medium md:text-2xl">{lang.name}</span>
                  </div>
                  <div className="text-right md:text-left">
                    <span className="font-display text-2xl text-[#55D6C2] md:text-3xl" lang="und">
                      {lang.native}
                    </span>
                  </div>
                  <div className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-1 md:justify-end">
                    <span className="text-xs tracking-wide text-[#A6B0C0] uppercase">{lang.country}</span>
                    <span className="flex flex-wrap gap-1.5">
                      {lang.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white/75"
                        >
                          {cat}
                        </span>
                      ))}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
