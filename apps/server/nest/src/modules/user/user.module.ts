import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [CommonModule.forFeature(), AuthModule],
  controllers: [UserController, ProfileController],
  exports: [UserService],
})
export class UserModule {}
