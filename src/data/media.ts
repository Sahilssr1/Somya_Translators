/**
 * Media registry — every image / video URL used by the site lives here.
 * All URLs are direct CDN links to properly licensed stock assets
 * (Pexels / Coverr / Unsplash). Each URL was verified to return HTTP 200
 * (images) or 206 + video/mp4 (video) on 2026-11-22 before being wired in.
 * Never hot-link images from somyatrans.com.
 * Full verification log: ~/workspace/somya-media-manifest.md
 *
 * Note: Coverr serves MP4 only — no WebM rendition exists, so
 * heroVideoWebm is intentionally empty and the hero renders MP4 only.
 *
 * If a key is ever missing, `media()` falls back to a local inline
 * placeholder so the layout never renders a broken image.
 */

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='1200' height='800' fill='%23101827'/%3E%3Ctext x='50%25' y='50%25' fill='%2355D6C2' font-family='sans-serif' font-size='42' text-anchor='middle'%3ESomya Translators%3C/text%3E%3C/svg%3E";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const MEDIA = {
  /* --- Hero --- */
  heroVideo:
    "https://cdn.coverr.co/videos/coverr-timelapse-of-manhattan-at-sunset-1213/1080p.mp4",
  heroVideoWebm: "",
  heroPoster:
    "https://cdn.coverr.co/videos/coverr-timelapse-of-manhattan-at-sunset-1213/thumbnail?width=1920",

  /* --- Company intro --- */
  introMain: U("photo-1454165804606-c3d57bc86b40"),
  introSecondary: U("photo-1522071820081-009f0129c71c"),
  introTertiary: U("photo-1543269865-cbf427effbad"),

  /* --- Services (one editorial image per service) --- */
  svcTranslation: U("photo-1517048676732-d65bc937f952"),
  svcCertified: U("photo-1505664194779-8beaceb93744"),
  svcWebsite: U("photo-1517694712202-14dd9538aa97"),
  svcSoftware: U("photo-1555066931-4365d14bab8c"),
  svcProofreading: U("photo-1524995997946-a1c2e315a42f"),
  svcInterpretation: U("photo-1540575467063-178a50c2df87"),
  svcTranscription: U("photo-1590602847861-f357a9332bbc"),
  svcVoiceover: U("photo-1478737270239-2f02b77fc618"),
  svcSubtitling: U("photo-1574717024653-61fd2cf4d44d"),
  svcAudioVideo: U("photo-1489599849927-2ee91cede3ba"),
  svcMedical: U("photo-1576091160550-2173dba999ef"),
  svcLegal: U("photo-1589829545856-d10d557cf95f"),
  svcTechnical: U("photo-1581091226825-a6a2a5aee158"),
  svcGame: U("photo-1552820728-8b83bb6b773f"),
  svcDtp: U("photo-1497366216548-37526070297c"),
  svcMtpe: U("photo-1518770660439-4636190af475"),

  /* --- Industries --- */
  indLegal: U("photo-1521791136064-7986c2920216"),
  indMedical: U("photo-1576091160399-112ba8d25d1d"),
  indHealthcare: U("photo-1504814532849-cff240bbc503"),
  indBanking: U("photo-1450101499163-c8848c66ca85"),
  indFinance: U("photo-1611974789855-9c2a0a7236a3"),
  indEducation: U("photo-1509062522246-3755977927d7"),
  indTechnology: U("photo-1519389950473-47ba0277781c"),
  indEngineering: U("photo-1581094794329-c8112a89af12"),
  indAutomotive: U("photo-1552519507-da3b142c6e3d"),
  indManufacturing: U("photo-1504328345606-18bbc8c9d7d1"),
  indGaming: U("photo-1550745165-9bc0b252726f"),
  indGovernment: U("photo-1486572788966-cfd3df1f5b42"),
  indEcommerce: U("photo-1556742049-0cfed4f6a45d"),
  indTourism: U("photo-1488646953014-85cb44e25828"),
  indHospitality: U("photo-1566073771259-6a8506099945"),
  indMedia: U("photo-1470229722913-7c0e2dbbafd3"),

  /* --- Testimonial portraits --- */
  portraitA: U("photo-1573496359142-b8d87734a5a2", 400),
  portraitB: U("photo-1560250097-0b93528c311a", 400),
  portraitC: U("photo-1573497019940-1c28c88b4f3e", 400),

  /* --- Insights / editorial --- */
  insightFeatured: U("photo-1524661135-423995f22d0b"),
  insight1: U("photo-1451187580459-43490279c0fa"),
  insight2: U("photo-1493976040374-85c8e12f0c0e"),
  insight3: U("photo-1558494949-ef010cbdcc31"),

  /* --- Quality / contact --- */
  qualityImage: U("photo-1600880292203-757bb62b4baf"),
  contactImage: U("photo-1436491865332-7a61a109cc05"),
} as const;

export type MediaKey = keyof typeof MEDIA;

export function media(key: MediaKey): string {
  return MEDIA[key] || PLACEHOLDER;
}

export function hasMedia(key: MediaKey): boolean {
  return MEDIA[key].length > 0;
}
