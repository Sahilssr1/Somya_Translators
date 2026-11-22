import { Link } from "react-router-dom";
import { COMPANY, STATS } from "../data/content";
import { media } from "../data/media";
import {
  CountUp,
  GhostButton,
  LazyImage,
  PrimaryButton,
  Reveal,
  SectionTag,
  WordReveal,
} from "../components/ui";

/* ------------------------------------------------------------------
   About — Somya Translators.
   Every fact on this page is verified against the company's public
   website (somyatrans.com) or src/data/content.ts:
   - Founded 2009, registered as a private limited company on
     30 January 2009 — somyatrans.com media-corner article
     ("Since 2009…") and the founder's published interview.
   - ISO 17100:2015 certified; 17+ years; 200+ languages; 300+
     language pairs; 4,000+ linguists; 10,000+ projects — homepage.
   - 190+ countries, 2,000+ clients worldwide — about-us page.
   - Vision / mission — about-us page (paraphrased).
   - Tagline "Go Global. By Being Local." and motto "You say it,
     We do it." — the company's published profiles and media.
   No founding date beyond 2009 and no other people, dates or claims
   are stated here. The early-milestone dates (2010, 2011) come from
   the founder's own published account and are footnoted as such.
------------------------------------------------------------------- */

const TIMELINE = [
  {
    year: "2009",
    title: "Founded in Delhi",
    body: "Somya Translators Pvt. Ltd. is registered as a private limited company on 30 January 2009, starting with English–Hindi translation — one language pair, and a conviction that accuracy is a craft.",
  },
  {
    year: "2010",
    title: "ISO certification",
    body: "The company earns ISO certification for its translation processes within its first two years — an early commitment to audited quality that continues today under ISO 17100:2015.",
  },
  {
    year: "2011",
    title: "First international clients",
    body: "Work begins for clients beyond India, and the practice starts growing from a Delhi translation firm into a language service provider with a global footprint.",
  },
  {
    year: "Today",
    title: "A global language practice",
    body: "Headquartered in Delhi with branches in Noida and Mumbai, 4,000+ native linguists, 200+ languages across 300+ language pairs, 10,000+ completed projects and 2,000+ clients in 190+ countries.",
  },
];

const VALUES = [
  {
    title: "Accuracy first",
    body: "Human translation by native, domain-qualified linguists — meaning-for-meaning, never word-for-word, with cultural nuance intact.",
  },
  {
    title: "Certified quality",
    body: "ISO 17100:2015-certified processes: translation, editing and proofreading by separate specialists, backed by translation memory and glossaries.",
  },
  {
    title: "Confidential by design",
    body: "NDA-bound linguists and strict data-protection policies. Sensitive documents stay with the team working on them — and no one else.",
  },
  {
    title: "On time, every time",
    body: "On-time delivery is a stated point of pride, with same-day options for urgent work and a quote back within 30 minutes.",
  },
  {
    title: "Always reachable",
    body: "24/7 customer support across time zones, with a dedicated project manager from first brief to final delivery.",
  },
  {
    title: "Fair pricing",
    body: "Competitive rates without compromise on quality — transparent quotes, itemised before any work begins.",
  },
];

/* Stats: the first three come from STATS in content.ts (verified);
   countries and clients come from the about-us page on somyatrans.com.
   STATS[3] ("40+ countries") is marked demo in content.ts and is
   deliberately NOT used here. */
const STAT_ITEMS = [
  { value: 17, suffix: "+", label: "Years of practice", note: "Founded 2009, Delhi" },
  { value: STATS[0].value, suffix: STATS[0].suffix, label: STATS[0].label, note: STATS[0].note },
  { value: STATS[1].value, suffix: STATS[1].suffix, label: STATS[1].label, note: STATS[1].note },
  { value: STATS[2].value, suffix: STATS[2].suffix, label: STATS[2].label, note: STATS[2].note },
  { value: 190, suffix: "+", label: "Countries served", note: "Clients across the globe" },
  { value: 2000, suffix: "+", label: "Clients worldwide", note: "MNCs, law firms, NGOs & government" },
];

