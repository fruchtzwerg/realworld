import { z } from 'zod';

import { UserSchema } from './user.dto';

export const ProfileSchema = UserSchema.pick({
  username: true,
  bio: true,
  image: true,
}).merge(
  z.object({
    following: z.boolean(),
  })
);

export const ProfileDtoSchema = z.object({
  profile: ProfileSchema,
});

export const ProfileParamsSchema = ProfileSchema.pick({ username: true });

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfileDto = z.infer<typeof ProfileDtoSchema>;
export type ProfileParams = z.infer<typeof ProfileParamsSchema>;
