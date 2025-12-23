import { BypassValidator, type ProfileValidator } from '@realworld/core';
import type { Profile } from '@realworld/dto';

export class MongoProfileValidator extends BypassValidator<Profile> implements ProfileValidator {}
