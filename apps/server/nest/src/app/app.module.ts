import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { environment } from '../environment/environment';
import { ArticleModule } from '../modules/article/article.module';
import { AuthModule } from '../modules/auth/auth.module';
import { CoreModule } from '../modules/core/core.module';
import { UserModule } from '../modules/user/user.module';

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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure(environment.production ? 'combined' : 'dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
