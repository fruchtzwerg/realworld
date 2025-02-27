import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';

export const prismaUser = () =>
  Prisma.defineExtension({
    name: 'user',
    query: {
      user: {
        $allOperations: async ({ query, args }) => {
          const writeArgs = args as Extract<typeof args, { data: unknown }>;
          const readArgs = args as Extract<typeof args, { select?: unknown }> & {
            select: Prisma.UserSelect;
          };

          if (Array.isArray(writeArgs.data)) {
            await Promise.all(
              writeArgs.data.map(async (user) => {
                user.password = await hash(user.password, 12);
              })
            );
          } else if (writeArgs.data?.password) {
            writeArgs.data.password = await hash(writeArgs.data.password as string, 12);
          }

          if (!readArgs.select?.password) {
            const result = (await query(readArgs)) as Partial<User> | null;
            delete result?.password;
            return result;
          }

          return query(writeArgs);
        },
      },
    },
  });
