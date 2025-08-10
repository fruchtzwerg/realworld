import { Model } from 'mongoose';

import { ProfileRepository } from '@realworld/core';
import { Profile } from '@realworld/dto';

import { UserModel } from '../user/mongo-user.model';

export class MongoProfileRepository extends ProfileRepository {
  // constructor(
  //   @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  //   private readonly store: ClsService<ResolvedPayloadDto>
  // ) {
  //   super();
  // }

  constructor(private readonly userModel: Model<UserModel>) {
    super();
  }

  override findUnique(
    username: Profile['username'],
    followerUsername: Profile['username']
  ): Promise<unknown | null> {
    return this.userModel.findOne({ username }).transform((user) => {
      if (user) {
        user.following = user.followers.some((follower) => follower.username === followerUsername);
      }

      return user;
    });
  }

  override async followUser(
    follower: Profile['username'],
    followee: Profile['username']
  ): Promise<Profile | null> {
    const user = await this.userModel.findOne({ username: follower });
    if (!user) return null;

    return this.userModel
      .findOneAndUpdate({ username: followee }, { $addToSet: { followers: user } }, { new: true })
      .transform((user) => {
        if (user) (user as Profile).following = true;
        return user;
      });
  }

  override async unfollowUser(
    follower: Profile['username'],
    followee: Profile['username']
  ): Promise<Profile | null> {
    const user = await this.userModel.findOne({ username: follower });
    if (!user) return null;

    return this.userModel
      .findOneAndUpdate({ username: followee }, { $pull: { followers: user.id } }, { new: true })
      .transform((user) => {
        if (user) (user as unknown as Profile).following = false;
        return user;
      });
  }
}
