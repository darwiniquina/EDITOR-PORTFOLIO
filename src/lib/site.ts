export const SITE_URL = "https://edits.darwiniquina.com";
export const MAIN_SITE_URL = "https://www.darwiniquina.com";
// Same @id as the main site's Person, so search and AI systems see one entity.
export const PERSON_ID = `${MAIN_SITE_URL}/#darwin-iquina`;

export const NAME = "Darwin Iquiña";
export const EMAIL = "darwiniquina@gmail.com";
export const TITLE = `${NAME} | Video Editor`;
// TODO: replace with confirmed copy before launch. Keep it factual, no invented clients or results.
export const DESCRIPTION = "Portfolio of Darwin Iquiña, a video editor. Selected edits and credits.";
export const PROFILE =
  "Darwin Iquiña is a video editor. Replace this placeholder with a short, confirmed profile.";

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
