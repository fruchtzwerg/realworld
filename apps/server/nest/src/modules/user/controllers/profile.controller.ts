import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { ProfileService } from '@realworld/core';
import { contract } from '@realworld/dto';

import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @TsRestHandler(contract.profile.getProfile)
  async getProfile() {
    return tsRestHandler(contract.profile.getProfile, async ({ params }) => {
      const profile = await this.profileService.getProfile(params.username);

      if (!profile)
        return {
          status: 422,
          body: { errors: { body: ['username is invalid'] } },
        };

      return { status: 200, body: { profile } };
    });
  }

  @TsRestHandler(contract.profile.followUser)
  async followUser() {
    return tsRestHandler(contract.profile.followUser, async ({ params }) => {
      const profile = await this.profileService.followUser(params.username);

      if (!profile)
        return {
          status: 422,
          body: { errors: { body: ['username is invalid'] } },
        };

      return { status: 200, body: { profile } };
    });
  }

  @TsRestHandler(contract.profile.unfollowUser)
  async unfollowUser() {
    return tsRestHandler(contract.profile.unfollowUser, async ({ params }) => {
      const profile = await this.profileService.unfollowUser(params.username);

      if (!profile)
        return {
          status: 422,
          body: { errors: { body: ['username is invalid'] } },
        };

      return { status: 200, body: { profile } };
    });
  }
}
