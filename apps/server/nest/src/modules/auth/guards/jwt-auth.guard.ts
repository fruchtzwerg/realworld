import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { createZodDto } from 'nestjs-zod';
import { catchError, from } from 'rxjs';

import { ResolvedPayloadSchema } from '@realworld/dto';

import { ACCESS_TOKEN_STRATEGY } from '../constants/strategy.const';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';


export class ResolvedPayloadDto extends createZodDto(ResolvedPayloadSchema) {}

const handleError = (isPublic: boolean) => async (err: unknown) => {
  if (isPublic) return true;
  throw err;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      const canActivate = super.canActivate(context);

      if (typeof canActivate === 'boolean')
        return isPublic ? true : canActivate;

      return from(canActivate).pipe(catchError(handleError(isPublic)));
    } catch (err) {
      return handleError(isPublic)(err);
    }
  }
}
