import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId: ({ data }) => `${data.slug}-${data.locale}`,
  }),
  schema: z.object({
    slug: z.string(),
    locale: z.enum(["en", "ja"]),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    year: z.number(),
    tags: z.array(z.enum(["Project", "Writing"])).length(1),
    keywords: z.array(z.string()).default([]),
    role: z.string().optional(),
    hero: z.string().optional(),
    video: z.string().optional(),
    youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/).optional(),
    draft: z.boolean().default(false),
    paperUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/writing",
    generateId: ({ data }) => `${data.slug}-${data.locale}`,
  }),
  schema: z.object({
    slug: z.string(),
    locale: z.enum(["en", "ja"]),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    type: z.enum(["Paper", "Article", "Note", "Talk"]),
    tags: z.array(z.enum(["Project", "Writing"])).length(1),
    keywords: z.array(z.string()).default([]),
    externalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
