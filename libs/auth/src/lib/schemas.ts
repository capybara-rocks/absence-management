import * as z from 'zod';

export const signIn = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUp = signIn.extend({
  name: z.string(),
});