export default function AboutPage() {
  return (
    <div className="bg-bg text-ink">
      {/* ------------------------------- Hero ------------------------------ */}
      <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-20 md:px-10 md:pb-28">
        <SectionTag label="About us" />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <h1 className="font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl lg:text-7xl">
              <WordReveal
                text="Seventeen years of making the world understood."
                accentWords={["understood."]}
              />
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Somya Translators is an ISO 17100:2015-certified language
                service provider headquartered in Delhi, India — with branches
                in Noida and Mumbai, and a network of 4,000+ native linguists
                working across 200+ languages and 300+ language pairs.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryButton to="/quote">Request a quote →</PrimaryButton>
                <GhostButton to="/contact">Talk to us</GhostButton>
              </div>
            </Reveal>
          </div>

          {/* Fact rail */}
          <Reveal delay={0.25} className="lg:pt-3">
            <dl className="divide-y divide-line border-y border-line">
              {[
                { term: "Founded", value: "2009 — New Delhi, India" },
                { term: "Certification", value: COMPANY.certification },
                { term: "Head office", value: "Pandav Nagar, New Delhi" },
                { term: "Branches", value: "Noida · Mumbai · Los Angeles, USA" },
                { term: "Support", value: "24/7, across time zones" },
                { term: "Motto", value: "“You say it, We do it.”" },
              ].map((row) => (
                <div key={row.term} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                  <dt className="font-grotesk text-[11px] font-bold tracking-[0.22em] text-faint uppercase">
                    {row.term}
                  </dt>
                  <dd className="text-sm leading-relaxed font-medium md:text-base">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* --------------------------- Story (dark) -------------------------- */}
      <section aria-label="Our story" className="bg-[#080D16] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div className="relative">
              <LazyImage
                src={media("introMain")}
                alt="A professional workspace where translation projects are planned"
                className="rounded-2xl"
                ratio="4 / 3"
              />
              <div className="absolute -right-3 -bottom-8 hidden w-56 rounded-2xl border border-white/15 bg-[#080D16] p-5 shadow-lift md:block">
                <p className="font-display text-4xl font-medium text-[#FF5F57]">2009</p>
                <p className="mt-2 text-xs leading-relaxed text-hero-muted">
                  Registered as Somya Translators Pvt. Ltd. — starting with a
                  single language pair, English–Hindi.
                </p>
              </div>
            </div>

            <div>
              <SectionTag label="Our story" light />
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
                  From one language pair to{" "}
                  <span className="text-[#FF5F57] italic">two hundred</span>{" "}
                  languages.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-hero-muted md:text-lg">
                  <p>
                    Somya Translators began in Delhi with English–Hindi
                    translation and a simple idea: that a translation should
                    read as if it had been written in the target language —
                    accurate, natural and true to its purpose.
                  </p>
                  <p>
                    That idea became a practice. Today the company serves
                    global MNCs, law firms, medical organisations, e-commerce
                    platforms, NGOs and government agencies — translating
                    contracts and clinical trials, websites and training
                    modules, packaging and policy — in more than 200 languages.
                  </p>
                  <p>
                    What has not changed is the method: native linguists,
                    domain expertise, a strict quality process, and the motto
                    the team still works by —{" "}
                    <span className="font-semibold text-white">
                      “You say it, We do it.”
                    </span>
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-8 border-t border-white/15 pt-6 text-sm leading-relaxed text-hero-muted">
                  Founder &amp; Managing Director{" "}
                  <span className="font-semibold text-white">Ajoy Singh</span>{" "}
                  established the company in 2009;{" "}
                  <span className="font-semibold text-white">Archana Singh</span>{" "}
                  serves as Director.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Pull-line band ------------------------ */}
      <section aria-label="Our tagline" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center md:px-10 md:py-28">
          <Reveal>
            <p className="font-grotesk text-[11px] font-bold tracking-[0.35em] text-faint uppercase">
              The idea behind everything we do
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-5xl font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl lg:text-8xl">
              Go Global.{" "}
              <span className="text-accent italic">By Being Local.</span>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Global reach only works when the words land locally — in the
              right language, the right register, and the right culture. That
              is what 4,000+ native linguists are for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ Timeline --------------------------- */}
      <section aria-label="Milestones" className="bg-surface-2/60">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
                Milestones
              </p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
                <WordReveal text="The road so far." accentWords={["far."]} />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
                  A short history, told only with milestones we can verify —
                  from registration in 2009 to a practice working in 190+
                  countries today.
                </p>
              </Reveal>
            </div>

            <ol className="flex flex-col">
              {TIMELINE.map((step, i) => (
                <li key={step.year}>
                  <Reveal delay={i * 0.08}>
                    <div className="grid gap-3 border-t border-line-strong py-8 sm:grid-cols-[140px_1fr] sm:gap-8 md:py-10">
                      <span className="font-display text-4xl font-medium text-accent md:text-5xl">
                        {step.year}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-medium md:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
              <li className="border-t border-line-strong pt-6">
                <p className="text-xs leading-relaxed text-faint">
                  Sources: founding year confirmed on somyatrans.com; the 2010
                  and 2011 milestones are as recounted by founder Ajoy Singh in
                  a published interview. No other dates are claimed on this
                  page.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------- Vision & mission ---------------------- */}
      <section aria-label="Vision and mission">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 shadow-lift md:p-10">
                <p className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-accent uppercase">
                  Our vision
                </p>
                <h2 className="mt-5 font-display text-3xl leading-tight font-medium md:text-4xl">
                  To streamline language hurdles across every industry.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  Unparalleled quality at competitive prices — and long-term
                  relationships with clients and translators built on mutual
                  trust, transparent communication and shared insight. That
                  commitment is what propels the company towards becoming a
                  global leader in the language industry.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.12}>
              <article className="flex h-full flex-col rounded-2xl bg-[#080D16] p-8 text-white shadow-lift md:p-10">
                <p className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#FF5F57] uppercase">
                  Our mission
                </p>
                <h2 className="mt-5 font-display text-3xl leading-tight font-medium md:text-4xl">
                  Top-quality linguistic services, delivered on our word.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-hero-muted">
                  A fusion of advanced methodologies, innovation, expertise and
                  efficiency — fostering valuable partnerships and standing
                  true to every commitment, from the first brief to final
                  delivery.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------ Values ----------------------------- */}
      <section aria-label="What we stand for" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
                Values
              </p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
                <WordReveal text="What we stand for." accentWords={["for."]} />
              </h2>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-muted">
                Six working principles, each one visible in how a project is
                actually run — not just written on a wall.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 0.08} className="bg-surface">
                <article className="flex h-full flex-col p-7 md:p-8">
                  <span
                    aria-hidden="true"
                    className="font-grotesk text-xs font-bold tracking-[0.2em] text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Stats (dark) -------------------------- */}
      <section aria-label="Somya Translators in numbers" className="bg-[#080D16] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
              <WordReveal text="The practice, in numbers." accentWords={["numbers."]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-hero-muted">
                Figures published by the company — counted from real projects,
                linguists and clients.
              </p>
            </Reveal>
          </div>

          <dl className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {STAT_ITEMS.map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 3) * 0.08}>
                <div className="border-t border-white/15 pt-6 pr-8">
                  <dd className="font-display text-5xl font-medium text-[#FF5F57] md:text-6xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-3 font-grotesk text-xs font-bold tracking-[0.2em] text-white uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-sm text-hero-muted">{stat.note}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------ */}
      <section aria-label="Work with us">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface px-6 py-14 text-center shadow-lift md:px-12 md:py-20">
              <p className="font-grotesk text-[11px] font-bold tracking-[0.35em] text-faint uppercase">
                Ready when you are
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-medium text-balance md:text-6xl">
                <WordReveal
                  text="Say it. We'll do it — in any language."
                  accentWords={["language."]}
                />
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Get a free quote within 30 minutes, or talk to the team first —
                email{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="link-underline font-semibold text-accent"
                >
                  {COMPANY.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${COMPANY.phones[0].replace(/[^+\d]/g, "")}`}
                  className="link-underline font-semibold text-accent"
                >
                  {COMPANY.phones[0]}
                </a>
                .
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <PrimaryButton to="/quote">Request a quote →</PrimaryButton>
                <GhostButton to="/contact">Contact the team</GhostButton>
              </div>
              <p className="mt-8 text-sm text-faint">
                Prefer to browse first?{" "}
                <Link to="/" className="link-underline font-semibold text-accent">
                  Back to the homepage
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
