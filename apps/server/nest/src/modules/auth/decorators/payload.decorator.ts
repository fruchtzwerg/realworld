import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import { ResolvedPayload, User } from '@realworld/dto';

type Key = keyof Pick<User, 'username' | 'email'>;

export const extractPayload = <
  K extends Key | null | undefined,
  T extends (K extends Key ? User[K] : User) | undefined
>(
  data?: K,
  ctx?: ExecutionContext
): T => {
  const request = ctx?.switchToHttp().getRequest<{ user: ResolvedPayload }>();
  const user = request?.user;

  return (data ? user?.[data] : user) as T;
};

export const Payload = createParamDecorator(extractPayload);
