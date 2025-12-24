import { ProfileRepository } from '@realworld/core';
import type { Profile } from '@realworld/dto';

import { ExtendedPrismaClient } from '../../factories/prisma.factory';

export class PrismaProfileRepository extends ProfileRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {
    super();
  }

  override findUnique(
    username: Profile['username'],
    follower?: Profile['username']
  ): Promise<unknown | null> {
    console.log('PrismaProfileRepository.findUnique', { username, follower });
    return this.prisma.user.findUnique({
      where: { username },
      // include: follower ? { followers: { where: { username: follower } } } : undefined,
    });
  }

  override async followUser(
    follower: Profile['username'],
    followee: Profile['username']
  ): Promise<unknown | null> {
    const user = await this.prisma.user.findUnique({ where: { username: follower } });
    if (!user) return null;

    return this.prisma.user.update({
      where: { username: followee },
      data: { followers: { connect: { id: user.id } } },
      include: { followers: { where: { username: follower } } },
    });
  }

  override async unfollowUser(
    follower: Profile['username'],
    followee: Profile['username']
  ): Promise<unknown | null> {
    const user = await this.prisma.user.findUnique({ where: { username: follower } });
    if (!user) return null;

    return this.prisma.user.update({
      where: { username: followee },
      data: { followers: { disconnect: { id: user.id } } },
      include: { followers: { where: { username: follower } } },
    });
  }
}
