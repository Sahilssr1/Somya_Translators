import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  COMPANY,
  INDUSTRIES,
  QUOTE_LANGUAGES,
  SERVICES,
} from "../data/content";
import { Reveal, SectionTag, WordReveal } from "../components/ui";

/* ------------------------------------------------------------------
   Quote submission — simulated for now.
   TODO: point this at the real backend endpoint (e.g. POST /api/quote
   or the form service of choice) and return the server response.
   The form below calls this function and handles loading / success /
   error states, so wiring the real API only means replacing this body.
------------------------------------------------------------------- */

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  sourceLanguage: string;
  targetLanguage: string;
  service: string;
  industry: string;
  description: string;
  additional: string;
}

async function submitQuoteRequest(_data: QuoteRequest): Promise<void> {
  // TODO: replace with a real API call, e.g.
  //   const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  //   if (!res.ok) throw new Error("Quote submission failed");
  await new Promise((resolve) => setTimeout(resolve, 1400));
}

/* ------------------------------ Validation ---------------------------- */

type Errors = Partial<Record<keyof QuoteRequest, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: QuoteRequest): Errors {
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
  if (!data.sourceLanguage) errors.sourceLanguage = "Please choose a source language.";
  if (!data.targetLanguage) {
    errors.targetLanguage = "Please choose a target language.";
  } else if (
    data.sourceLanguage &&
    data.targetLanguage === data.sourceLanguage
  ) {
    errors.targetLanguage = "Target language must be different from the source language.";
  }
  if (!data.service) errors.service = "Please choose a service.";
  if (data.description.trim().length < 10) {
    errors.description = "Please describe your project in at least 10 characters.";
  }
  return errors;
}

const EMPTY_FORM: QuoteRequest = {
  name: "",
  email: "",
  phone: "",
  sourceLanguage: "",
  targetLanguage: "",
  service: "",
  industry: "",
  description: "",
  additional: "",
};

const FIELD_LABELS: Record<keyof QuoteRequest, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  sourceLanguage: "Source language",
  targetLanguage: "Target language",
  service: "Service type",
  industry: "Industry",
  description: "Project description",
  additional: "Additional requirements",
};

/* ------------------------------ Field bits ---------------------------- */

const inputCls =
  "w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none";
const labelCls = "mb-2 block font-grotesk text-xs font-bold tracking-[0.14em] text-ink uppercase";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}

/* --------------------------------- Page -------------------------------- */

