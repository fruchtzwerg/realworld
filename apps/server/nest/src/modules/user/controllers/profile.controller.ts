import { Controller } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import { ProfileService } from '@realworld/core';
import { contract } from '@realworld/dto';

import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @Implement(contract.profile.getProfile)
  async getProfile() {
    return implement(contract.profile.getProfile).handler(async ({ input, errors }) => {
      const profile = await this.profileService.getProfile(input.params.username);

      if (!profile) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['username is invalid'] } } });
      }

      return { profile };
    });
  }

  @Implement(contract.profile.followUser)
  async followUser() {
    return implement(contract.profile.followUser).handler(async ({ input, errors }) => {
      const profile = await this.profileService.followUser(input.params.username);

      if (!profile) {
        throw errors.UNPROCESSABLE_CONTENT({
          data: { errors: { body: ['username is invalid'] } },
        });
      }

      return { profile };
    });
  }

  @Implement(contract.profile.unfollowUser)
  async unfollowUser() {
    return implement(contract.profile.unfollowUser).handler(async ({ input, errors }) => {
      const profile = await this.profileService.unfollowUser(input.params.username);

      if (!profile) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['username is invalid'] } } });
      }

      return { profile };
    });
  }
}
