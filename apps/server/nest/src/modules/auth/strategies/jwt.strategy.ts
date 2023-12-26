import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ResolvedPayload, ResolvedPayloadSchema } from '@realworld/dto';

import { environment } from '../../../environment/environment';
import { ACCESS_TOKEN_STRATEGY } from '../constants/strategy.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: environment.jwt.secret,
      usernameField: 'email',
    });
  }

  validate(payload: JwtPayload): ResolvedPayload {
    return ResolvedPayloadSchema.parse(payload);
  }
}
