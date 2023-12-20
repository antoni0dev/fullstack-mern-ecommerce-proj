import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type Login = z.infer<typeof loginSchema>;
