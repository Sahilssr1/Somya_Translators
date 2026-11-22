import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COMPANY, INDUSTRIES, NAV_LINKS, REGIONS, SERVICES } from "../data/content";
import { media } from "../data/media";
import { useTheme } from "../theme/ThemeContext";

type MegaKind = "services" | "industries" | "languages" | null;

function Wordmark({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-baseline gap-2" aria-label="Somya Translators — home">
      <span
        className={`font-grotesk text-[22px] font-bold tracking-[0.18em] leading-none ${
          light ? "text-white" : "text-ink"
        }`}
      >
        SOMYA
      </span>
      <span
        className={`hidden text-[10px] font-bold tracking-[0.32em] sm:block ${
          light ? "text-white/60" : "text-muted"
        }`}
      >
        TRANSLATORS
      </span>
      <span className="mb-0.5 inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
    </Link>
  );
}

function ThemeToggle({ light }: { light?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
        light
          ? "border-white/25 text-white hover:bg-white/10"
          : "border-line-strong text-ink hover:bg-surface-2"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -60, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 60, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function MegaPanel({ kind, onClose }: { kind: Exclude<MegaKind, null>; onClose: () => void }) {
  const navigate = useNavigate();

  const go = (hash: string) => {
    onClose();
    navigate(`/${hash}`);
  };

  const preview =
    kind === "services"
      ? media("svcTranslation")
      : kind === "industries"
        ? media("indLegal")
        : media("introMain");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lift"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-10 py-10">
        {/* Visual preview */}
        <div className="col-span-3">
          <div className="relative h-44 overflow-hidden">
            <img src={preview} alt="" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-3 left-3 font-display text-lg italic text-white">
              {kind === "services" && "Sixteen ways to be understood."}
              {kind === "industries" && "Sixteen sectors, one standard."}
              {kind === "languages" && "200+ languages. Five continents."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => go(`#${kind}`)}
            className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
          >
            Explore all {kind} <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Links */}
        <div className="col-span-9">
          {kind === "services" && (
            <div className="grid grid-cols-4 gap-x-6 gap-y-1">
              {(["Translation", "Localization", "Multimedia", "Specialist"] as const).map((cat) => (
                <div key={cat}>
                  <p className="mb-3 text-[10px] font-bold tracking-[0.28em] text-faint uppercase">
                    {cat}
                  </p>
                  <ul className="space-y-2.5">
                    {SERVICES.filter((s) => s.category === cat).map((s) => (
                      <li key={s.slug}>
                        <button
                          type="button"
                          onClick={() => go("#services")}
                          className="link-underline text-left text-[15px] font-medium text-ink"
                        >
                          {s.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {kind === "industries" && (
            <div className="grid grid-cols-4 gap-x-6 gap-y-1">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.slug}
                  type="button"
                  onClick={() => go("#industries")}
                  className="group mb-3 flex items-baseline gap-2 text-left"
                >
                  <span className="font-grotesk text-[11px] text-accent">
                    {String(INDUSTRIES.indexOf(ind) + 1).padStart(2, "0")}
                  </span>
                  <span className="link-underline text-[15px] font-medium text-ink">{ind.name}</span>
                </button>
              ))}
            </div>
          )}
          {kind === "languages" && (
            <div className="grid grid-cols-5 gap-6">
              {REGIONS.map((region) => (
                <div key={region.id}>
                  <p className="mb-3 text-[10px] font-bold tracking-[0.28em] text-faint uppercase">
                    {region.label}
                  </p>
                  <ul className="space-y-2.5">
                    {region.languages.slice(0, 5).map((lang) => (
                      <li key={lang.name}>
                        <button
                          type="button"
                          onClick={() => go("#languages")}
                          className="link-underline text-left text-[15px] font-medium text-ink"
                        >
                          {lang.name}{" "}
                          <span className="text-muted">{lang.native}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function OverlayNav({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const go = (hash: string) => {
    onClose();
    navigate(`/${hash}`);
  };

  const accordions = [
    { id: "services", label: "Services", items: SERVICES.map((s) => s.title) },
    { id: "industries", label: "Industries", items: INDUSTRIES.map((i) => i.name) },
    { id: "languages", label: "Languages", items: REGIONS.map((r) => r.label) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[#080D16] text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <Wordmark light />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center px-5 py-8 md:px-10">
        <ul className="space-y-1">
          {accordions.map((acc, i) => (
            <li key={acc.id} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setOpenSection(openSection === acc.id ? null : acc.id)}
                aria-expanded={openSection === acc.id}
                className="flex w-full items-baseline gap-4 py-4 text-left"
              >
                <span className="font-grotesk text-xs text-[#55D6C2]">0{i + 1}</span>
                <span className="font-display text-4xl font-light md:text-5xl">{acc.label}</span>
                <span
                  className={`ml-auto text-2xl text-white/50 transition-transform duration-300 ${
                    openSection === acc.id ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openSection === acc.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 pb-6 pl-8 sm:grid-cols-3 md:grid-cols-4">
                      {acc.items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => go(`#${acc.id}`)}
                          className="py-1 text-left text-sm text-white/70 transition-colors hover:text-[#55D6C2]"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
          {[
            { label: "About", hash: "#about", n: "04" },
            { label: "Insights", hash: "#insights", n: "05" },
            { label: "Contact", hash: "#contact", n: "06" },
          ].map((item) => (
            <li key={item.label} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => go(item.hash)}
                className="flex w-full items-baseline gap-4 py-4 text-left"
              >
                <span className="font-grotesk text-xs text-[#55D6C2]">{item.n}</span>
                <span className="font-display text-4xl font-light md:text-5xl">{item.label}</span>
                <ArrowUpRight className="ml-auto text-white/50" size={22} />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/quote"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-[#55D6C2] px-7 py-3.5 text-sm font-bold text-[#06231f]"
          >
            Get a Quote <ArrowUpRight size={16} />
          </Link>
          <span className="text-sm text-white/60">
            {COMPANY.email} · {COMPANY.phones[1]}
          </span>
          <span className="ml-auto text-xs tracking-[0.25em] text-white/40 uppercase">
            Theme: {theme}
          </span>
        </div>
      </nav>
    </motion.div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKind>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(null);
    setOverlayOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  const overHero = location.pathname === "/" && !scrolled;
  const light = overHero;

  const openMega = (kind: MegaKind) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(kind);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 140);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-overlay shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <Wordmark light={light} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                onMouseEnter={() => link.mega && openMega(link.mega)}
                onMouseLeave={() => link.mega && scheduleClose()}
              >
                {link.mega ? (
                  <button
                    type="button"
                    onClick={() => setMega(mega === link.mega ? null : link.mega ?? null)}
                    aria-expanded={mega === link.mega}
                    className={`link-underline text-[13px] font-semibold tracking-wide ${
                      light ? "text-white/85" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`link-underline text-[13px] font-semibold tracking-wide ${
                      light ? "text-white/85" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle light={light} />
            <Link
              to="/quote"
              className={`hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors sm:inline-flex ${
                light
                  ? "bg-white text-[#080D16] hover:bg-[#55D6C2]"
                  : "bg-ink text-bg hover:bg-accent hover:text-on-accent"
              }`}
            >
              Get a Quote <ArrowUpRight size={14} />
            </Link>
            <button
              type="button"
              onClick={() => setOverlayOpen(true)}
              aria-label="Open full navigation"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                light
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-line-strong text-ink hover:bg-surface-2"
              }`}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && <MegaPanel kind={mega} onClose={() => setMega(null)} />}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {overlayOpen && <OverlayNav onClose={() => setOverlayOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
