import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ArticleModule } from '../modules/article/article.module';
import { AuthModule } from '../modules/auth/auth.module';
import { CoreModule } from '../modules/core/core.module';
import { UserModule } from '../modules/user/user.module';

import { DocsController } from './controllers/docs.controller';

@Module({
  imports: [
    CoreModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/vue'),
      serveRoot: '/vue',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/react'),
      serveRoot: '/react',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/angular/browser'),
      serveRoot: '/angular',
    }),
    AuthModule,
    UserModule,
    ArticleModule,
  ],
  exports: [CoreModule],
  controllers: [DocsController],
})
export class AppModule {}
