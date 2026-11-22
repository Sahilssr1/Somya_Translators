import type { MediaKey } from "./media";

/* ------------------------------------------------------------------
   Somya Translators — content data.
   Business facts (ISO 17100:2015, 17+ years, 200+ languages, 4000+
   linguists, 10,000+ projects, contact details, offices) are taken
   from the company's public website, somyatrans.com.
   Items marked DEMO are clearly labelled as sample content on the site.
------------------------------------------------------------------- */

export const COMPANY = {
  name: "Somya Translators",
  wordmark: "SOMYA",
  tagline: "Global Language & Communication Solutions",
  established: "17+ years of practice",
  certification: "ISO 17100:2015 Certified",
  email: "info@somyatrans.com",
  phones: ["+91-11-43061918", "+91-9990094796", "+91-8452949431"],
  offices: [
    {
      label: "Head Office — Delhi",
      address:
        "Plot No. A-52, 2nd Floor, Main Market, Pandav Nagar, New Delhi — 110092",
      phone: "+91-11-43061918",
    },
    {
      label: "Delhi NCR — Noida",
      address:
        "AAS Tower, Mahalaxmi Enclave, Chotpur Colony, Chhajarsi, Sector-63, Noida, Uttar Pradesh — 201304",
      phone: "+91-9990094796",
    },
    {
      label: "Mumbai",
      address:
        "1452, 14th Floor, D Wing, Empire Tower, Reliable Cloud City, Thane-Belapur Road, Airoli (E), Navi Mumbai — 400708",
      phone: "+91-8452949431",
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/somya-translators" },
    { label: "Facebook", href: "https://www.facebook.com/somyatranslators" },
    { label: "Instagram", href: "https://www.instagram.com/somyatranslators" },
    { label: "X", href: "https://x.com/somyatrans" },
  ],
};

/** Stats are configurable demo figures — edit the values here. */
export const STATS = [
  { value: 200, suffix: "+", label: "Languages supported", note: "300+ language pairs" },
  { value: 10000, suffix: "+", label: "Projects completed", note: "Across every major industry" },
  { value: 4000, suffix: "+", label: "Professional linguists", note: "Native speakers, vetted & domain-tested" },
  { value: 40, suffix: "+", label: "Countries served", note: "Clients across five continents", demo: true },
];

/* ------------------------------- Services ------------------------------ */

export interface Service {
  slug: string;
  title: string;
  category: "Translation" | "Localization" | "Multimedia" | "Specialist";
  tagline: string;
  description: string;
  deliverables: string[];
  image: MediaKey;
}

export const SERVICES: Service[] = [
  {
    slug: "translation",
    title: "Translation",
    category: "Translation",
    tagline: "Human translation, faithful to meaning and tone.",
    description:
      "Document, business and general translation by native linguists who understand context, register and culture — never word-for-word, always meaning-for-meaning.",
    deliverables: ["Business documents", "Personal documents", "Marketing copy", "Same-day options"],
    image: "svcTranslation",
  },
  {
    slug: "certified-translation",
    title: "Certified Translation",
    category: "Translation",
    tagline: "Stamped, sealed and accepted by authorities worldwide.",
    description:
      "Officially certified translations with seal and statement of accuracy, accepted by embassies, courts, universities and government bodies for visas, immigration and legal filings.",
    deliverables: ["Birth & marriage certificates", "Academic transcripts", "Court filings", "Immigration dossiers"],
    image: "svcCertified",
  },
  {
    slug: "website-localization",
    title: "Website Localization",
    category: "Localization",
    tagline: "Your website, at home in every market.",
    description:
      "Full website adaptation — copy, layout, imagery, formats and SEO — so every visitor experiences a site built for their language and culture, not a translated copy.",
    deliverables: ["Multilingual SEO", "CMS-ready delivery", "RTL & CJK layout", "Locale QA"],
    image: "svcWebsite",
  },
  {
    slug: "software-localization",
    title: "Software Localization",
    category: "Localization",
    tagline: "Interfaces that feel native, everywhere.",
    description:
      "UI strings, help content and in-app copy localised with string-length, terminology and platform constraints respected — tested in context before release.",
    deliverables: ["UI strings & resource files", "In-context review", "Terminology glossaries", "Linguistic testing"],
    image: "svcSoftware",
  },
  {
    slug: "proofreading-editing",
    title: "Proofreading & Editing",
    category: "Translation",
    tagline: "A second pair of expert eyes on every word.",
    description:
      "Independent review of translated or third-party text for accuracy, grammar, tone and consistency — with a full quality report on what changed and why.",
    deliverables: ["Accuracy review", "Style & tone polish", "Consistency checks", "QA report"],
    image: "svcProofreading",
  },
  {
    slug: "interpretation",
    title: "Interpretation",
    category: "Multimedia",
    tagline: "Live understanding, in the room or on the line.",
    description:
      "Simultaneous, consecutive and remote interpreters for conferences, negotiations, court hearings and medical consultations — briefed on your subject matter in advance.",
    deliverables: ["Conference (simultaneous)", "Consecutive & liaison", "Remote & telephone", "Court & medical"],
    image: "svcInterpretation",
  },
  {
    slug: "transcription",
    title: "Transcription",
    category: "Multimedia",
    tagline: "Every spoken word, captured in writing.",
    description:
      "Accurate transcription of audio and video into clean, time-coded text — with speaker identification and optional translation into your target language.",
    deliverables: ["Verbatim & clean-read", "Time-coded transcripts", "Speaker identification", "Multilingual output"],
    image: "svcTranscription",
  },
  {
    slug: "voice-over",
    title: "Voice-over",
    category: "Multimedia",
    tagline: "Voices your audience trusts.",
    description:
      "Native voice artists cast for tone, age and accent, recorded in professional studios with direction, mixing and mastering included.",
    deliverables: ["Native voice casting", "Studio recording", "Lip-sync & timing", "Mix & master"],
    image: "svcVoiceover",
  },
  {
    slug: "subtitling",
    title: "Subtitling",
    category: "Multimedia",
    tagline: "Captions that keep pace with the story.",
    description:
      "Translation, timing and styling of subtitles for film, broadcast, e-learning and social — frame-accurate, readable and platform-ready.",
    deliverables: ["SRT / VTT / TTML", "Caption styling", "Burn-in options", "QC pass"],
    image: "svcSubtitling",
  },
  {
    slug: "audio-video-translation",
    title: "Audio & Video Translation",
    category: "Multimedia",
    tagline: "Content that crosses languages intact.",
    description:
      "End-to-end translation of audio and video content — transcription, translation, voice-over or subtitling — keeping the original message and mood intact.",
    deliverables: ["Transcription + translation", "Dubbing & voice-over", "Subtitling", "Final delivery in any format"],
    image: "svcAudioVideo",
  },
  {
    slug: "medical-translation",
    title: "Medical Translation",
    category: "Specialist",
    tagline: "Precision where lives depend on it.",
    description:
      "Regulatory-grade translation of clinical, pharmaceutical and patient materials by linguists with medical backgrounds — terminology verified, confidentiality absolute.",
    deliverables: ["Clinical trial reports", "Patient dossiers & IFUs", "Drug labels & leaflets", "Regulatory submissions"],
    image: "svcMedical",
  },
  {
    slug: "legal-translation",
    title: "Legal Translation",
    category: "Specialist",
    tagline: "Every clause, exactly as intended.",
    description:
      "Contracts, affidavits, court documents and NDAs translated by legal linguists who respect jurisdiction, terminology and the weight of every word.",
    deliverables: ["Contracts & agreements", "Court documents", "Patents & IP", "Certified & sworn options"],
    image: "svcLegal",
  },
  {
    slug: "technical-translation",
    title: "Technical Translation",
    category: "Specialist",
    tagline: "Complex manuals, rendered clearly.",
    description:
      "Manuals, safety data sheets, compliance files and product catalogues translated by engineers-turned-linguists who know the machinery behind the words.",
    deliverables: ["User manuals", "Safety data sheets (SDS)", "Compliance documentation", "Product catalogues"],
    image: "svcTechnical",
  },
  {
    slug: "game-localization",
    title: "Game Localization",
    category: "Localization",
    tagline: "Playable in every culture.",
    description:
      "Full game adaptation — dialogue, UI, dates, metrics and humour — so players in every market feel the game was made for them.",
    deliverables: ["In-game text & dialogue", "Cultural adaptation", "Voice-over casting", "Linguistic play-testing"],
    image: "svcGame",
  },
  {
    slug: "desktop-publishing",
    title: "Desktop Publishing",
    category: "Localization",
    tagline: "Multilingual documents, beautifully laid out.",
    description:
      "Multilingual DTP in InDesign, Illustrator and Office formats — layouts rebuilt for expanded text, new scripts and right-to-left languages, print-ready.",
    deliverables: ["InDesign / Illustrator", "Print-ready PDFs", "RTL & script support", "Catalogue & brochure layout"],
    image: "svcDtp",
  },
  {
    slug: "machine-translation-post-editing",
    title: "Machine Translation Post-Editing",
    category: "Specialist",
    tagline: "Machine speed, human judgement.",
    description:
      "Professional editors refine machine-translated content and translation-memory matches — light post-editing for speed, full post-editing for publishable quality.",
    deliverables: ["Light & full MTPE", "TM leverage review", "Terminology alignment", "Quality scoring"],
    image: "svcMtpe",
  },
];

/* ------------------------------ Industries ----------------------------- */

export interface Industry {
  slug: string;
  name: string;
  blurb: string;
  focus: string[];
  image: MediaKey;
}

export const INDUSTRIES: Industry[] = [
  { slug: "legal", name: "Legal", blurb: "Contracts, court filings and compliance — translated with jurisdictional precision.", focus: ["Contracts & NDAs", "Court documents", "Patents"], image: "indLegal" },
  { slug: "medical", name: "Medical", blurb: "Clinical and pharmaceutical translation where accuracy is a matter of patient safety.", focus: ["Clinical trials", "Drug labels", "Patient records"], image: "indMedical" },
  { slug: "healthcare", name: "Healthcare", blurb: "Patient-facing and institutional content that communicates care in every language.", focus: ["Hospital systems", "Health education", "Insurance"], image: "indHealthcare" },
  { slug: "banking", name: "Banking", blurb: "Regulated financial communication, translated with audit-grade accuracy.", focus: ["Audit reports", "Disclosures", "KYC documents"], image: "indBanking" },
  { slug: "finance", name: "Finance", blurb: "Annual reports, prospectuses and investor materials in the language of every market.", focus: ["Annual reports", "Prospectuses", "Policy documents"], image: "indFinance" },
  { slug: "education", name: "Education", blurb: "Curricula, e-learning and academic publishing that teach across borders.", focus: ["LMS content", "Textbooks", "Certificates"], image: "indEducation" },
  { slug: "technology", name: "Technology", blurb: "Software, SaaS and documentation localised at the speed of release cycles.", focus: ["UI strings", "API docs", "Release notes"], image: "indTechnology" },
  { slug: "engineering", name: "Engineering", blurb: "Technical specifications and safety documentation for global engineering teams.", focus: ["Specifications", "Safety data sheets", "Tenders"], image: "indEngineering" },
  { slug: "automotive", name: "Automotive", blurb: "Owner manuals, service literature and supplier documentation for global fleets.", focus: ["Owner manuals", "Service literature", "Supplier docs"], image: "indAutomotive" },
  { slug: "manufacturing", name: "Manufacturing", blurb: "Manuals, compliance files and catalogues that keep production lines speaking one language.", focus: ["Manuals", "Compliance files", "Catalogues"], image: "indManufacturing" },
  { slug: "gaming", name: "Gaming", blurb: "Full game localisation — text, voice and culture — for players everywhere.", focus: ["In-game text", "Voice-over", "Play-testing"], image: "indGaming" },
  { slug: "government", name: "Government", blurb: "Tenders, policies and citizen communication translated to regional legal standards.", focus: ["Tenders", "Policies", "Public notices"], image: "indGovernment" },
  { slug: "e-commerce", name: "E-commerce", blurb: "Product descriptions, packaging and transcreated taglines that sell in every market.", focus: ["Product copy", "Packaging", "Transcreation"], image: "indEcommerce" },
  { slug: "tourism", name: "Tourism", blurb: "Destination content and booking experiences that welcome travellers in their own words.", focus: ["Destination guides", "Booking flows", "Brochures"], image: "indTourism" },
  { slug: "hospitality", name: "Hospitality", blurb: "Guest communication, menus and brand voice for hotels and resorts worldwide.", focus: ["Guest comms", "Menus", "Brand voice"], image: "indHospitality" },
  { slug: "media-entertainment", name: "Media & Entertainment", blurb: "Subtitling, dubbing and adaptation for film, streaming and broadcast.", focus: ["Subtitling", "Dubbing", "Scripts"], image: "indMedia" },
];

/* ------------------------------ Languages ------------------------------ */

export interface Language {
  name: string;
  native: string;
  country: string;
  categories: string[];
}

export interface Region {
  id: string;
  label: string;
  blurb: string;
  languages: Language[];
}

export const REGIONS: Region[] = [
  {
    id: "india",
    label: "India",
    blurb: "India's official and regional languages — the heart of our practice, with native linguists in every major language family.",
    languages: [
      { name: "Hindi", native: "हिन्दी", country: "India", categories: ["Legal", "Government", "Media"] },
      { name: "Bengali", native: "বাংলা", country: "India · Bangladesh", categories: ["Publishing", "Education", "Media"] },
      { name: "Telugu", native: "తెలుగు", country: "India", categories: ["Technology", "Government", "Media"] },
      { name: "Marathi", native: "मराठी", country: "India", categories: ["Legal", "Government", "Education"] },
      { name: "Tamil", native: "தமிழ்", country: "India · Sri Lanka", categories: ["Healthcare", "Media", "Education"] },
      { name: "Urdu", native: "اردو", country: "India · Pakistan", categories: ["Legal", "Publishing", "Media"] },
      { name: "Gujarati", native: "ગુજરાતી", country: "India", categories: ["Finance", "E-commerce", "Legal"] },
      { name: "Punjabi", native: "ਪੰਜਾਬੀ", country: "India", categories: ["Immigration", "Media", "Education"] },
      { name: "Malayalam", native: "മലയാളം", country: "India", categories: ["Healthcare", "Tourism", "Media"] },
      { name: "Kannada", native: "ಕನ್ನಡ", country: "India", categories: ["Technology", "Government", "Education"] },
    ],
  },
  {
    id: "asia",
    label: "Asia & Pacific",
    blurb: "From East Asian economies to Southeast Asian growth markets — localisation that respects script, etiquette and context.",
    languages: [
      { name: "Chinese (Simplified)", native: "简体中文", country: "China", categories: ["Technology", "Manufacturing", "E-commerce"] },
      { name: "Chinese (Traditional)", native: "繁體中文", country: "Taiwan · Hong Kong", categories: ["Finance", "Media", "Legal"] },
      { name: "Japanese", native: "日本語", country: "Japan", categories: ["Technology", "Automotive", "Gaming"] },
      { name: "Korean", native: "한국어", country: "South Korea", categories: ["Technology", "Gaming", "Media"] },
      { name: "Thai", native: "ไทย", country: "Thailand", categories: ["Tourism", "Hospitality", "E-commerce"] },
      { name: "Vietnamese", native: "Tiếng Việt", country: "Vietnam", categories: ["Manufacturing", "E-commerce", "Education"] },
      { name: "Indonesian", native: "Bahasa Indonesia", country: "Indonesia", categories: ["E-commerce", "Finance", "Media"] },
      { name: "Malay", native: "Bahasa Melayu", country: "Malaysia", categories: ["Finance", "Government", "Education"] },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    blurb: "The languages of European business, law and culture — including certified translations accepted across the EU.",
    languages: [
      { name: "English", native: "English", country: "United Kingdom · USA", categories: ["All industries"] },
      { name: "German", native: "Deutsch", country: "Germany · Austria", categories: ["Engineering", "Automotive", "Legal"] },
      { name: "French", native: "Français", country: "France · Belgium", categories: ["Legal", "Fashion", "Government"] },
      { name: "Spanish", native: "Español", country: "Spain · Latin America", categories: ["Healthcare", "E-commerce", "Media"] },
      { name: "Italian", native: "Italiano", country: "Italy", categories: ["Fashion", "Tourism", "Manufacturing"] },
      { name: "Portuguese", native: "Português", country: "Portugal · Brazil", categories: ["E-commerce", "Finance", "Legal"] },
      { name: "Dutch", native: "Nederlands", country: "Netherlands", categories: ["Technology", "Finance", "Legal"] },
      { name: "Russian", native: "Русский", country: "Russia", categories: ["Engineering", "Energy", "Legal"] },
    ],
  },
  {
    id: "africa",
    label: "Africa & Middle East",
    blurb: "Arabic, African and Gulf languages — serving trade, development and government communication across the region.",
    languages: [
      { name: "Arabic", native: "العربية", country: "Middle East · North Africa", categories: ["Legal", "Finance", "Government"] },
      { name: "Swahili", native: "Kiswahili", country: "East Africa", categories: ["NGO", "Healthcare", "Education"] },
      { name: "Amharic", native: "አማርኛ", country: "Ethiopia", categories: ["Government", "NGO", "Healthcare"] },
      { name: "Hausa", native: "Harshen Hausa", country: "Nigeria · Niger", categories: ["Healthcare", "Education", "Media"] },
      { name: "Yoruba", native: "Èdè Yorùbá", country: "Nigeria", categories: ["Media", "Education", "Healthcare"] },
      { name: "Persian (Farsi)", native: "فارسی", country: "Iran", categories: ["Legal", "Publishing", "Media"] },
      { name: "Turkish", native: "Türkçe", country: "Türkiye", categories: ["Manufacturing", "Tourism", "Legal"] },
      { name: "Hebrew", native: "עברית", country: "Israel", categories: ["Technology", "Legal", "Healthcare"] },
    ],
  },
  {
    id: "americas",
    label: "The Americas",
    blurb: "North and South American languages — from US legal and healthcare to Latin American market expansion.",
    languages: [
      { name: "English (US)", native: "English", country: "United States", categories: ["All industries"] },
      { name: "Spanish (LATAM)", native: "Español", country: "Mexico · South America", categories: ["Healthcare", "Finance", "Media"] },
      { name: "Portuguese (BR)", native: "Português", country: "Brazil", categories: ["E-commerce", "Legal", "Manufacturing"] },
      { name: "French (CA)", native: "Français", country: "Canada", categories: ["Government", "Legal", "Healthcare"] },
      { name: "Quechua", native: "Runasimi", country: "Peru · Bolivia", categories: ["Government", "NGO", "Education"] },
      { name: "Haitian Creole", native: "Kreyòl Ayisyen", country: "Haiti", categories: ["Healthcare", "NGO", "Legal"] },
    ],
  },
];

/* ---------------------------- Why choose us ---------------------------- */

export const WHY_US = [
  {
    title: "Experienced language specialists",
    body: "17+ years of practice and 10,000+ completed projects — our project managers know how to run a translation like a production, not a favour.",
  },
  {
    title: "Native-language expertise",
    body: "4,000+ vetted native linguists translate only into their mother tongue, and only in domains they are qualified in.",
  },
  {
    title: "Quality assurance",
    body: "Every project passes through translation, editing and proofreading by separate specialists — the TEP model behind ISO 17100:2015.",
  },
  {
    title: "Confidentiality",
    body: "NDA-bound linguists, encrypted file handling and strict access control. Your documents stay yours.",
  },
  {
    title: "Industry-specific translation",
    body: "Legal, medical, technical and financial linguists with real domain training — terminology is never guessed.",
  },
  {
    title: "Global language coverage",
    body: "200+ languages and 300+ language pairs, from Hindi and Arabic to Japanese and Swahili — including rare and regional languages.",
  },
  {
    title: "Timely delivery",
    body: "Same-day options for urgent work, a quote within 30 minutes, and delivery schedules we actually keep.",
  },
  {
    title: "Customer support",
    body: "A dedicated project manager and 24/7 support — one point of contact from first brief to final delivery.",
  },
];

/* ------------------------- Quality & certifications -------------------- */

export const QUALITY_STEPS = [
  { title: "Analyse", body: "Scope, word count, terminology and reference material are reviewed before a single word is translated." },
  { title: "Translate", body: "A native, domain-qualified linguist translates — supported by translation memory and your glossary." },
  { title: "Edit", body: "A second specialist reviews the translation against the source for accuracy, tone and completeness." },
  { title: "Proofread", body: "A final proofreader checks spelling, grammar, formatting and layout in the target language." },
  { title: "Deliver & support", body: "Files are delivered in your format of choice, with post-delivery support and free revision windows." },
];

export interface Certification {
  name: string;
  body: string;
  verified: boolean;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "ISO 17100:2015",
    body: "International standard for translation services — certified processes for translator qualification, revision and project management.",
    verified: true,
  },
  {
    name: "ISO 9001:2015 — Quality Management",
    body: "Demonstration placeholder: quality-management certification shown for layout purposes. Replace with the company's verified certificate details.",
    verified: false,
  },
  {
    name: "ISO 27001 — Information Security",
    body: "Demonstration placeholder: information-security certification shown for layout purposes. Replace with the company's verified certificate details.",
    verified: false,
  },
];

/* ------------------------------ Process -------------------------------- */

export const PROCESS_STEPS = [
  {
    title: "Share your requirements",
    body: "Send your documents or describe your project — language pair, deadline and purpose. A quote follows within 30 minutes.",
  },
  {
    title: "Receive consultation",
    body: "A project manager reviews your brief, recommends the right service level and confirms scope, timeline and pricing.",
  },
  {
    title: "Confirm your project",
    body: "Approve the quote and your project is assigned to native, domain-specialist linguists with a dedicated manager.",
  },
  {
    title: "Receive your completed translation",
    body: "Your translation arrives reviewed, proofread and formatted — with support after delivery and free revisions.",
  },
];

/* ---------------------------- Testimonials ----------------------------- */
/* DEMO: fictional sample testimonials, clearly labelled as such on site. */

export const TESTIMONIALS = [
  {
    quote:
      "They translated 400 pages of clinical documentation in nine days — terminology flawless, formatting intact, and the review process caught details our own team had missed.",
    name: "Dr. Elena Marsh",
    role: "Regulatory Affairs Lead, Pharmaceutical Company",
    image: "portraitA" as MediaKey,
  },
  {
    quote:
      "Our contracts move between Delhi, Dubai and Frankfurt every week. Somya's legal team understands jurisdiction, not just language — that is the difference.",
    name: "James Okafor",
    role: "General Counsel, International Law Firm",
    image: "portraitB" as MediaKey,
  },
  {
    quote:
      "They localised our entire platform into eleven languages, including Hindi and Tamil, and our Indian user base tripled in a quarter. The cultural notes alone were worth it.",
    name: "Priya Raman",
    role: "VP Product, SaaS Platform",
    image: "portraitC" as MediaKey,
  },
];

/* ------------------------------ Insights ------------------------------- */

export const INSIGHTS = [
  {
    slug: "translation-quality-beyond-words",
    category: "Quality",
    title: "Translation quality is not word-for-word — it is meaning-for-meaning",
    excerpt:
      "Why the best translations read as if they were written in the target language — and the review process that makes it happen.",
    date: "18 November 2026",
    readTime: "6 min read",
    image: "insightFeatured" as MediaKey,
    featured: true,
  },
  {
    slug: "certified-translation-visa-guide",
    category: "Guides",
    title: "Certified translation for visas: what embassies actually require",
    excerpt: "Seals, statements of accuracy and the documents most applicants forget.",
    date: "11 November 2026",
    readTime: "5 min read",
    image: "insight1" as MediaKey,
    featured: false,
  },
  {
    slug: "localising-for-india",
    category: "Localization",
    title: "Localising for India means localising for twenty-two languages",
    excerpt: "Why a single Hindi version is not an India strategy — and where to start instead.",
    date: "4 November 2026",
    readTime: "7 min read",
    image: "insight2" as MediaKey,
    featured: false,
  },
  {
    slug: "mtpe-when-machines-meet-humans",
    category: "Technology",
    title: "MTPE: when machine speed meets human judgement",
    excerpt: "Light vs full post-editing, and how to choose the right level for your content.",
    date: "28 October 2026",
    readTime: "4 min read",
    image: "insight3" as MediaKey,
    featured: false,
  },
];

/* --------------------------------- FAQ --------------------------------- */

export const FAQS = [
  {
    q: "How is the price of a translation calculated?",
    a: "Pricing depends on the language pair, word count, subject complexity, service level and deadline. Standard translation is usually priced per word; certified, urgent and specialist work carries different rates. Share your document and we will send a free, no-obligation quote within 30 minutes.",
  },
  {
    q: "What is a certified translation, and when do I need one?",
    a: "A certified translation is provided by an authorised translation agency with a signed statement of accuracy and an official seal. Embassies, courts, universities and immigration authorities require it for documents such as birth and marriage certificates, academic transcripts and legal filings. Requirements vary by country — we will confirm what your authority accepts.",
  },
  {
    q: "How long will my translation take?",
    a: "Turnaround depends on volume, complexity and language pair. A standard document of 1,000–2,000 words is typically delivered within 24–48 hours. Same-day and urgent options are available — our linguists are experienced at managing tight deadlines without compromising quality.",
  },
  {
    q: "How do you guarantee quality?",
    a: "Every project follows the ISO 17100:2015 process: translation by a native, domain-qualified linguist, editing by a second specialist, and a final proofread. Translation memory and glossaries keep terminology consistent across all your projects.",
  },
  {
    q: "Are my documents kept confidential?",
    a: "Yes. All linguists and staff work under non-disclosure agreements, files are handled through encrypted channels, and access is limited to the team working on your project. We are happy to sign your NDA before you share anything.",
  },
  {
    q: "Which languages and file formats do you support?",
    a: "We translate 200+ languages across 300+ language pairs. We work with Word, Excel, PowerPoint, PDF, HTML/XML, InDesign, Illustrator, subtitle files (SRT, VTT), audio, video and localisation files (XLF, PO, RESX) — and deliver in the format you need.",
  },
  {
    q: "Do you translate into or from Indian languages?",
    a: "Yes — Indian languages are a core strength. We cover Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Punjabi, Malayalam, Kannada and more, with native linguists based across India.",
  },
  {
    q: "Can you proofread a translation done elsewhere?",
    a: "Yes. We proofread third-party translations and provide MTPE for machine-translated content. If the text needs only light correction we cover it under proofreading; if the issues run deeper, we will recommend a fresh translation and explain why.",
  },
];

/* --------------------------- Quote form options ------------------------ */

export const QUOTE_LANGUAGES = [
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati",
  "Punjabi", "Malayalam", "Kannada", "Arabic", "Chinese (Simplified)", "Chinese (Traditional)",
  "Japanese", "Korean", "French", "German", "Spanish", "Italian", "Portuguese", "Dutch",
  "Russian", "Turkish", "Thai", "Vietnamese", "Indonesian", "Swahili", "Other",
];

export const NAV_LINKS = [
  { label: "Services", href: "/#services", mega: "services" as const },
  { label: "Industries", href: "/#industries", mega: "industries" as const },
  { label: "Languages", href: "/#languages", mega: "languages" as const },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];
