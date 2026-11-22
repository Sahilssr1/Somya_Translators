import { Link } from "react-router-dom";
import { INSIGHTS } from "../../data/content";
import { media } from "../../data/media";
import { LazyImage, Reveal, SectionTag, WordReveal } from "../ui";

function Meta({ category, date, readTime }: { category: string; date: string; readTime: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-grotesk text-[11px] font-bold tracking-[0.18em] uppercase">
      <span className="text-accent">{category}</span>
      <span aria-hidden="true" className="text-faint">·</span>
      <span className="text-muted">{date}</span>
      <span aria-hidden="true" className="text-faint">·</span>
      <span className="text-muted">{readTime}</span>
    </p>
  );
}

function ReadLink() {
  return (
    <Link
      to="/#insights"
      className="link-underline inline-flex items-center gap-2 font-grotesk text-xs font-bold tracking-[0.16em] text-accent uppercase"
    >
      Read story <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function Insights() {
  const [featured, ...rest] = INSIGHTS;
  const [tall, wide, square] = rest;

  return (
    <section id="insights" aria-label="Insights" className="bg-bg text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-16">
        <SectionTag label="Insights" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl">
            <WordReveal text="Notes on language." accentWords={["language."]} />
          </h2>
          <Reveal delay={0.15} className="shrink-0">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Practical notes from our linguists and project managers — on
              quality, certification and going multilingual.
            </p>
          </Reveal>
        </div>

        {/* ---- Featured article ---- */}
        <Reveal className="mt-16">
          <article className="group grid gap-8 border-t border-line pt-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <Link to="/#insights" aria-label={`Read: ${featured.title}`}>
                <LazyImage
                  src={media(featured.image)}
                  alt={featured.title}
                  ratio="16 / 10"
                  className="rounded-2xl transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-5">
              <Meta category={featured.category} date={featured.date} readTime={featured.readTime} />
              <h3 className="font-display text-3xl leading-tight font-medium text-balance md:text-4xl">
                <Link to="/#insights" className="transition-colors duration-300 hover:text-accent">
                  {featured.title}
                </Link>
              </h3>
              <p className="text-base leading-relaxed text-muted">{featured.excerpt}</p>
              <div>
                <ReadLink />
              </div>
            </div>
          </article>
        </Reveal>

        {/* ---- Supporting articles — asymmetric ---- */}
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Tall */}
          <Reveal className="lg:col-span-4 lg:row-span-2" delay={0.05}>
            <article className="group flex h-full flex-col gap-5">
              <Link to="/#insights" aria-label={`Read: ${tall.title}`}>
                <LazyImage
                  src={media(tall.image)}
                  alt={tall.title}
                  ratio="3 / 4"
                  className="rounded-2xl"
                />
              </Link>
              <Meta category={tall.category} date={tall.date} readTime={tall.readTime} />
              <h3 className="font-display text-2xl leading-tight font-medium text-balance md:text-[1.7rem]">
                <Link to="/#insights" className="transition-colors duration-300 hover:text-accent">
                  {tall.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-muted">{tall.excerpt}</p>
              <div className="mt-auto pt-2">
                <ReadLink />
              </div>
            </article>
          </Reveal>

          {/* Wide */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <article className="group grid gap-6 sm:grid-cols-2 sm:items-center">
              <Link to="/#insights" aria-label={`Read: ${wide.title}`}>
                <LazyImage
                  src={media(wide.image)}
                  alt={wide.title}
                  ratio="16 / 9"
                  className="rounded-2xl"
                />
              </Link>
              <div className="flex flex-col gap-4">
                <Meta category={wide.category} date={wide.date} readTime={wide.readTime} />
                <h3 className="font-display text-2xl leading-tight font-medium text-balance md:text-3xl">
                  <Link to="/#insights" className="transition-colors duration-300 hover:text-accent">
                    {wide.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-muted">{wide.excerpt}</p>
                <div>
                  <ReadLink />
                </div>
              </div>
            </article>
          </Reveal>

          {/* Small square */}
          <Reveal className="lg:col-span-8" delay={0.15}>
            <article className="group flex gap-6 border-t border-line pt-8">
              <Link
                to="/#insights"
                aria-label={`Read: ${square.title}`}
                className="hidden w-36 shrink-0 sm:block md:w-44"
              >
                <LazyImage
                  src={media(square.image)}
                  alt={square.title}
                  ratio="1 / 1"
                  className="rounded-xl"
                />
              </Link>
              <div className="flex flex-col gap-3">
                <Meta category={square.category} date={square.date} readTime={square.readTime} />
                <h3 className="font-display text-xl leading-tight font-medium text-balance md:text-2xl">
                  <Link to="/#insights" className="transition-colors duration-300 hover:text-accent">
                    {square.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-muted">{square.excerpt}</p>
                <div>
                  <ReadLink />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
