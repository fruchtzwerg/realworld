import { BypassValidator, type UserValidator } from '@realworld/core';
import type { RawUser, User } from '@realworld/dto';

export class MongoUserValidator extends BypassValidator<User> implements UserValidator {
  validateWithPassword(user: unknown): RawUser {
    return user as RawUser;
  }
}
