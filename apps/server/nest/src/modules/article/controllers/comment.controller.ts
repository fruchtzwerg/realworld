import { Controller, Inject } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import type { HandlerContext } from '@realworld/api';
import { commentHandlers } from '@realworld/api';
import type { Services } from '@realworld/core';
import { contract } from '@realworld/dto';

import { SERVICES } from '../../auth/auth.module';
import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class CommentController {
  constructor(@Inject(SERVICES) private readonly services: Services) {}

  @Public()
  @Implement(contract.comments.getComments)
  async getComments() {
    return implement(contract.comments.getComments).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return commentHandlers.getComments(ctx, input.params);
    });
  }

  @Implement(contract.comments.createComment)
  async createComment() {
    return implement(contract.comments.createComment).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return commentHandlers.createComment(ctx, input.params, input.body);
    });
  }

  @Implement(contract.comments.deleteComment)
  async deleteComment() {
    return implement(contract.comments.deleteComment).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return commentHandlers.deleteComment(ctx, input.params);
    });
  }
}
