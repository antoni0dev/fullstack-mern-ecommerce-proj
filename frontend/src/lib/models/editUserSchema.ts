import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  isAdmin: z.boolean(),
});

export type UserFormType = z.infer<typeof userSchema>;
