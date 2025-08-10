import type { RawUser, User } from '@realworld/dto';

export abstract class UserValidator {
  abstract validate(user: unknown): User;
  abstract validateWithPassword(user: unknown): RawUser;
  abstract validateMany(users: unknown[]): Omit<User, 'token'>[];
}
