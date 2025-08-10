import type { Profile } from '@realworld/dto';

export abstract class ProfileRepository {
  /** Get a profile and whether the current user is following it. */
  abstract findUnique(
    username: Profile['username'],
    follower: Profile['username']
  ): Promise<unknown | null>;

  /** Follow a user. */
  abstract followUser(
    follower: Profile['username'],
    followee: Profile['username']
  ): Promise<unknown>;

  /** Unfollow a user. */
  abstract unfollowUser(
    follower: Profile['username'],
    followee: Profile['username']
  ): Promise<unknown>;
}
