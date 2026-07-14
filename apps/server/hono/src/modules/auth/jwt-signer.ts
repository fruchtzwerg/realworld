import { sign } from 'hono/jwt';

import type { JwtPayload, JwtSigner } from '@realworld/core';
import { ResolvedPayloadSchema } from '@realworld/dto';

import { environment } from '../../environment/environment';

export class HonoJwtSigner implements JwtSigner {
  async sign(payload: JwtPayload): Promise<string> {
    const iat = Math.floor(Date.now() / 1_000);
    const unsignedPayload = ResolvedPayloadSchema.parse({
      ...payload,
      iat,
      exp: iat + environment.jwt.expiresIn,
    });

    return sign(unsignedPayload, environment.jwt.secret, environment.jwt.alg);
  }
}
