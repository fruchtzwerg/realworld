import { z } from 'zod';

import { ProfileSchema } from './profile.dto';

export const CommentSchema = z.object({
  id: z.coerce.number(),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
  body: z.string(),
  author: ProfileSchema,
});

export const CommentDtoSchema = z.object({
  comment: CommentSchema,
});

export const CommentsDtoSchema = z.object({
  comments: CommentSchema.array(),
});

export const CreateCommentSchema = CommentSchema.pick({ body: true });

export const CreateCommentDtoSchema = z.object({
  comment: CreateCommentSchema,
});

export const CommentParamsSchema = CommentSchema.pick({ id: true });

export type Comment = z.infer<typeof CommentSchema>;
export type CommentDto = z.infer<typeof CommentDtoSchema>;
export type CommentsDto = z.infer<typeof CommentsDtoSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type CreateCommentDto = z.infer<typeof CreateCommentDtoSchema>;
export type CommentParams = z.infer<typeof CommentParamsSchema>;
