import { UserValidator } from '@realworld/core';
import { RawUserSchema, UserSchema, type RawUser, type User } from '@realworld/dto';

export class PrismaUserValidator extends UserValidator {
  private readonly schema = UserSchema.omit({ token: true });

  override validateWithPassword(user: unknown): RawUser {
    return RawUserSchema.parse(user);
  }

  override validate(entity: unknown): Omit<User, 'token'> {
    return this.schema.parse(entity);
  }

  override validateMany(entities: unknown[]): Omit<User, 'token'>[] {
    return this.schema.array().parse(entities);
  }
}
