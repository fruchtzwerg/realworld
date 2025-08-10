import { Inject, Injectable } from '@nestjs/common';

import { PrismaUserRepository } from '../../adapters/user/prisma-user.repo';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class NestPrismaUserRepository extends PrismaUserRepository {
  constructor(@Inject(PRISMA) readonly client: ExtendedPrismaClient) {
    super(client);
  }
}
