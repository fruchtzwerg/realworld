import type { Profile } from '@realworld/dto';

export abstract class ProfileValidator {
  // Define validation contracts for the domain
  abstract validate(entity: unknown, username: Profile['username']): Profile;
  abstract validateMany(entities: unknown[], username: Profile['username']): Profile[];
}
