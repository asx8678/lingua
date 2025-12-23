import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Zespół Lingua"),
    authorRole: z
      .string()
      .default("Szkoła języków obcych i matematyki w Legionowie"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