export default function QuotePage() {
  const [form, setForm] = useState<QuoteRequest>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof QuoteRequest) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...form, [key]: e.target.value };
    setForm(next);
    // Re-validate live once the user has attempted a submit.
    if (attempted) setErrors(validate(next));
  };

  const borderFor = (key: keyof QuoteRequest) =>
    errors[key] ? "border-red-500" : "border-line-strong";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0] as keyof QuoteRequest;
      document.getElementById(`quote-${firstKey}`)?.focus();
      return;
    }
    setLoading(true);
    setSubmitError(null);
    try {
      await submitQuoteRequest(form);
      setSubmitted(true);
      window.setTimeout(
        () => successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
    } catch {
      setSubmitError(
        "Something went wrong while sending your request. Please try again, or email us directly at info@somyatrans.com.",
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

  const errorEntries = Object.entries(errors) as [keyof QuoteRequest, string][];

  return (
    <div className="bg-bg text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-24 md:px-10 md:pb-32">
        <SectionTag index="12" label="Get a quote" />

        <div className="mt-8 grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          {/* ---- Sticky left column ---- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl">
              <WordReveal text="Request a quote." accentWords={["quote."]} />
            </h1>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                Tell us about your project — languages, documents, deadline —
                and a project manager will come back with a free, no-obligation
                quote.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <h2 className="mt-10 font-grotesk text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
                What happens next
              </h2>
              <ol className="mt-5 flex flex-col gap-5 border-t border-line pt-6">
                {[
                  {
                    title: "Quote within 30 minutes",
                    body: "We review your brief and send a free, itemised quote — usually within half an hour in working hours.",
                  },
                  {
                    title: "Free consultation",
                    body: "Your project manager recommends the right service level and confirms scope, timeline and pricing.",
                  },
                  {
                    title: "No obligation",
                    body: "The quote is free and non-binding. You decide whether to proceed — no pressure, no follow-up spam.",
                  },
                ].map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/50 font-grotesk text-xs font-bold text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-muted">
                Prefer to talk first? Email{" "}
                <a href={`mailto:${COMPANY.email}`} className="link-underline font-semibold text-accent">
                  {COMPANY.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${COMPANY.phones[0].replace(/[^+\d]/g, "")}`}
                  className="link-underline font-semibold text-accent"
                >
                  {COMPANY.phones[0]}
                </a>
                . Back to the{" "}
                <Link to="/" className="link-underline font-semibold text-accent">
                  homepage
                </Link>
                .
              </p>
            </Reveal>
          </div>

          {/* ---- Form / success ---- */}
          <div>
            {/* Demo disclaimer */}
            <div
              role="note"
              className="mb-8 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4 text-sm leading-relaxed"
            >
              <strong className="font-semibold">Demonstration form.</strong> Submitting
              here sends nothing — no quote request or email is actually
              submitted. To request a real quote, email{" "}
              <a href={`mailto:${COMPANY.email}`} className="link-underline font-semibold text-accent">
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
                  Request received — thank you, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                  A project manager would normally reply with your free quote
                  within 30 minutes in working hours.
                </p>

                <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Name</dt>
                    <dd>{form.name}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Email</dt>
                    <dd>{form.email}</dd>
                  </div>
                  {form.phone.trim() && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Phone</dt>
                      <dd>{form.phone}</dd>
                    </div>
                  )}
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Languages</dt>
                    <dd>
                      {form.sourceLanguage} → {form.targetLanguage}
                    </dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Service</dt>
                    <dd>{form.service}</dd>
                  </div>
                  {form.industry && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Industry</dt>
                      <dd>{form.industry}</dd>
                    </div>
                  )}
                  <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Project</dt>
                    <dd className="leading-relaxed whitespace-pre-line">{form.description}</dd>
                  </div>
                  {form.additional.trim() && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-grotesk text-xs font-bold tracking-[0.14em] text-muted uppercase">Additional</dt>
                      <dd className="leading-relaxed whitespace-pre-line">{form.additional}</dd>
                    </div>
                  )}
                </dl>

                <p className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm leading-relaxed">
                  This is a demonstration — no quote request or email was
                  actually submitted. To request a real quote, email{" "}
                  <a href={`mailto:${COMPANY.email}`} className="link-underline font-semibold text-accent">
                    {COMPANY.email}
                  </a>
                  .
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:brightness-110"
                >
                  Submit another request
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
                      {errorEntries.length === 1 ? "field" : "fields"} before submitting:
                    </p>
                    <ul className="mt-2 flex flex-col gap-1">
                      {errorEntries.map(([key, message]) => (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() => document.getElementById(`quote-${key}`)?.focus()}
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
                  <div role="alert" className="mb-8 rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
                    {submitError}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="quote-name" className={labelCls}>
                      Name <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "quote-name-error" : undefined}
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your full name"
                      className={`${inputCls} ${borderFor("name")}`}
                    />
                    <FieldError id="quote-name-error" message={errors.name} />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="quote-email" className={labelCls}>
                      Email <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "quote-email-error" : undefined}
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@company.com"
                      className={`${inputCls} ${borderFor("email")}`}
                    />
                    <FieldError id="quote-email-error" message={errors.email} />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label htmlFor="quote-phone" className={labelCls}>
                      Phone <span className="font-normal text-faint normal-case">(optional)</span>
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "quote-phone-error" : undefined}
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98765 43210"
                      className={`${inputCls} ${borderFor("phone")}`}
                    />
                    <FieldError id="quote-phone-error" message={errors.phone} />
                  </div>

                  {/* Source language */}
                  <div>
                    <label htmlFor="quote-sourceLanguage" className={labelCls}>
                      Source language <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <select
                      id="quote-sourceLanguage"
                      name="sourceLanguage"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.sourceLanguage}
                      aria-describedby={errors.sourceLanguage ? "quote-sourceLanguage-error" : undefined}
                      value={form.sourceLanguage}
                      onChange={set("sourceLanguage")}
                      className={`${inputCls} ${borderFor("sourceLanguage")}`}
                    >
                      <option value="" disabled>
                        From…
                      </option>
                      {QUOTE_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <FieldError id="quote-sourceLanguage-error" message={errors.sourceLanguage} />
                  </div>

                  {/* Target language */}
                  <div>
                    <label htmlFor="quote-targetLanguage" className={labelCls}>
                      Target language <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <select
                      id="quote-targetLanguage"
                      name="targetLanguage"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.targetLanguage}
                      aria-describedby={errors.targetLanguage ? "quote-targetLanguage-error" : undefined}
                      value={form.targetLanguage}
                      onChange={set("targetLanguage")}
                      className={`${inputCls} ${borderFor("targetLanguage")}`}
                    >
                      <option value="" disabled>
                        To…
                      </option>
                      {QUOTE_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <FieldError id="quote-targetLanguage-error" message={errors.targetLanguage} />
                  </div>

                  {/* Service type */}
                  <div>
                    <label htmlFor="quote-service" className={labelCls}>
                      Service type <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <select
                      id="quote-service"
                      name="service"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? "quote-service-error" : undefined}
                      value={form.service}
                      onChange={set("service")}
                      className={`${inputCls} ${borderFor("service")}`}
                    >
                      <option value="" disabled>
                        Choose a service…
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <FieldError id="quote-service-error" message={errors.service} />
                  </div>

                  {/* Industry */}
                  <div>
                    <label htmlFor="quote-industry" className={labelCls}>
                      Industry <span className="font-normal text-faint normal-case">(optional)</span>
                    </label>
                    <select
                      id="quote-industry"
                      name="industry"
                      value={form.industry}
                      onChange={set("industry")}
                      className={`${inputCls} ${borderFor("industry")}`}
                    >
                      <option value="">Not sure / other</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.slug} value={ind.name}>
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project description */}
                  <div className="sm:col-span-2">
                    <label htmlFor="quote-description" className={labelCls}>
                      Project description <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <textarea
                      id="quote-description"
                      name="description"
                      rows={5}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.description}
                      aria-describedby={
                        errors.description ? "quote-description-error" : "quote-description-hint"
                      }
                      value={form.description}
                      onChange={set("description")}
                      placeholder="What needs translating? Document type, approximate word count, deadline, purpose…"
                      className={`${inputCls} ${borderFor("description")} resize-y`}
                    />
                    <p id="quote-description-hint" className="mt-2 text-xs text-faint">
                      At least 10 characters — the more detail, the more accurate your quote.
                    </p>
                    <FieldError id="quote-description-error" message={errors.description} />
                  </div>

                  {/* Additional requirements */}
                  <div className="sm:col-span-2">
                    <label htmlFor="quote-additional" className={labelCls}>
                      Additional requirements{" "}
                      <span className="font-normal text-faint normal-case">(optional)</span>
                    </label>
                    <textarea
                      id="quote-additional"
                      name="additional"
                      rows={3}
                      value={form.additional}
                      onChange={set("additional")}
                      placeholder="Certification, formatting, glossaries, confidentiality needs…"
                      className={`${inputCls} ${borderFor("additional")} resize-y`}
                    />
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
                      Sending your request…
                    </>
                  ) : (
                    "Request my free quote →"
                  )}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-faint">
                  By submitting, you agree to be contacted about this quote request. No
                  obligation, no spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
