import { ProfileValidator } from '@realworld/core';
import type { Profile } from '@realworld/dto';

import { PrismaProfileSchema } from './prisma-profile.model';

export class PrismaProfileValidator extends ProfileValidator {
  override validate(entity: unknown, username?: string): Profile {
    return PrismaProfileSchema(username).parse(entity);
  }

  override validateMany(entities: unknown[], username?: string): Profile[] {
    return PrismaProfileSchema(username).array().parse(entities);
  }
}
