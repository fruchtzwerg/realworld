import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';

import { ProfileService } from '@realworld/common';
import {
  Profile,
  ProfileSchema,
  ResolvedPayloadDto,
  User,
} from '@realworld/dto';

import { UserModel } from '../models/user.model';

@Injectable()
export class MongoProfileService extends ProfileService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly store: ClsService<ResolvedPayloadDto>
  ) {
    super();
  }

  /** Get a profile and whether the current user is following it. */
  async getProfile(username: Profile['username']): Promise<Profile | null> {
    const currentUsername = this.store.get('user.username');
    const user = await this.userModel
      .findOne({ username })
      .transform((user) => {
        if (user) {
          (user as unknown as Profile).following = user.followers.some(
            (follower) => follower.username === currentUsername
          );
        }

        return user;
      });
    if (!user) return null;

    return ProfileSchema.parse(user);
  }

  /** Follow a user. */
  async followUser(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.store.get('user.username');
    const user = await this.userModel.findOne({ username: currentUsername });
    if (!user) return null;

    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { username },
        { $addToSet: { followers: user } },
        { new: true }
      )
      .transform((user) => {
        if (user) (user as unknown as Profile).following = true;

        return user;
      });
    if (!updatedUser) return null;

    return ProfileSchema.parse(updatedUser);
  }

  /** Unfollow a user. */
  async unfollowUser(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.store.get('user.username');
    const user = await this.userModel.findOne({ username: currentUsername });
    if (!user) return null;

    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { username },
        { $pull: { followers: user.id } },
        { new: true }
      )
      .transform((user) => {
        if (user) (user as unknown as Profile).following = false;

        return user;
      });
    if (!updatedUser) return null;

    return ProfileSchema.parse(updatedUser);
  }
}
