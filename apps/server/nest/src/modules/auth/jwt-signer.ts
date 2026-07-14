import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload, JwtSigner } from '@realworld/core';

@Injectable()
export class NestJwtSigner implements JwtSigner {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
