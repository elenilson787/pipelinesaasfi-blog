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
    // Aceita tanto número (4.9) quanto texto ("4.9") para não quebrar reviews antigas
    rating: z.union([z.number(), z.string()]),
    // Campos opcionais para SEO e Rich Snippets
    toolName: z.string().optional(),
    price: z.string().optional(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),
  }),
});

export const collections = { reviews };