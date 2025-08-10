import { Prisma } from '@prisma/client';

const normalizeArticle = (
  article: Pick<Prisma.ArticleCreateManyInput | Prisma.ArticleUpdateInput, 'tags'>
) => {
  if (!('tagList' in article)) return;
  const normalizedTags = (article.tagList as string[]).map((tag) => tag.trim());
  article.tags = JSON.stringify(normalizedTags);
  delete article.tagList;
};

export const prismaArticle = () =>
  Prisma.defineExtension({
    name: 'article',
    result: {
      article: {
        tagList: {
          needs: { tags: true },
          compute: ({ tags }) => JSON.parse(tags) as string[],
        },
      },
    },

    query: {
      article: {
        $allOperations: async ({ query, args }) => {
          const writeArgs = args as Extract<typeof args, { data: unknown }>;

          if (Array.isArray(writeArgs.data)) {
            writeArgs.data.forEach(normalizeArticle);
          } else if (writeArgs.data) {
            normalizeArticle(writeArgs.data);
          }

          return query(writeArgs);
        },
      },
    },
  });
