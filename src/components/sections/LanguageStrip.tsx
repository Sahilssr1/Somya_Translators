/**
 * LanguageStrip — the huge slow-moving outline marquee ("LANGUAGE · भाषा ·
 * 言語"), placed between the hero and the "Who we are" intro section.
 * Theme-aware: the outline uses the current theme's ink color.
 */
export default function LanguageStrip() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-line bg-bg py-5 md:py-6"
    >
      <div className="text-outline-strip flex w-max animate-marquee-slow font-display text-[15vw] leading-none whitespace-nowrap md:text-[10vw]">
        <span className="pr-10">
          LANGUAGE&nbsp;·&nbsp;भाषा&nbsp;·&nbsp;言語&nbsp;·&nbsp;
        </span>
        <span className="pr-10">
          LANGUAGE&nbsp;·&nbsp;भाषा&nbsp;·&nbsp;言語&nbsp;·&nbsp;
        </span>
      </div>
    </div>
  );
}
