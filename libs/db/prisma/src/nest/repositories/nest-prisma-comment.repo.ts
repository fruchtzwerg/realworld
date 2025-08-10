import { Inject, Injectable } from '@nestjs/common';

import { PrismaCommentRepository } from '../../adapters/comment/prisma-comment.repo';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class NestPrismaCommentRepository extends PrismaCommentRepository {
  constructor(@Inject(PRISMA) readonly client: ExtendedPrismaClient) {
    super(client);
  }
}
