import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GhostButton, PrimaryButton } from "../ui";
import { hasMedia, media } from "../../data/media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADLINE_WORDS: { text: string; accent?: boolean; underline?: boolean }[] = [
  { text: "Every" },
  { text: "Language.", underline: true },
  { text: "A" },
  { text: "World" },
  { text: "of" },
  { text: "Possibilities.", accent: true },
];

const FLOATING_LABELS = [
  { text: "हिन्दी", className: "right-[7%] top-[19%]", delay: "0s" },
  { text: "日本語", className: "right-[21%] top-[35%]", delay: "1.4s" },
  { text: "العربية", className: "right-[6%] top-[51%]", delay: "0.7s" },
  { text: "Español", className: "right-[17%] top-[65%]", delay: "2s" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  /* Respect reduced motion + swap the video for the poster on small screens. */
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeQuery = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setIsSmallScreen(sizeQuery.matches);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    sizeQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      sizeQuery.removeEventListener("change", sync);
    };
  }, []);

  const showVideo = hasMedia("heroVideo") && !reducedMotion && !isSmallScreen;
  const poster = media("heroPoster");

  /* Pause the video while the hero is off-viewport. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="grain relative min-h-svh overflow-hidden bg-[#080D16] text-white"
    >
      {/* ---- Cinematic background: video, or poster when video is unavailable ---- */}
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
        >
          <source src={media("heroVideo")} type="video/mp4" />
          {hasMedia("heroVideoWebm") && (
            <source src={media("heroVideoWebm")} type="video/webm" />
          )}
        </video>
      ) : (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Readability: dark wash + bottom gradient into the section below. */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#080D16] via-[#080D16]/35 to-transparent"
        aria-hidden="true"
      />

      {/* ---- Huge slow-moving outline typography, barely there ---- */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[11%] overflow-hidden opacity-[0.14]"
        aria-hidden="true"
      >
        <div className="text-outline-hero flex w-max animate-marquee-slow font-display text-[16vw] leading-none whitespace-nowrap">
          <span className="pr-10">LANGUAGE&nbsp;·&nbsp;भाषा&nbsp;·&nbsp;言語&nbsp;·&nbsp;</span>
          <span className="pr-10">LANGUAGE&nbsp;·&nbsp;भाषा&nbsp;·&nbsp;言語&nbsp;·&nbsp;</span>
        </div>
      </div>

      {/* ---- Floating language labels (desktop only) ---- */}
      {FLOATING_LABELS.map((label) => (
        <span
          key={label.text}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 hidden animate-float-y font-display text-2xl italic text-white/55 lg:block ${label.className}`}
          style={{ animationDelay: label.delay }}
        >
          {label.text}
        </span>
      ))}

      {/* Vertical office line, far right edge. */}
      <span
        aria-hidden="true"
        className="vertical-label pointer-events-none absolute top-1/2 right-5 z-10 hidden -translate-y-1/2 font-grotesk text-[10px] tracking-[0.45em] text-white/45 uppercase xl:block"
      >
        New Delhi — Noida — Mumbai
      </span>

      {/* ---- Content: bottom-left, editorial ---- */}
      <div className="relative z-10 flex min-h-svh flex-col">
        <div className="flex flex-1 items-end">
          <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-10 px-5 pt-32 pb-10 md:px-10 md:pb-14">
            <div className="min-w-0">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="mb-6 flex items-center gap-4"
              >
                <span className="h-px w-12 bg-[#55D6C2]" aria-hidden="true" />
                <p className="font-grotesk text-[11px] font-bold tracking-[0.32em] text-white/80 uppercase md:text-xs">
                  Global Language &amp; Communication Solutions
                </p>
              </motion.div>

              <h1 className="font-display text-[clamp(2.9rem,8.2vw,7rem)] leading-[0.98] font-medium tracking-[-0.01em]">
                {HEADLINE_WORDS.map((word, i) => (
                  <span
                    key={word.text}
                    aria-hidden="true"
                    className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom"
                  >
                    <motion.span
                      className={`relative inline-block will-change-transform ${
                        word.accent ? "text-[#55D6C2] italic" : ""
                      }`}
                      initial={reducedMotion ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.09, ease: EASE }}
                    >
                      {word.text}
                      {word.underline && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute -bottom-[0.02em] left-0 h-[0.05em] w-full origin-left bg-[#55D6C2]"
                          initial={reducedMotion ? false : { scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
                        />
                      )}
                      {i < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  </span>
                ))}
                <span className="sr-only">Every Language. A World of Possibilities.</span>
              </h1>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
                className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
              >
                Connecting people, businesses and ideas through the power of
                professional translation and localization.
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: EASE }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <PrimaryButton to="/quote">
                  Start Your Project
                  <span aria-hidden="true">→</span>
                </PrimaryButton>
                <GhostButton to="/#services" dark>
                  Discover Our Expertise
                </GhostButton>
              </motion.div>
            </div>

            {/* Animated scroll indicator. */}
            <motion.a
              href="#about"
              aria-label="Scroll to the About section"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="hidden shrink-0 flex-col items-center gap-3 text-white/60 transition-colors hover:text-white lg:flex"
            >
              <span className="font-grotesk text-[10px] tracking-[0.35em] uppercase">
                Scroll
              </span>
              <span className="flex h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
                <span className="h-2 w-1 animate-scroll-dot rounded-full bg-white" />
              </span>
            </motion.a>
          </div>
        </div>

        {/* ---- Bottom strip ---- */}
        <div className="border-t border-white/15">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 font-grotesk text-[11px] tracking-[0.22em] text-white/70 uppercase md:px-10 md:text-xs">
            <span>ISO 17100:2015</span>
            <span aria-hidden="true" className="text-[#55D6C2]">
              ·
            </span>
            <span>200+ languages</span>
            <span aria-hidden="true" className="text-[#55D6C2]">
              ·
            </span>
            <span>17+ years</span>
            <span className="ml-auto hidden text-white/40 md:inline">
              New Delhi · Noida · Mumbai
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
