import { Prisma } from '@prisma/client';

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

          if (writeArgs.data && 'tagList' in writeArgs.data) {
            const normalizedTags = (writeArgs.data.tagList as string[]).map((tag) => tag.trim());
            writeArgs.data.tags = JSON.stringify(normalizedTags);
            delete writeArgs.data.tagList;
          }

          return query(writeArgs);
        },
      },
    },
  });
