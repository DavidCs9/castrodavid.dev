// src/content/config.ts
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    // include any other fields as needed
  }),
});

export const collections = { posts };
