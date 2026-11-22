# Edits Portfolio

Video editing portfolio for Darwin Iquiña at `edits.darwiniquina.com`. Separate repo from the main automation portfolio (`C:\Personal\portfolio`). Inspiration: kenedits.com (full-bleed reel, numbered thumbnail grid). Direction is clean and direct; keep complexity low. Type is Inter in sentence case, to feel approachable, not like a Hollywood studio. JetBrains Mono is only for small labels such as project numbers. The call to action ("Say hi" in the header, and a button in the banner) uses "video", not "edit", because the work includes UGC too.

## Rules

- Follow the shared global `AGENTS.md` for response style, claim discipline, and change approval.
- Use only confirmed facts. No invented clients, results, credentials, or metrics. Label personal and spec work clearly.
- Do not commit, push, deploy, or create external links unless Darwin asks.

## Where things live

- Projects: `src/content/work/*.md` (schema in `src/content.config.ts`). Home grid order comes from `order`.
- Site constants (name, profile, reel, `INDEXABLE`): `src/lib/site.ts`.
- Head, schema, canonical, robots meta: `src/layouts/Base.astro`.
- Crawler files: `public/robots.txt`, `public/llms.txt` (manual). Sitemap is generated at build.

## SEO and GEO

- The Person `@id` matches the main site, so both sites describe one entity. Keep `sameAs` in sync with the main site.
- `INDEXABLE = false` makes every page `noindex`. Flip it only at launch, after removing placeholder content.
- `VideoObject` is emitted only for YouTube projects with `published` set (needs a real thumbnail URL and upload date). Vimeo projects get the page schema only.
- Videos are embedded from YouTube or Vimeo. Do not commit full videos. Only a short hero loop (`REEL`) may live in `public/`.
- Every project page needs real descriptive text, since crawlers cannot read video.

## Verify

`npm run build` (runs `astro check` then `astro build`). Inspect `dist/` for titles, canonical URLs, JSON-LD, and `sitemap-index.xml`.
