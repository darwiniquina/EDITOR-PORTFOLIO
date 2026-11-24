export const SITE_URL = "https://edits.darwiniquina.com";
export const MAIN_SITE_URL = "https://www.darwiniquina.com";
// Same @id as the main site's Person, so search and AI systems see one entity.
export const PERSON_ID = `${MAIN_SITE_URL}/#darwin-iquina`;

export const NAME = "Darwin Iquiña";
export const EMAIL = "darwiniquina@gmail.com";
export const TITLE = `${NAME} | Video Editor`;
// TODO: replace with confirmed copy before launch. Keep it factual, no invented clients or results.
export const DESCRIPTION = "Portfolio of Darwin Iquiña, a video editor. Selected edits and credits.";
// Shown in the hero banner as the opening hook. Keep it a craft statement, not a results claim.
// Two lines, each split so its key phrase can be drawn as a highlighted selection.
export const HOOK_1 = { before: "Your content deserves", mark: "attention", after: "." };
export const HOOK_2 = { before: "I make", mark: "every second", after: "count." };

// "What I offer" section on the home page. Keep it to services Darwin confirmed; no results or client claims.
export const ABOUT_LINE = "I help creators, coaches and brands turn raw footage into engaging short-form videos that capture attention, keep viewers watching and make your content stand out.";
export const SERVICES = [
  { title: "High-retention reels and shorts", text: "Clean, engaging edits with strategic cuts, dynamic captions and b-roll that keep viewers interested from start to finish." },
  { title: "UGC and product ads", text: "Scroll-stopping product videos that showcase your offer, connect with potential customers and drive action." },
  { title: "Captions and sound design", text: "Eye-catching animated captions, carefully timed sound effects and polished audio that make every video more engaging." },
  { title: "Podcast and long-form repurposing", text: "Turn hours of podcasts, interviews and long-form content into multiple ready-to-post short videos." },
  { title: "Coaching and educational content", text: "Professional, easy-to-follow videos that communicate your expertise, build credibility and make your message resonate." },
  { title: "Custom editing and creative direction", text: "No cookie-cutter edits. I adapt pacing, visuals and editing style to match your brand, audience and content goals." },
];

// Wording stays open ("video", not "edit") because the work includes UGC-style content too.
export const CTA_TEXT = "Let's work together";
// Same Google Form as the main portfolio: a generic enquiry form that goes to the email inbox.
export const FORM_URL = "https://forms.gle/FqZkvhExoeAXCb5T7";
// WhatsApp wants the international form: 09452607161 becomes 639452607161.
export const WHATSAPP_URL = "https://wa.me/639452607161";
export const CTA_HREF = `mailto:${EMAIL}?subject=Video%20project`;

// Looping hero banner (muted, 1920x720, about 1.75 MB) and the poster shown before it plays.
// Rebuilt from the sample outputs by banner.ps1, which lives outside this repo.
export const REEL: string | null = "/banner.mp4";
export const REEL_POSTER = "/banner-poster.webp";

// Flip to true at launch. While false, every page is noindex so placeholder content stays out of search.
export const INDEXABLE = false;

export const SAME_AS = [
  MAIN_SITE_URL,
  "https://github.com/darwiniquina",
  "https://www.linkedin.com/in/darwin-iqui%C3%B1a-15561328b/",
];

// Filter chips on the home grid, in display order. Keys match `category` in the work entries.
export const CATEGORIES = {
  ugc: "UGC",
  "talking-heads": "Talking heads",
  "real-estate": "Real estate",
} as const;
