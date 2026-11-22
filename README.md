# edits-portfolio

Video editing portfolio. Astro, Tailwind v4, static output. Deploys to `edits.darwiniquina.com`.

```
npm install
npm run dev      # local dev server
npm run build    # type check and static build into dist/
```

## Add a project

Create `src/content/work/<slug>.md` with the frontmatter fields in `src/content.config.ts`. Add `videoUrl` (YouTube or Vimeo) and write a real description.

## Launch checklist

1. Replace the placeholder profile, description, and `llms.txt` copy.
2. Replace the sample projects in `src/content/work/`.
3. Optional: add a short compressed hero loop and set `REEL` in `src/lib/site.ts`.
4. Add a social preview image and `og:image`.
5. Set `INDEXABLE = true` in `src/lib/site.ts`.
6. Add the domain `edits.darwiniquina.com` in Vercel and a CNAME for `edits`.
7. Link to this site from the main portfolio.
