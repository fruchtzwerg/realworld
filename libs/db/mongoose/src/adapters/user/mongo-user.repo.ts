import { Model } from 'mongoose';

import { UserRepository } from '@realworld/core';
import { CreateUserDto, RawUser, UpdateUserDto, UpdateUserSchema, User } from '@realworld/dto';

import { ArticleModel } from '../article/mongo-article.model';

import type { UserModel } from './mongo-user.model';

export class MongoUserRepository extends UserRepository {
  constructor(
    private readonly userModel: Model<UserModel>,
    private readonly articleModel: Model<ArticleModel>
  ) {
    super();
  }

  override async create(userDto: CreateUserDto): Promise<Omit<User, 'token'>> {
    const createdUser = new this.userModel(userDto.user);
    return await createdUser.save();
  }

  override async findByUsername(username: User['username']): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  override async findByEmail(email: User['email']): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  override async findWithPasswordByEmail(email: User['email']): Promise<RawUser | null> {
    return this.userModel.findOne({ email }).select('+password');
  }

  override async update(username: User['username'], userDto: UpdateUserDto): Promise<User | null> {
    // TODO: move validation to core
    return this.userModel.findOneAndUpdate({ username }, UpdateUserSchema.parse(userDto.user), {
      new: true,
    });
  }

  override async delete(username: User['username']): Promise<Omit<User, 'token'> | null> {
    const user = await this.userModel.findOneAndDelete({ username });
    if (!user) return null;

    await this.articleModel.deleteMany({ author: user });

    return user;
  }

  override async deleteAll() {
    // await this.userModel.deleteMany({});
    const users = await this.userModel.find({ username: /^username-/ });
    await this.userModel.deleteMany({ username: /^username-/ });
    await this.articleModel.deleteMany({ author: { $in: users } });
    await this.articleModel.deleteMany({ title: /^ggn-title-/ });
  }

  override async findMany(): Promise<Omit<User, 'token'>[]> {
    return this.userModel.find({});
  }
}
