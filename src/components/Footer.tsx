import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY, INDUSTRIES, SERVICES } from "../data/content";
import { Reveal } from "./ui";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080D16] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-10 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-[#FF5F57] uppercase">
                Ready when you are
              </p>
              <p className="font-display mt-3 max-w-xl text-4xl leading-[1.05] font-light md:text-6xl">
                Say it in <em className="text-[#FF5F57]">every</em> language.
              </p>
            </div>
            <Link
              to="/quote"
              className="group inline-flex items-center gap-3 rounded-full bg-[#FF5F57] px-7 py-4 text-sm font-bold text-[#ffffff] transition-transform duration-300 hover:scale-[1.03]"
            >
              Start Your Project
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Somya Translators logo" className="h-10 w-auto" />
              <div>
                <p className="font-grotesk text-2xl font-bold tracking-[0.18em]">SOMYA</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.32em] text-white/50">
                  TRANSLATORS · {COMPANY.certification}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              A professional translation and localization company headquartered in Delhi,
              India — connecting people, businesses and ideas across 200+ languages for
              over 17 years.
            </p>
            <p className="font-display mt-4 text-lg text-white/80 italic">
              “Go Global. By Being Local.”
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {COMPANY.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-[#FF5F57] hover:text-[#FF5F57]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-2" aria-label="Services">
            <p className="text-[11px] font-bold tracking-[0.28em] text-white/40 uppercase">Services</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to="/#services" className="text-white/70 transition-colors hover:text-[#FF5F57]">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Industries">
            <p className="text-[11px] font-bold tracking-[0.28em] text-white/40 uppercase">Industries</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {INDUSTRIES.slice(0, 7).map((i) => (
                <li key={i.slug}>
                  <Link to="/#industries" className="text-white/70 transition-colors hover:text-[#FF5F57]">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[11px] font-bold tracking-[0.28em] text-white/40 uppercase">Head Office</p>
            <address className="mt-5 space-y-4 text-sm leading-relaxed text-white/70 not-italic">
              <p className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#FF5F57]" />
                {COMPANY.offices[0].address}
              </p>
              <p className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#FF5F57]" />
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-[#FF5F57]">
                  {COMPANY.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#FF5F57]" />
                <span>
                  {COMPANY.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="mr-3 transition-colors hover:text-[#FF5F57]">
                      {p}
                    </a>
                  ))}
                </span>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Somya Translators. All rights reserved.</p>
          <p>
            Testimonials shown are fictional samples. Statistics are configurable demo
            figures. Quote form is a frontend demonstration.
          </p>
          <Link to="/#top" className="inline-flex items-center gap-1.5 font-semibold text-white/70 hover:text-[#FF5F57]">
            Back to top <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Giant background wordmark — fully visible, never cropped */}
      <div aria-hidden="true" className="pointer-events-none pb-6 select-none md:pb-8">
        <p className="font-grotesk text-center text-[19vw] leading-none font-bold tracking-tight text-white/[0.04]">
          SOMYA
        </p>
        <p className="font-grotesk mt-2 text-center text-[6vw] leading-none font-bold tracking-[0.35em] text-white/[0.04]">
          TRANSLATORS
        </p>
      </div>
    </footer>
  );
}
