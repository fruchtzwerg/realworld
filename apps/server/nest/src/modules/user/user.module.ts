import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';

import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [CoreModule.forFeature(), AuthModule],
  controllers: [UserController, ProfileController],
})
export class UserModule {}
