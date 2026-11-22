import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { REGIONS } from "../../data/content";
import { WORLD_MAP_PATHS, type MapRegionId } from "../../data/worldMap";
import { Reveal, SectionTag, WordReveal } from "../ui";

/* Hotspot positions — real geography on the 1000×500 equirectangular map. */
const HOTSPOTS: Record<string, { left: string; top: string }> = {
  india: { left: "71.4%", top: "34.4%" },
  asia: { left: "79.2%", top: "30.6%" },
  europe: { left: "54.2%", top: "20%" },
  africa: { left: "55.6%", top: "47.2%" },
  americas: { left: "22.2%", top: "27.8%" },
};

/* Hotspot points in SVG coordinates, for the connection arcs from India. */
const POINTS: Record<MapRegionId, [number, number]> = {
  india: [714, 172],
  asia: [792, 153],
  europe: [542, 100],
  africa: [556, 236],
  americas: [222, 139],
};

const REGION_ORDER: MapRegionId[] = ["americas", "europe", "africa", "asia", "india"];

/** Real world map — Natural Earth 110m country outlines, grouped by region. */
function WorldMap({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const [indiaX, indiaY] = POINTS.india;
  return (
    <svg
      viewBox="0 0 1000 500"
      className="h-full w-full"
      role="img"
      aria-label="World map showing the regions Somya Translators serves — select a region to see its languages"
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#FF5F57" stopOpacity="0.10" />
          <stop offset="60%" stopColor="#FF5F57" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#FF5F57" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5F57" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF5F57" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="500" fill="url(#mapGlow)" />

      {/* Graticule */}
      {[100, 200, 300, 400].map((y) => (
        <line key={y} x1="0" y1={y} x2="1000" y2={y} className="stroke-white/[0.05]" strokeDasharray="2 8" />
      ))}
      {[200, 400, 600, 800].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="500" className="stroke-white/[0.05]" strokeDasharray="2 8" />
      ))}
      {/* Equator */}
      <line x1="0" y1="250" x2="1000" y2="250" className="stroke-white/[0.08]" strokeDasharray="1 6" />
      <text x="8" y="244" className="fill-white/30 font-grotesk" fontSize="9" letterSpacing="2">
        EQUATOR
      </text>

      {/* India halo */}
      <circle cx={indiaX} cy={indiaY} r="52" fill="url(#indiaGlow)" />

      {/* Land — one path per region, clickable, active region glows */}
      {REGION_ORDER.map((id) => {
        const isActive = activeId === id;
        return (
          <motion.path
            key={id}
            d={WORLD_MAP_PATHS[id]}
            strokeWidth={isActive ? 2 : 1.5}
            className="cursor-pointer"
            onClick={() => onSelect(id)}
            initial={false}
            animate={{
              fill: isActive ? "rgba(255, 95, 87, 0.32)" : "rgba(255, 255, 255, 0.12)",
              stroke: isActive ? "#FF5F57" : "rgba(255, 255, 255, 0.55)",
            }}
            whileHover={{ fill: "rgba(255, 95, 87, 0.22)" }}
            transition={{ duration: 0.5 }}
          >
            <title>{REGIONS.find((r) => r.id === id)?.label}</title>
          </motion.path>
        );
      })}

      {/* Connection arcs flowing out of India, drawn over the land */}
      {(Object.keys(POINTS) as MapRegionId[])
        .filter((id) => id !== "india")
        .map((id) => {
          const [x, y] = POINTS[id];
          const mx = (indiaX + x) / 2;
          const my = Math.min(indiaY, y) - 42;
          const isActive = activeId === id;
          return (
            <path
              key={id}
              d={`M ${indiaX} ${indiaY} Q ${mx} ${my} ${x} ${y}`}
              fill="none"
              strokeWidth={isActive ? 1.4 : 1}
              strokeDasharray="4 7"
              className={`animate-dash-flow pointer-events-none transition-opacity duration-500 ${
                isActive ? "stroke-[#FF5F57] opacity-90" : "stroke-white/25 opacity-50"
              }`}
            />
          );
        })}
    </svg>
  );
}

export default function Languages() {
  const [activeId, setActiveId] = useState(REGIONS[0].id);
  const active = REGIONS.find((r) => r.id === activeId) ?? REGIONS[0];

  return (
    <section id="languages" aria-label="Languages" className="relative overflow-hidden bg-[#080D16] text-white">
      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag label="Languages" light />

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
            <WorldMap activeId={activeId} onSelect={setActiveId} />

            {/* Map caption */}
            <div aria-hidden="true" className="pointer-events-none absolute top-4 left-5 hidden items-center gap-3 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF5F57]" />
              <span className="font-grotesk text-[10px] font-semibold tracking-[0.28em] text-white/50 uppercase">
                Global coverage · 176 countries · Click a region
              </span>
            </div>

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
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F57]"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-pulse-ring rounded-full border border-[#FF5F57] [transform-box:fill-box] [transform-origin:center]"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#FF5F57] shadow-[0_0_18px_2px_rgba(255, 95, 87, 0.7)]"
                          : "bg-white/70 group-hover:bg-[#FF5F57] group-hover:scale-125"
                      }`}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-full border px-2.5 py-1 font-grotesk text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-all duration-300 ${
                      isActive
                        ? "border-[#FF5F57]/50 bg-[#080D16] text-[#FF5F57] opacity-100"
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
                    ? "border-[#FF5F57] bg-[#FF5F57] text-[#ffffff]"
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
                    <span className="font-grotesk text-[11px] text-[#FF5F57]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-medium md:text-2xl">{lang.name}</span>
                  </div>
                  <div className="text-right md:text-left">
                    <span className="font-display text-2xl text-[#FF5F57] md:text-3xl" lang="und">
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
