import { Inject, Injectable } from '@nestjs/common';

import { PrismaArticleRepository } from '../../adapters/article/prisma-article.repo';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class NestPrismaArticleRepository extends PrismaArticleRepository {
  constructor(@Inject(PRISMA) readonly client: ExtendedPrismaClient) {
    super(client);
  }
}
