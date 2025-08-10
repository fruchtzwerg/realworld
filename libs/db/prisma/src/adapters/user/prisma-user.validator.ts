import { UserValidator } from '@realworld/core';
import { RawUserSchema, UserSchema, type RawUser, type User } from '@realworld/dto';

export class PrismaUserValidator extends UserValidator {
  override validateWithPassword(user: unknown): RawUser {
    return RawUserSchema.parse(user);
  }

  override validate(entity: unknown): User {
    return UserSchema.parse(entity);
  }

  override validateMany(entities: unknown[]): User[] {
    return UserSchema.array().parse(entities);
  }
}
