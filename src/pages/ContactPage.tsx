import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { COMPANY, SERVICES } from "../data/content";
import { media } from "../data/media";
import {
  LazyImage,
  Reveal,
  SectionTag,
  WordReveal,
} from "../components/ui";

/* ------------------------------------------------------------------
   Contact — Somya Translators.
   All addresses, phones and emails are verified against the live
   somyatrans.com contact page and homepage footer (fetched 2026-11-22).
   The three India offices come from COMPANY.offices in content.ts;
   the USA office is listed on the live contact page but is not in
   content.ts, so it is defined below with its source noted.

   Social links: VERIFIED against the company's own published decks
   and profiles — they DIFFER from COMPANY.socials in content.ts
   (which lists /somyatranslators and /company/somya-translators).
   The verified handles are @somyatrans on Facebook / Instagram / X
   and /company/somya-translators-pvt-ltd on LinkedIn. content.ts
   should be corrected to match; this page uses the verified URLs.
------------------------------------------------------------------- */

interface Office {
  label: string;
  city: string;
  address: string;
  phones: { display: string; href: string }[];
  note?: string;
}

const telHref = (display: string) =>
  `tel:${display.replace(/[^+\d]/g, "")}`;

const OFFICES: Office[] = [
  {
    label: "Head Office",
    city: "Delhi",
    address:
      "Plot No. A-52, 2nd Floor, Main Market, Pandav Nagar, New Delhi — 110092",
    phones: [
      { display: "+91-11-43061918", href: telHref("+91-11-43061918") },
      { display: "+91-9990094796", href: telHref("+91-9990094796") },
    ],
    note: "Opp. Mother Dairy · Fax: +91-11-43061917",
  },
  {
    label: "Delhi NCR",
    city: "Noida",
    address:
      "AAS Tower, Mahalaxmi Enclave, Chotpur Colony, Chhajarsi, Sector-63, Noida, Uttar Pradesh — 201304",
    phones: [
      { display: "+91-9990094796", href: telHref("+91-9990094796") },
    ],
  },
  {
    label: "Branch Office",
    city: "Mumbai",
    address:
      "1452, 14th Floor, D Wing, Empire Tower, Reliable Cloud City, Thane-Belapur Road, Airoli (E), Navi Mumbai — 400708",
    phones: [
      { display: "+91-8452949431", href: telHref("+91-8452949431") },
      { display: "+91-8422894974", href: telHref("+91-8422894974") },
    ],
  },
  {
    /* Verified on the live somyatrans.com contact page; not in content.ts. */
    label: "USA Office",
    city: "Los Angeles",
    address: "7119 W. Sunset Blvd, #593, Los Angeles, California — 90046 (USA)",
    phones: [
      { display: "001-213-286-1498", href: "tel:+12132861498" },
    ],
  },
];

/* Verified social profiles (see header comment). */
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/somya-translators-pvt-ltd" },
  { label: "Facebook", href: "https://www.facebook.com/somyatrans" },
  { label: "Instagram", href: "https://www.instagram.com/somyatrans" },
  { label: "X", href: "https://x.com/somyatrans" },
  { label: "YouTube", href: "https://www.youtube.com/@somyatranslatorspvt.ltd.8221" },
];

/* ------------------------------------------------------------------
   Contact submission — simulated for now (same pattern as QuotePage).
   TODO: point this at the real backend endpoint (e.g. POST
   /api/contact) and return the server response.
------------------------------------------------------------------- */

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

async function submitContactRequest(_data: ContactRequest): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

/* ------------------------------ Validation ---------------------------- */

type Errors = Partial<Record<keyof ContactRequest, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: ContactRequest): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.phone.trim() && data.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number (at least 7 digits).";
  }
  if (!data.service) errors.service = "Please choose what your enquiry is about.";
  if (data.message.trim().length < 10) {
    errors.message = "Please write your message in at least 10 characters.";
  }
  return errors;
}

