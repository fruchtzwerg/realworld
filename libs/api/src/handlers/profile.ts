import { assertFound } from '@realworld/core';
import type { ProfileDto, ProfileParams } from '@realworld/dto';

import type { HandlerContext } from '../context';

export const getProfile = async (
  ctx: HandlerContext,
  params: ProfileParams
): Promise<ProfileDto> => {
  const profile = assertFound(
    await ctx.services.profileService.getProfile(params.username),
    'profile'
  );

  return { profile };
};

export const followUser = async (
  ctx: HandlerContext,
  params: ProfileParams
): Promise<ProfileDto> => {
  const profile = assertFound(
    await ctx.services.profileService.followUser(params.username),
    'profile'
  );

  return { profile };
};

export const unfollowUser = async (
  ctx: HandlerContext,
  params: ProfileParams
): Promise<ProfileDto> => {
  const profile = assertFound(
    await ctx.services.profileService.unfollowUser(params.username),
    'profile'
  );

  return { profile };
};
