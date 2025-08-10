import type { Profile, User } from '@realworld/dto';
import type { Context } from '../common';
import type { ProfileRepository } from './profile.repo';
import type { ProfileValidator } from './profile.validator';

export class ProfileService {
  constructor(
    private readonly ctx: Context,
    private readonly repository: ProfileRepository,
    private readonly validator: ProfileValidator
  ) {}

  /** Get profile by id */
  async getProfile(id: User['username']): Promise<Profile | null> {
    const currentUsername = this.ctx.getUsername();
    if (!currentUsername) return null;

    const user = await this.repository.findUnique(id, currentUsername);
    if (!user) return null;

    return this.validator.validate(user, currentUsername);
  }

  /** Follow a user */
  async followUser(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.ctx.getUsername();
    if (!currentUsername) return null;

    const updatedUser = await this.repository.followUser(currentUsername, username);

    return this.validator.validate(updatedUser, currentUsername);
  }

  /** Unfollow a user */
  async unfollowUser(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.ctx.getUsername();
    if (!currentUsername) return null;

    const currentUser = await this.repository.unfollowUser(currentUsername, username);

    return this.validator.validate(currentUser, currentUsername);
  }
}
