import type { CreateUser, LoginUser, ResolvedPayload } from '@realworld/dto';

/**
 * Framework-agnostic JWT signer. Each server provides an implementation
 * backed by its native JWT library.
 *
 * The signer is responsible for adding `iat`/`exp` claims and producing the
 * signed token string.
 */
export interface JwtSigner {
  sign(payload: Omit<ResolvedPayload, 'iat' | 'exp'>): Promise<string>;
}

export type JwtPayload = Omit<ResolvedPayload, 'iat' | 'exp'>;
export type { CreateUser, LoginUser };
