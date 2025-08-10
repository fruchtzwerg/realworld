import { UserRepository } from '@realworld/core';
import { CreateUserDto, User, type UpdateUserDto } from '@realworld/dto';

import { ExtendedPrismaClient } from '../../factories/prisma.factory';

export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {
    super();
  }

  override create(userDto: CreateUserDto): Promise<unknown> {
    return this.prisma.user.create({
      data: userDto.user,
      include: { followers: true },
    });
  }

  override findByUsername(username: User['username']): Promise<unknown | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  override findByEmail(email: User['email']): Promise<unknown | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  override findWithPasswordByEmail(email: User['email']): Promise<unknown | null> {
    return this.prisma.user.findUniqueRaw(email);
  }

  override update(username: User['username'], userDto: UpdateUserDto): Promise<unknown | null> {
    return this.prisma.user.update({ where: { username }, data: userDto.user });
  }

  override delete(username: User['username']): Promise<unknown> {
    return this.prisma.user.delete({ where: { username } });
  }

  override deleteAll(): Promise<unknown> {
    return this.prisma.user.deleteMany({ where: { username: { startsWith: 'username-' } } });
  }

  override findMany(): Promise<unknown[]> {
    return this.prisma.user.findMany();
  }
}
