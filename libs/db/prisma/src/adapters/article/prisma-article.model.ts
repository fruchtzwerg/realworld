import { ArticleSchema, ProfileSchema, User } from '@realworld/dto';

import { PrismaProfileSchema } from '../profile/prisma-profile.model';

export const PrismaArticleSchema = (username?: User['username']) => {
  const Article = ArticleSchema.omit({ favorited: true, favoritesCount: true });
  const Profile = ProfileSchema.omit({ following: true });

  return Article.extend({
    favoritedBy: Profile.array(),
    author: PrismaProfileSchema(username),
  }).transform((article) =>
    ArticleSchema.parse({
      ...article,
      favorited: article.favoritedBy.some((user) => user.username === username),
      favoritesCount: article.favoritedBy.length,
    })
  );
};
