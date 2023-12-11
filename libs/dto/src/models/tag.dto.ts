import { z } from 'zod';

export const TagsDtoSchema = z.object({
  tags: z.string().array(),
});

export type TagsDto = z.infer<typeof TagsDtoSchema>;
