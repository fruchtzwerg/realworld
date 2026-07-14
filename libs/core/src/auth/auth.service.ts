import { compare } from 'bcrypt';

import type { CreateUser, LoginUser, User } from '@realworld/dto';
import { UserSchema } from '@realworld/dto';

import { UnauthorizedError } from '../common/errors';
import type { UserService } from '../user/user.service';

import type { JwtPayload, JwtSigner } from './jwt-signer';

export class AuthService {
  constructor(private readonly jwtSigner: JwtSigner, private readonly userService: UserService) {}

  /** Verify credentials and return the user with a fresh token. */
  async authenticate(email: LoginUser['email'], password: LoginUser['password']): Promise<User> {
    const user = await this.userService.getUserWithPasswordByEmail(email);
    if (!user) throw new UnauthorizedError();

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedError();

    const token = await this.signFor(user);
    return UserSchema.parse({ ...user, token });
  }

  /** Mint a token for a newly-registered user. */
  async authorize(user: CreateUser): Promise<string> {
    return this.signFor(user);
  }

  private async signFor(user: { username: string; email: string }): Promise<string> {
    const payload: JwtPayload = {
      sub: user.username,
      username: user.username,
      email: user.email,
    };

    return this.jwtSigner.sign(payload);
  }
}
