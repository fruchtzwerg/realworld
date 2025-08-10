import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';

import { UserService } from '@realworld/core';
import { CreateUser, LoginUser, ResolvedPayloadSchema, User, UserSchema } from '@realworld/dto';

// TODO: To core
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async authenticate(email: LoginUser['email'], password: LoginUser['password']): Promise<User> {
    const user = await this.userService.getUserWithPasswordByEmail(email);
    if (!user) throw new UnauthorizedException();

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException();

    const token = await this.createTokens({
      sub: user.username,
      username: user.username,
      email: user.email,
    });

    return UserSchema.parse({ ...user, token });
  }

  async authorize(user: CreateUser): Promise<string> {
    const payload: JwtPayload = {
      sub: user.username,
      username: user.username,
      email: user.email,
    };
    return this.createTokens(payload);
  }

  private async createTokens(payload: JwtPayload): Promise<string> {
    const unsignedPayload = ResolvedPayloadSchema.omit({
      exp: true,
      iat: true,
    }).parse(payload);

    const access_token = await this.jwtService.signAsync(unsignedPayload);

    return access_token;
  }
}
