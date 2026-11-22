import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Only title and order are required, so nothing unconfirmed has to be published.
// Each entry's slug (file name) also names its hover clip and poster: public/previews/<slug>.mp4 and .webp.
const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    category: z.enum(["ugc", "talking-heads", "coaching", "real-estate"]).optional(),
    client: z.string().optional(),
    year: z.number().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    // YouTube (watch, youtu.be or /shorts/) or Vimeo URL. Full videos stay on the host, not in git.
    videoUrl: z.url().optional(),
    // ISO date the video was published. Needed for VideoObject schema.
    published: z.string().optional(),
  }),
});

export const collections = { work };
