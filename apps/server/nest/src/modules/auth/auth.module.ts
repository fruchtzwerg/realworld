import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { MongoDbModule } from '@realworld/mongoose';

import { environment } from '../../environment/environment';
import { CommonModule } from '../common/common.module';

import { JwtAuthGuardProvider } from './providers/jwt-auth.provider';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    CommonModule.forFeature(),
    PassportModule,
    MongoDbModule.forFeatureAsync(),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuardProvider],
  exports: [AuthService],
})
export class AuthModule {}
