import type { Article } from '@realworld/dto';

import { BaseValidator } from '../common/validators/base.validator';

export abstract class ArticleValidator extends BaseValidator<Article> {}
