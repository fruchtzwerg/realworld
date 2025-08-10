import { Inject, Injectable } from '@nestjs/common';

import { PrismaProfileRepository } from '../../adapters/profile/prisma-profile.repo';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class NestPrismaProfileRepository extends PrismaProfileRepository {
  constructor(@Inject(PRISMA) readonly client: ExtendedPrismaClient) {
    super(client);
  }
}
