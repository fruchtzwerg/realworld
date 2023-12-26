import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { UserService } from '@realworld/common';
import {
  CreateUserDto,
  RawUser,
  RawUserSchema,
  Store,
  UpdateUserDto,
  User,
  UserSchema,
} from '@realworld/dto';

import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class PrismaUserService extends UserService {
  constructor(
    @Inject(PRISMA) private readonly prisma: ExtendedPrismaClient,
    private readonly store: ClsService<Store>
  ) {
    super();
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const token = this.store.get('token');
    const createdUser = await this.prisma.user.create({
      data: userDto.user,
      include: { followers: true },
    });

    (createdUser as unknown as User).token = token;

    return UserSchema.parse(createdUser);
  }

  async getUserByUsername(username: User['username']): Promise<User | null> {
    const token = this.store.get('token');
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) return null;

    if (token) (user as unknown as User).token = token;

    return UserSchema.parse(user);
  }

  async getUserByEmail(email: User['email']): Promise<User | null> {
    const user = this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return UserSchema.parse(user);
  }

  async getUserWithPasswordByEmail(email: User['email']): Promise<RawUser | null> {
    const user = await this.prisma.user.findUniqueRaw(email);
    if (!user) return null;

    return RawUserSchema.parse(user);
  }

  async updateUser(username: User['username'], userDto: UpdateUserDto): Promise<User | null> {
    const token = this.store.get('token');
    const user = await this.prisma.user.update({ where: { username }, data: userDto.user });
    if (!user) return null;

    (user as unknown as User).token = token;

    return UserSchema.parse(user);
  }

  async deleteUser(username: User['username']): Promise<Omit<User, 'token'> | null> {
    const user = await this.prisma.user.delete({ where: { username } });
    if (!user) return null;

    return UserSchema.omit({ token: true }).parse(user);
  }

  async deleteAllUsers(): Promise<void> {
    await this.prisma.user.deleteMany({ where: { username: { startsWith: 'username-' } } });
  }

  async getAllUsers(): Promise<Omit<User, 'token'>[]> {
    const users = await this.prisma.user.findMany();
    return UserSchema.omit({ token: true }).array().parse(users);
  }
}
