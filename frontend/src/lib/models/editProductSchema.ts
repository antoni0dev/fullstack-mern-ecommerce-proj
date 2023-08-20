import { z } from 'zod';

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  brand: z.string(),
  category: z.string(),
  countInStock: z.number(),
  description: z.string(),
  rating: z.number(),
  numReviews: z.number(),
  image: z.string().url(),
});

export type ProductFormType = z.infer<typeof productSchema>;
