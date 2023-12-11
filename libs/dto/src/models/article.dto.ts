import { z } from 'zod';

import { ProfileSchema } from './profile.dto';

export const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.string().array(),
  createdAt: z.string(),
  updatedAt: z.string(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: ProfileSchema,
});

export const ArticleDtoSchema = z.object({
  article: ArticleSchema,
});

export const ArticlesDtoSchema = z.object({
  articles: ArticleSchema.array(),
  articlesCount: z.number(),
});

export const CreateArticleSchema = ArticleSchema.pick({
  title: true,
  description: true,
  body: true,
  tagList: true,
});

export const CreateArticleDtoSchema = z.object({
  article: CreateArticleSchema,
});

export const UpdateArticleSchema = ArticleSchema.pick({
  title: true,
  description: true,
  body: true,
  tagList: true,
}).partial();

export const UpdateArticleDtoSchema = z.object({
  article: UpdateArticleSchema,
});

export const ArticlesQuerySchema = z
  .object({
    tag: z.string(),
    author: ProfileSchema.shape.username,
    favorited: ProfileSchema.shape.username,
    offset: z.coerce.number().int().nonnegative().default(0),
    limit: z.coerce.number().int().positive().default(20),
  })
  .partial();

export const FeedQuerySchema = z
  .object({
    offset: z.coerce.number().int().nonnegative().default(0),
    limit: z.coerce.number().int().positive().default(20),
  })
  .partial();

export const ArticleParamsSchema = ArticleSchema.pick({ slug: true });

export type Article = z.infer<typeof ArticleSchema>;
export type ArticleDto = z.infer<typeof ArticleDtoSchema>;
export type ArticlesDto = z.infer<typeof ArticlesDtoSchema>;
export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema>;
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>;
export type UpdateArticleDto = z.infer<typeof UpdateArticleDtoSchema>;
export type ArticlesQuery = z.infer<typeof ArticlesQuerySchema>;
export type FeedQuery = z.infer<typeof FeedQuerySchema>;
export type ArticleParams = z.infer<typeof ArticleParamsSchema>;
