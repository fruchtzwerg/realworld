import { Controller } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import { ArticleService } from '@realworld/core';
import { contract } from '@realworld/dto';

import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class TagController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Implement(contract.tags.getTags)
  getTags() {
    return implement(contract.tags.getTags).handler(async () => {
      const tags = await this.articleService.getTags();

      return { tags };
    });
  }
}
