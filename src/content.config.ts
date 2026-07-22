import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string(),
    updatedDate: z.string(),
    readTime: z.string(),
    rating: z.string(),
  }),
});

export const collections = { reviews };