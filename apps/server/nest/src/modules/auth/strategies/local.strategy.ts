import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@realworld/dto';

import { LOCAL_STRATEGY } from '../constants/strategy.const';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'user[]email',
      passwordField: 'user[]password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.authenticate(email, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
