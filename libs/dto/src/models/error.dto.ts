import { z } from 'zod';

export const ErrorSchema = z.object({
  errors: z.object({
    body: z.string().array(),
  }),
});
