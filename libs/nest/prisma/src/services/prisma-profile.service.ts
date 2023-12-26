import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ProfileService } from '@realworld/common';
import { Profile, ResolvedPayloadDto, User } from '@realworld/dto';

import { PrismaProfileSchema } from '../models/profile.model';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class PrismaProfileService extends ProfileService {
  constructor(
    @Inject(PRISMA) private readonly prisma: ExtendedPrismaClient,
    private readonly store: ClsService<ResolvedPayloadDto>
  ) {
    super();
  }

  async getProfile(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.store.get('user.username');
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { followers: { where: { username: currentUsername } } },
    });
    if (!user) return null;

    return PrismaProfileSchema(currentUsername).parse(user);
  }

  async followUser(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.store.get('user.username');
    const user = await this.prisma.user.findUnique({
      where: { username: currentUsername },
    });
    if (!user) return null;

    const updatedUser = await this.prisma.user.update({
      where: { username },
      data: { followers: { connect: { id: user.id } } },
      include: { followers: { where: { username: currentUsername } } },
    });

    return PrismaProfileSchema(currentUsername).parse(updatedUser);
  }

  async unfollowUser(username: User['username']): Promise<Profile | null> {
    const currentUsername = this.store.get('user.username');
    const user = await this.prisma.user.findUnique({
      where: { username: currentUsername },
    });
    if (!user) return null;

    const updatedUser = await this.prisma.user.update({
      where: { username },
      data: { followers: { disconnect: { id: user.id } } },
      include: { followers: { where: { username: currentUsername } } },
    });

    return PrismaProfileSchema(currentUsername).parse(updatedUser);
  }
}
