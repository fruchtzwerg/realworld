import type { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const JwtAuthGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
