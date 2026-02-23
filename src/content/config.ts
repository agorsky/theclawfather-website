import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    category: z.string(),
    phase: z.string().default('PHASE-01'),
    date: z.string(),
    status: z.enum(['published', 'coming-soon']).default('published'),
    xPost: z.string().optional(), // tweet URL this article expands on
    description: z.string(),
  }),
});

export const collections = { posts };
