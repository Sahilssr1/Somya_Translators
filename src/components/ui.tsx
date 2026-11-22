import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";

/* ------------------------- Scroll reveal wrapper ------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------- Word-by-word reveal -------------------------- */

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  accentWords = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  accentWords?: string[];
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block will-change-transform ${
              accentWords.includes(word.replace(/[.,]/g, ""))
                ? "text-accent italic font-display font-normal"
                : ""
            }`}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* --------------------------- Section eyebrow ---------------------------- */

export function SectionTag({
  label,
  light = false,
}: {
  label: string;
  light?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={`flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase ${
          light ? "text-hero-muted" : "text-muted"
        }`}
      >
        <span className={`h-px w-10 ${light ? "bg-white/40" : "bg-line-strong"}`} aria-hidden="true" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

/* ------------------------------ Count-up -------------------------------- */

export function CountUp({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* --------------------------- Magnetic button ---------------------------- */

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ CTA buttons ----------------------------- */

const btnBase =
  "group inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4";

export function PrimaryButton({
  to,
  children,
  className = "",
  onClick,
}: {
  to?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cls = `${btnBase} bg-accent text-on-accent hover:brightness-110 px-7 py-3.5 text-sm shadow-lift ${className}`;
  if (to) {
    return (
      <Magnetic>
        <Link to={to} className={cls} onClick={onClick}>
          {children}
        </Link>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <button type="button" className={cls} onClick={onClick}>
        {children}
      </button>
    </Magnetic>
  );
}

export function GhostButton({
  to,
  children,
  className = "",
  dark = false,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  onClick?: () => void;
}) {
  const cls = `${btnBase} px-7 py-3.5 text-sm border ${
    dark
      ? "border-white/30 text-white hover:bg-white hover:text-[#080D16]"
      : "border-line-strong text-ink hover:bg-ink hover:text-bg"
  } ${className}`;
  if (to) {
    return (
      <Magnetic>
        <Link to={to} className={cls} onClick={onClick}>
          {children}
        </Link>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <button type="button" className={cls} onClick={onClick}>
        {children}
      </button>
    </Magnetic>
  );
}

/* ------------------------- Lazy image with reveal ----------------------- */

export function LazyImage({
  src,
  alt,
  className,
  style,
  eager = false,
  ratio,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
  ratio?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-surface-2 ${className ?? ""}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.06]"
        }`}
      />
    </div>
  );
}

/* --------------------------- Section separator -------------------------- */

export function Separator({ label }: { label?: string }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 md:px-10" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      {label && (
        <span className="font-grotesk text-[10px] tracking-[0.35em] uppercase text-faint">
          {label}
        </span>
      )}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
