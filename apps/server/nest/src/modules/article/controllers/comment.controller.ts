import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { CommentService } from '@realworld/common';
import { contract } from '@realworld/dto';

import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @TsRestHandler(contract.comments.getComments)
  async getComments() {
    return tsRestHandler(contract.comments.getComments, async ({ params }) => {
      const comments = await this.commentService.getComments(params.slug);

      return { status: 200, body: { comments } };
    });
  }

  @TsRestHandler(contract.comments.createComment)
  async createComment() {
    return tsRestHandler(
      contract.comments.createComment,
      async ({ params, body }) => {
        const comment = await this.commentService.createComment(
          params.slug,
          body.comment
        );

        return { status: 200, body: { comment } };
      }
    );
  }

  @TsRestHandler(contract.comments.deleteComment, { validateResponses: false })
  async deleteComment() {
    return tsRestHandler(
      contract.comments.deleteComment,
      async ({ params }) => {
        await this.commentService.deleteComment(params.slug, params.id);

        return { status: 200, body: null };
      }
    );
  }
}
