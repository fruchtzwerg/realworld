import { Controller } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import { CommentService } from '@realworld/core';
import { contract } from '@realworld/dto';

import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Implement(contract.comments.getComments)
  async getComments() {
    return implement(contract.comments.getComments).handler(async ({ input }) => {
      const comments = await this.commentService.getComments(input.params.slug);

      return { comments };
    });
  }

  @Implement(contract.comments.createComment)
  async createComment() {
    return implement(contract.comments.createComment).handler(async ({ input }) => {
      const comment = await this.commentService.createComment(
        input.params.slug,
        input.body.comment
      );

      return { comment };
    });
  }

  @Implement(contract.comments.deleteComment)
  async deleteComment() {
    return implement(contract.comments.deleteComment).handler(async ({ input }) => {
      await this.commentService.deleteComment(input.params.slug, input.params.id);
    });
  }
}
