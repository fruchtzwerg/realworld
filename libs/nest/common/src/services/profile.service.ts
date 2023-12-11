import { Profile } from '@realworld/dto';

export abstract class ProfileService {
  /** Get a profile and whether the current user is following it. */
  abstract getProfile(username: Profile['username']): Promise<Profile | null>;

  /** Follow a user. */
  abstract followUser(username: Profile['username']): Promise<Profile | null>;

  /** Unfollow a user. */
  abstract unfollowUser(username: Profile['username']): Promise<Profile | null>;
}
