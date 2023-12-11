import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { ArticleService } from '@realworld/common';
import { contract } from '@realworld/dto';

import { Public } from '../../auth/decorators/public.decorator';
import { ArticleService } from '../services/article.service';

@Controller()
export class TagController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @TsRestHandler(contract.tags.getTags)
  getTags() {
    return tsRestHandler(contract.tags.getTags, async () => {
      const tags = await this.articleService.getTags();

      return { status: 200, body: { tags } };
    });
  }
}
