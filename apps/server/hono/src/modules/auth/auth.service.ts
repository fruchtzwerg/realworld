import { compare } from 'bcrypt';
import { sign } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';

import { AuthService as BaseAuthService, UserService } from '@realworld/core';
import { LoginUser, User, CreateUser, UserSchema, ResolvedPayloadSchema } from '@realworld/dto';

import { environment } from '../../environment/environment';
import { UnauthorizedError } from '../../errors/unauthorized.error';

export class AuthService extends BaseAuthService {
  constructor(private readonly userService: UserService) {
    super();
  }

  async authenticate(email: LoginUser['email'], password: LoginUser['password']): Promise<User> {
    const user = await this.userService.getUserWithPasswordByEmail(email);
    if (!user) throw new UnauthorizedError();

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedError();

    const token = await this.createTokens({
      sub: user.username,
      username: user.username,
      email: user.email,
    });

    return UserSchema.parse({ ...user, token });
  }

  async authorize(user: CreateUser): Promise<string> {
    const payload: JWTPayload = {
      sub: user.username,
      username: user.username,
      email: user.email,
    };

    return this.createTokens(payload);
  }

  private async createTokens(payload: JWTPayload): Promise<string> {
    const iat = Math.floor(Date.now() / 1_000);
    const unsignedPayload = ResolvedPayloadSchema.parse({
      ...payload,
      iat,
      exp: iat + environment.jwt.expiresIn,
    });

    const access_token = await sign(unsignedPayload, environment.jwt.secret, environment.jwt.alg);

    return access_token;
  }
}
