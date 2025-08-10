import { User } from '@prisma/client';

import { ProfileSchema } from '@realworld/dto';

export const PrismaProfileSchema = (username?: User['username']) => {
  const Profile = ProfileSchema.omit({ following: true });

  return Profile.extend({ followers: Profile.array() }).transform((profile) =>
    ProfileSchema.parse({
      ...profile,
      following: profile.followers.some((user) => user.username === username),
    })
  );
};
