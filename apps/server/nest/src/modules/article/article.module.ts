import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

import { ArticleController } from './controllers/article.controller';
import { CommentController } from './controllers/comment.controller';
import { TagController } from './controllers/tag.controller';

@Module({
  imports: [UserModule, AuthModule, CommonModule.forFeature()],
  controllers: [ArticleController, CommentController, TagController],
})
export class ArticleModule {}
