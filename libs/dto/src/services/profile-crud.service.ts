import { Profile } from '../models/profile.dto';
import { User } from '../models/user.dto';

export interface ProfileCrudService {
  /** Get a profile and whether the current user is following it. */
  getProfile(username: Profile['username']): Promise<Profile | null>;

  /** Follow a user. */
  followUser(username: User['username']): Promise<Profile | null>;

  /** Unfollow a user. */
  unfollowUser(username: User['username']): Promise<Profile | null>;
}
