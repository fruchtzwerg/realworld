import type { Request } from 'express';
import { ClsModule } from 'nestjs-cls';

import type { ResolvedPayloadDto } from '@realworld/dto';

export const initClsModule = () =>
  ClsModule.forRoot({
    global: true,
    interceptor: {
      mount: true,
      setup: (store, context) => {
        const req = context.switchToHttp().getRequest<Request & ResolvedPayloadDto>();

        store.set('user', req.user);
        store.set('token', req.headers.authorization?.split(' ')[1]);
      },
    },
  });
