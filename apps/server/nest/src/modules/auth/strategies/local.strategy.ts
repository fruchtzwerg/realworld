import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@realworld/core';
import { User } from '@realworld/dto';

import { LOCAL_STRATEGY } from '../constants/strategy.const';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'user[]email',
      passwordField: 'user[]password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authService.authenticate(email, password);
  }
}
