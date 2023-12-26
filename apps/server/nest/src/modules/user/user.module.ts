import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [CommonModule.forFeature(), AuthModule],
  controllers: [UserController, ProfileController],
})
export class UserModule {}
