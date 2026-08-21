import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string().optional(),
    updatedDate: z.string().optional(),
    readTime: z.string().optional(),
    category: z.string().optional(),
    // z.coerce.number() aceita tanto "4.9" quanto 4.9 e converte com segurança
    rating: z.coerce.number().optional(),
    toolName: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(), // <--- CAMPO DE IMAGEM ADICIONADO COM SUCESSO
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),
  }),
});

export const collections = { reviews };