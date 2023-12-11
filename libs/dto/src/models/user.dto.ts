import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  username: z.string(),
  bio: z.string(),
  image: z.string().nullable(),
});

export const UserDtoSchema = z.object({
  user: UserSchema,
});

export const CreateUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const CreateUserDtoSchema = z.object({
  user: CreateUserSchema,
});

export const UpdateUserSchema = UserSchema.omit({ token: true })
  .extend({
    password: z.string().min(8),
  })
  .partial();

export const UpdateUserDtoSchema = z.object({
  user: UpdateUserSchema,
});

export const LoginUserSchema = CreateUserSchema.pick({
  email: true,
  password: true,
}).required();

export const LoginUserDtoSchema = z.object({ user: LoginUserSchema });

export const RawUserSchema = UserSchema.merge(CreateUserSchema).omit({ token: true });

export type User = z.infer<typeof UserSchema>;
export type UserDto = z.infer<typeof UserDtoSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type RawUser = z.infer<typeof RawUserSchema>;
