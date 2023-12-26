import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';

import { UserService } from '@realworld/common';
import {
  CreateUserDto,
  RawUser,
  RawUserSchema,
  Store,
  UpdateUserDto,
  UpdateUserSchema,
  User,
  UserSchema,
} from '@realworld/dto';

import { ArticleModel } from '../models/article.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class MongoUserService extends UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(ArticleModel.name)
    private readonly articleModel: Model<ArticleModel>,
    private readonly store: ClsService<Store>
  ) {
    super();
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const token = this.store.get('token');
    const createdUser = new this.userModel(userDto.user);
    const user = await createdUser.save();

    (user as unknown as User).token = token;

    return UserSchema.parse(user);
  }

  async getUserByUsername(username: User['username']): Promise<User | null> {
    const token = this.store.get('token');
    const user = await this.userModel.findOne({ username });
    if (!user) return null;

    if (token) (user as unknown as User).token = token;

    return UserSchema.parse(user);
  }

  async getUserByEmail(email: User['email']): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    return UserSchema.parse(user);
  }

  async getUserWithPasswordByEmail(email: User['email']): Promise<RawUser | null> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) return null;

    return RawUserSchema.parse(user);
  }

  async updateUser(username: User['username'], userDto: UpdateUserDto): Promise<User | null> {
    const token = this.store.get('token');
    const user = await this.userModel.findOneAndUpdate(
      { username },
      UpdateUserSchema.parse(userDto.user),
      { new: true }
    );
    if (!user) return null;

    (user as unknown as User).token = token;

    return UserSchema.parse(user);
  }

  async deleteUser(username: User['username']): Promise<Omit<User, 'token'> | null> {
    const user = await this.userModel.findOneAndDelete({ username });
    if (!user) return null;

    await this.articleModel.deleteMany({ author: user });

    return UserSchema.omit({ token: true }).parse(user);
  }

  async deleteAllUsers() {
    // await this.userModel.deleteMany({});
    const users = await this.userModel.find({ username: /^username-/ });
    await this.userModel.deleteMany({ username: /^username-/ });
    await this.articleModel.deleteMany({ author: { $in: users } });
    await this.articleModel.deleteMany({ title: /^ggn-title-/ });
  }

  async getAllUsers(): Promise<Omit<User, 'token'>[]> {
    const users = await this.userModel.find({});
    return UserSchema.omit({ token: true }).array().parse(users);
  }
}
