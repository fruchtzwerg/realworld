import type { JwtSignOptions } from '@nestjs/jwt';
import { z } from 'zod';

import { UserSchema } from './user.dto';

export const JwtOptionsSchema: z.ZodType<JwtSignOptions> = z
  .object({
    secret: z.any(),
    privateKey: z.any(),
    algorithms: z.any(),
    audience: z.any(),
    clockTimestamp: z.any(),
    clockTolerance: z.any(),
    complete: z.any(),
    issuer: z.any(),
    ignoreExpiration: z.any(),
    ignoreNotBefore: z.any(),
    jwtid: z.any(),
    nonce: z.any(),
    subject: z.any(),
    maxAge: z.any(),
    allowInvalidAsymmetricKeyTypes: z.any(),
  })
  .partial();

export const ResolvedPayloadSchema = z.object({
  sub: UserSchema.shape.username,
  username: UserSchema.shape.username,
  email: UserSchema.shape.email,
  iat: z.number().int().positive(),
  exp: z.number().int().positive(),
});

export type ResolvedPayload = z.infer<typeof ResolvedPayloadSchema>;
