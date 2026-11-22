# Somya Translators — Premium Cinematic Website

A cinematic, editorial-style corporate website for **Somya Translators**, a professional
multilingual translation and localization company (ISO 17100:2015 certified, headquartered
in Delhi, India).

Business information (services, industries, languages, certifications, contact details)
is based on the company's public website, [somyatrans.com](https://www.somyatrans.com/).
The design, layout, copy structure and imagery are entirely original — no assets or
layout were copied from the reference site.

## Tech stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** (CSS-first configuration, semantic theme tokens)
- **Framer Motion** for motion design
- **React Router** for pages and anchor navigation
- **Lucide** icons

## Features

- Full-screen cinematic hero with real background video, poster fallback,
  reduced-motion support and IntersectionObserver playback control
- Working dark/light theme switcher (localStorage persistence, system preference
  on first visit, no flash-of-wrong-theme bootstrap script)
- Mega menus for Services / Industries / Languages, full-screen overlay
  navigation, mobile accordion navigation
- Interactive service discovery (sticky visual panel + numbered list),
  interactive industry selector, interactive SVG world-map language explorer
- Animated statistics, horizontal process journey, testimonial carousel,
  editorial insights layout, accessible FAQ accordion
- Premium quote-request page with validation, loading / success states and a
  simulated submission (frontend demo — no real email is sent; see the
  `submitQuoteRequest` stub in `src/pages/QuotePage.tsx` for backend integration)

## Content & demo labelling

- All site content lives in `src/data/content.ts`; all media URLs live in
  `src/data/media.ts` (direct CDN links to licensed stock from Pexels / Coverr /
  Unsplash — every URL was verified to load before being wired in).
- Statistics in `src/data/content.ts` are configurable demo figures.
- Testimonials are fictional samples and are labelled as such on the site.
- Only ISO 17100:2015 is presented as a verified credential; other
  certifications are clearly labelled demonstration placeholders.
- The quote form is a frontend demonstration and never claims a real submission.

## Run locally

```bash
npm install
npm run dev      # development server (default http://localhost:5173)
npm run build    # production build (outputs to dist/)
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  data/         content.ts (all copy/data) · media.ts (verified media URLs)
  theme/        ThemeContext.tsx (dark/light theme provider)
  components/   Header.tsx · Footer.tsx · ui.tsx (shared primitives)
  components/sections/  Hero · Intro · Services · Industries · Languages ·
                        WhyUs · Quality · Process · Testimonials · Insights ·
                        Faq · Contact
  pages/        Home.tsx · QuotePage.tsx
  App.tsx       Router + scroll management
  index.css     Design tokens, fonts, keyframes, utilities
```

## Design tokens

| Token | Dark | Light |
| --- | --- | --- |
| Background | `#080D16` | `#F7F8FA` |
| Surface | `#101827` | `#FFFFFF` |
| Primary text | `#FFFFFF` | `#111827` |
| Secondary text | `#A6B0C0` | `#667085` |
| Accent | `#55D6C2` | `#087F8C` |
| Secondary accent | `#6C8CFF` | `#405FEA` |

Typography: Fraunces (display serif), Manrope (body), Space Grotesk (labels/numbers).