const EMPTY_FORM: ContactRequest = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const FIELD_LABELS: Record<keyof ContactRequest, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  service: "Service interest",
  message: "Message",
};

/* ------------------------------ Field bits ---------------------------- */

const inputCls =
  "w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none";
const labelCls =
  "mb-2 block font-grotesk text-xs font-bold tracking-[0.14em] text-ink uppercase";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}

/* --------------------------------- Page -------------------------------- */

export default function ContactPage() {
  const [form, setForm] = useState<ContactRequest>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const set =
    (key: keyof ContactRequest) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const next = { ...form, [key]: e.target.value };
      setForm(next);
      if (attempted) setErrors(validate(next));
    };

  const borderFor = (key: keyof ContactRequest) =>
    errors[key] ? "border-red-500" : "border-line-strong";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0] as keyof ContactRequest;
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }
    setLoading(true);
    setSubmitError(null);
    try {
      await submitContactRequest(form);
      setSubmitted(true);
      window.setTimeout(
        () =>
          successRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        80,
      );
    } catch {
      setSubmitError(
        "Something went wrong while sending your message. Please try again, or email us directly at info@somyatrans.com.",
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    setAttempted(false);
    setSubmitError(null);
  };

  const errorEntries = Object.entries(errors) as [keyof ContactRequest, string][];

  return (
    <div className="bg-bg text-ink">
      {/* ------------------------------- Hero ------------------------------ */}
      <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-10 md:px-10 md:pb-12">
        <SectionTag label="Contact" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <h1 className="max-w-3xl font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl lg:text-7xl">
            <WordReveal
              text="Talk to a human. Any hour, any time zone."
              accentWords={["human."]}
            />
          </h1>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-muted md:text-lg">
              Four offices, one inbox, and a support team that works around
              the clock. Reach out however suits you — we reply to quote
              requests within 30 minutes in working hours.
            </p>
          </Reveal>
        </div>

        {/* Quick contact strip */}
        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <a
              href={`mailto:${COMPANY.email}`}
              className="group bg-surface p-6 transition-colors duration-300 hover:bg-accent-soft md:p-7"
            >
              <p className="font-grotesk text-[11px] font-bold tracking-[0.22em] text-faint uppercase">
                Email us
              </p>
              <p className="mt-3 font-display text-xl font-medium break-all md:text-2xl">
                {COMPANY.email}
              </p>
              <p className="mt-2 text-sm text-muted">
                For quotes, projects &amp; general enquiries →
              </p>
            </a>
            <a
              href={telHref(COMPANY.phones[0])}
              className="group bg-surface p-6 transition-colors duration-300 hover:bg-accent-soft md:p-7"
            >
              <p className="font-grotesk text-[11px] font-bold tracking-[0.22em] text-faint uppercase">
                Call the head office
              </p>
              <p className="mt-3 font-display text-xl font-medium md:text-2xl">
                {COMPANY.phones[0]}
              </p>
              <p className="mt-2 text-sm text-muted">
                Delhi HQ · also {COMPANY.phones[1]} →
              </p>
            </a>
            <Link
              to="/quote"
              className="group bg-surface p-6 transition-colors duration-300 hover:bg-accent-soft md:p-7"
            >
              <p className="font-grotesk text-[11px] font-bold tracking-[0.22em] text-faint uppercase">
                Need a price?
              </p>
              <p className="mt-3 font-display text-xl font-medium md:text-2xl">
                Get a free quote
              </p>
              <p className="mt-2 text-sm text-muted">
                Itemised, no obligation, within 30 minutes →
              </p>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ------------------------- Form + info rail ------------------------ */}
      <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-20 md:px-10 md:pt-12 md:pb-24">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          {/* ---- Form / success ---- */}
          <div>
            <p className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
              Write to us
            </p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
              <WordReveal text="Send us a message." accentWords={["message."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                Tell us what you need — a translation, a localisation project,
                or just a question. If you already know your languages and
                deadline, the{" "}
                <Link to="/quote" className="link-underline font-semibold text-accent">
                  quote form
                </Link>{" "}
                will get you a price faster.
              </p>
            </Reveal>

            {/* Demo disclaimer */}
            <div
              role="note"
              className="mt-8 mb-8 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4 text-sm leading-relaxed"
            >
              <strong className="font-semibold">Demonstration form.</strong>{" "}
              Submitting here sends nothing — no message or email is actually
              submitted. To reach the team for real, email{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="link-underline font-semibold text-accent"
              >
                {COMPANY.email}
              </a>
              .
            </div>

            {submitted ? (
              <div
                ref={successRef}
                className="scroll-mt-32 rounded-2xl border border-line bg-surface p-8 shadow-lift md:p-10"
                role="status"
              >
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 12.5l5 5L20 6.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="mt-6 font-display text-3xl font-medium md:text-4xl">
                  Message received — thank you, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                  The team would normally get back to you shortly — quote
                  requests are answered within 30 minutes in working hours,
                  and support is available 24/7.
                </p>

                <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">
                      Name
                    </dt>
                    <dd>{form.name}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">
                      Email
                    </dt>
                    <dd>{form.email}</dd>
                  </div>
                  {form.phone.trim() && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        Phone
                      </dt>
                      <dd>{form.phone}</dd>
                    </div>
                  )}
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">
                      Interested in
                    </dt>
                    <dd>{form.service}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">
                      Message
                    </dt>
                    <dd className="leading-relaxed whitespace-pre-line">{form.message}</dd>
                  </div>
                </dl>

                <p className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm leading-relaxed">
                  This is a demonstration — no message or email was actually
                  submitted. To reach the team for real, email{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="link-underline font-semibold text-accent"
                  >
                    {COMPANY.email}
                  </a>
                  .
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:brightness-110"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-line bg-surface p-6 shadow-lift md:p-10"
              >
                {/* Error summary */}
                {attempted && errorEntries.length > 0 && (
                  <div
                    role="alert"
                    className="mb-8 rounded-xl border border-red-300 bg-red-50 px-5 py-4"
                  >
                    <p className="font-semibold text-red-800">
                      Please fix {errorEntries.length}{" "}
                      {errorEntries.length === 1 ? "field" : "fields"} before
                      submitting:
                    </p>
                    <ul className="mt-2 flex flex-col gap-1">
                      {errorEntries.map(([key, message]) => (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById(`contact-${key}`)?.focus()
                            }
                            className="link-underline text-left text-sm text-red-700"
                          >
                            {FIELD_LABELS[key]} — {message}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {submitError && (
                  <div
                    role="alert"
                    className="mb-8 rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800"
                  >
                    {submitError}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className={labelCls}>
                      Name{" "}
                      <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your full name"
                      className={`${inputCls} ${borderFor("name")}`}
                    />
                    <FieldError id="contact-name-error" message={errors.name} />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className={labelCls}>
                      Email{" "}
                      <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@company.com"
                      className={`${inputCls} ${borderFor("email")}`}
                    />
                    <FieldError id="contact-email-error" message={errors.email} />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-phone" className={labelCls}>
                      Phone{" "}
                      <span className="font-normal text-faint normal-case">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98765 43210"
                      className={`${inputCls} ${borderFor("phone")}`}
                    />
                    <FieldError id="contact-phone-error" message={errors.phone} />
                  </div>

                  {/* Service interest */}
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-service" className={labelCls}>
                      Service interest{" "}
                      <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.service}
                      aria-describedby={
                        errors.service ? "contact-service-error" : undefined
                      }
                      value={form.service}
                      onChange={set("service")}
                      className={`${inputCls} ${borderFor("service")}`}
                    >
                      <option value="" disabled>
                        What is your enquiry about?…
                      </option>
                      <option value="General enquiry">General enquiry</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <FieldError id="contact-service-error" message={errors.service} />
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className={labelCls}>
                      Message{" "}
                      <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message
                          ? "contact-message-error"
                          : "contact-message-hint"
                      }
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your project, your languages, your deadline — or just ask a question…"
                      className={`${inputCls} ${borderFor("message")} resize-y`}
                    />
                    <p id="contact-message-hint" className="mt-2 text-xs text-faint">
                      At least 10 characters — the more detail, the faster we
                      can help.
                    </p>
                    <FieldError id="contact-message-error" message={errors.message} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-on-accent shadow-lift transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-on-accent/40 border-t-on-accent"
                      />
                      Sending your message…
                    </>
                  ) : (
                    "Send message →"
                  )}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-faint">
                  By submitting, you agree to be contacted about this enquiry.
                  No obligation, no spam.
                </p>
              </form>
            )}
          </div>

          {/* ---- Sticky info rail ---- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <LazyImage
                src={media("contactImage")}
                alt="An aircraft wing above the clouds — the view from a global journey"
                className="rounded-2xl"
                ratio="16 / 10"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-line bg-surface p-7 shadow-lift md:p-8">
                <h2 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
                  Prefer to call?
                </h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {[
                    { label: "Delhi HQ", phone: "+91-11-43061918" },
                    { label: "Delhi / Noida mobile", phone: "+91-9990094796" },
                    { label: "Mumbai", phone: "+91-8452949431" },
                    { label: "Mumbai (alt.)", phone: "+91-8422894974" },
                    { label: "USA", phone: "001-213-286-1498", href: "tel:+12132861498" },
                  ].map((row) => (
                    <li
                      key={row.phone}
                      className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-muted">{row.label}</span>
                      <a
                        href={row.href ?? telHref(row.phone)}
                        className="link-underline font-grotesk text-sm font-semibold"
                      >
                        {row.phone}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  Support is available 24/7 — across time zones, so a
                  different office is always awake.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 rounded-2xl border border-line bg-surface p-7 shadow-lift md:p-8">
                <h2 className="font-grotesk text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
                  Follow Somya Translators
                </h2>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {social.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  Or explore the company first —{" "}
                  <Link
                    to="/about"
                    className="link-underline font-semibold text-accent"
                  >
                    read our story
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {/* ------------------------------ Offices ---------------------------- */}
      <section aria-label="Our offices" className="bg-[#080D16] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag label="Offices" light />
              <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
                <WordReveal text="Four offices. One team." accentWords={["team."]} />
              </h2>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-hero-muted">
                Headquartered in Delhi, with branches in Noida and Mumbai —
                and a US office in Los Angeles for clients across the Americas.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {OFFICES.map((office, i) => (
              <Reveal key={office.city} delay={(i % 2) * 0.1}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-7 md:p-9 ${
                    i === 0
                      ? "border-[#FF5F57]/50 bg-white/[0.06]"
                      : "border-white/12 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl font-medium md:text-4xl">
                      {office.city}
                    </h3>
                    <span
                      className={`font-grotesk text-[10px] font-bold tracking-[0.28em] uppercase ${
                        i === 0 ? "text-[#FF5F57]" : "text-hero-muted"
                      }`}
                    >
                      {office.label}
                    </span>
                  </div>
                  <address className="mt-5 text-base leading-relaxed text-hero-muted not-italic">
                    {office.address}
                  </address>
                  <div className="mt-6 flex flex-col gap-2 border-t border-white/12 pt-6">
                    {office.phones.map((phone) => (
                      <a
                        key={phone.display}
                        href={phone.href}
                        className="link-underline w-fit font-grotesk text-base font-semibold text-white"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </div>
                  {office.note && (
                    <p className="mt-4 text-sm text-hero-muted">{office.note}</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-10 text-sm leading-relaxed text-hero-muted">
              Career enquiries are handled through the careers page on{" "}
              <a
                href="https://www.somyatrans.com"
                target="_blank"
                rel="noreferrer"
                className="link-underline font-semibold text-white"
              >
                somyatrans.com
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
