import { Link } from "react-router-dom";
import { CountUp, LazyImage, Reveal, SectionTag, WordReveal } from "../ui";
import { COMPANY, STATS } from "../../data/content";
import { media } from "../../data/media";

const statText = (label: string) => {
  const stat = STATS.find((s) => s.label === label);
  return stat ? `${stat.value.toLocaleString("en-IN")}${stat.suffix}` : "";
};

export default function Intro() {
  return (
    <section id="about" aria-label="About Somya Translators" className="bg-bg text-ink">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag index="01" label="Who we are" />

        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.1rem,5vw,4.25rem)] leading-[1.05] font-medium tracking-[-0.01em]">
          <WordReveal
            text="Language is more than words. It is connection."
            accentWords={["connection"]}
          />
        </h2>

        {/* ---- Asymmetric editorial grid: photographs left, copy right ---- */}
        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Photographic composition */}
          <div className="relative lg:col-span-5">
            <Reveal>
              <LazyImage
                src={media("introMain")}
                alt="A Somya Translators linguist at work, reviewing a document"
                ratio="4/5"
                className="w-full md:w-[86%]"
              />
            </Reveal>
            <Reveal
              delay={0.15}
              className="absolute right-0 -bottom-8 w-[46%] md:w-[42%]"
            >
              <LazyImage
                src={media("introSecondary")}
                alt="Close-up of translated text in multiple scripts"
                ratio="1/1"
                className="w-full shadow-lift"
              />
            </Reveal>
            {/* Rotated caption chip */}
            <Reveal
              delay={0.25}
              className="absolute -top-4 right-4 rotate-3 md:right-10"
            >
              <span className="inline-block bg-accent px-4 py-2 font-grotesk text-[10px] font-bold tracking-[0.28em] text-on-accent uppercase shadow-lift">
                Delhi · Noida · Mumbai
              </span>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                {COMPANY.name} is a Delhi-headquartered language services
                company with {COMPANY.established} behind it. We help
                businesses, institutions and individuals speak clearly across
                borders — in {statText("Languages supported")} languages, with{" "}
                {statText("Professional linguists")} native linguists and{" "}
                {statText("Projects completed")} projects delivered.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-muted">
                Every project follows the {COMPANY.certification} process:
                translation, editing and proofreading by separate native
                specialists, so meaning, tone and terminology survive the
                journey between languages. From a single birth certificate to
                a full product launch, the standard is the same.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 border-l-2 border-accent pl-5 font-display text-xl leading-snug italic md:text-2xl">
                We don&apos;t translate words. We carry meaning across —
                intact.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <Link
                to="/#quality"
                className="group mt-8 inline-flex items-center gap-2 font-grotesk text-sm font-bold tracking-[0.14em] text-accent uppercase"
              >
                <span className="link-underline">Our story</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>

            {/* Wide tertiary image anchoring the copy column */}
            <Reveal delay={0.4} className="mt-12">
              <LazyImage
                src={media("introTertiary")}
                alt="Somya Translators team collaborating on a localisation project"
                ratio="16/7"
                className="w-full"
              />
              <p className="mt-3 font-grotesk text-[11px] tracking-[0.22em] text-faint uppercase">
                {statText("Professional linguists")} native linguists, vetted
                &amp; domain-tested
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---- Stats band: hairline-separated figures, not cards ---- */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={
                    i > 0
                      ? "border-t border-line pt-10 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-8"
                      : "lg:pl-0"
                  }
                >
                  <p className="font-display text-5xl font-medium tracking-tight md:text-6xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 font-grotesk text-sm font-bold tracking-[0.08em] uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{stat.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-xs text-faint">
              Figures are configurable demo values — update in
              src/data/content.ts.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
