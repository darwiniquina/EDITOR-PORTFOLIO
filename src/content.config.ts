import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      year: z.number(),
      role: z.string(),
      order: z.number(),
      description: z.string(),
      // YouTube or Vimeo watch URL. Full videos stay on the host, not in git.
      videoUrl: z.url().optional(),
      thumbnail: image().optional(),
      // ISO date the video was published. Needed for VideoObject schema.
      published: z.string().optional(),
    }),
});

export const collections = { work };
