import { Controller, Inject } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import type { HandlerContext } from '@realworld/api';
import { tagHandlers } from '@realworld/api';
import type { Services } from '@realworld/core';
import { contract } from '@realworld/dto';

import { SERVICES } from '../../auth/auth.module';
import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class TagController {
  constructor(@Inject(SERVICES) private readonly services: Services) {}

  @Public()
  @Implement(contract.tags.getTags)
  getTags() {
    return implement(contract.tags.getTags).handler(async () => {
      const ctx: HandlerContext = { services: this.services };
      return tagHandlers.getTags(ctx);
    });
  }
}
