import { Controller, Inject } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import type { HandlerContext } from '@realworld/api';
import { profileHandlers } from '@realworld/api';
import type { Services } from '@realworld/core';
import { contract } from '@realworld/dto';

import { SERVICES } from '../../auth/auth.module';
import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class ProfileController {
  constructor(@Inject(SERVICES) private readonly services: Services) {}

  @Public()
  @Implement(contract.profile.getProfile)
  async getProfile() {
    return implement(contract.profile.getProfile).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return profileHandlers.getProfile(ctx, input.params);
    });
  }

  @Implement(contract.profile.followUser)
  async followUser() {
    return implement(contract.profile.followUser).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return profileHandlers.followUser(ctx, input.params);
    });
  }

  @Implement(contract.profile.unfollowUser)
  async unfollowUser() {
    return implement(contract.profile.unfollowUser).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return profileHandlers.unfollowUser(ctx, input.params);
    });
  }
}
