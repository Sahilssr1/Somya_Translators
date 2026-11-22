import { COMPANY } from "../../data/content";
import { media } from "../../data/media";
import { LazyImage, PrimaryButton, Reveal, SectionTag, WordReveal } from "../ui";

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden bg-[#080D16] text-white">
      <div className="grain relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag label="Contact" light />

        <h2 className="mt-8 max-w-4xl font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl lg:text-7xl">
          <WordReveal text="Let's talk in your language." />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A6B0C0] md:text-lg">
            Send a document, describe a project, or just ask a question — a real
            project manager replies, not a bot.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---- Contact methods ---- */}
          <div>
            <Reveal>
              <div className="border-t border-white/10 py-7">
                <h3 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#FF5F57] uppercase">
                  Email
                </h3>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="link-underline mt-3 inline-block font-display text-2xl font-medium md:text-3xl"
                >
                  {COMPANY.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="border-t border-white/10 py-7">
                <h3 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#FF5F57] uppercase">
                  Phone
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {COMPANY.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                        className="link-underline font-display text-xl font-medium md:text-2xl"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-t border-white/10 py-7">
                <h3 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#FF5F57] uppercase">
                  Offices
                </h3>
                <ul className="mt-5 flex flex-col gap-6">
                  {COMPANY.offices.map((office) => (
                    <li key={office.label} className="grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-6">
                      <p className="font-display text-lg font-medium">{office.label}</p>
                      <div>
                        <address className="text-sm leading-relaxed text-[#A6B0C0] not-italic">
                          {office.address}
                        </address>
                        <a
                          href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                          className="link-underline mt-1 inline-block text-sm text-white/85"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border-t border-b border-white/10 py-7">
                <h3 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-[#FF5F57] uppercase">
                  Follow
                </h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {COMPANY.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-full border border-white/20 px-5 py-2 font-grotesk text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#FF5F57] hover:text-[#FF5F57]"
                      >
                        {social.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ---- Image + quote + CTA ---- */}
          <Reveal delay={0.1} className="relative">
            <div className="relative lg:sticky lg:top-28">
              <LazyImage
                src={media("contactImage")}
                alt="The Somya Translators team at work"
                ratio="4 / 5"
                className="rounded-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(to_top,rgba(8,13,22,0.85)_0%,rgba(8,13,22,0.25)_45%,transparent_70%)]"
              />
              <figure className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
                <blockquote className="font-display text-2xl leading-snug font-medium italic text-balance md:text-3xl">
                  “Every language is a door. We open it for you.”
                </blockquote>
                <figcaption className="mt-3 font-grotesk text-[11px] font-bold tracking-[0.24em] text-[#A6B0C0] uppercase">
                  Somya Translators · Est. 17+ years
                </figcaption>
                <div className="mt-6">
                  <PrimaryButton to="/quote">Get a Quote →</PrimaryButton>
                </div>
              </figure>
            </div>
          </Reveal>
        </div>

        {/* ---- Promise strip ---- */}
        <Reveal className="mt-20">
          <p className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-white/10 py-6 text-center font-grotesk text-xs font-bold tracking-[0.22em] text-[#A6B0C0] uppercase md:text-sm">
            <span>Quote within 30 minutes</span>
            <span aria-hidden="true" className="text-[#FF5F57]">·</span>
            <span>24/7 support</span>
            <span aria-hidden="true" className="text-[#FF5F57]">·</span>
            <span>Same-day options</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
