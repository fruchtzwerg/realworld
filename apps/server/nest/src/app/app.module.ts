import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Request } from 'express';
import { ClsModule } from 'nestjs-cls';
import { join } from 'path';

import { ResolvedPayloadDto } from '@realworld/dto';

import { environment } from '../environment/environment';
import { ArticleModule } from '../modules/article/article.module';
import { AuthModule } from '../modules/auth/auth.module';
import { CommonModule } from '../modules/common/common.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    CommonModule.forRoot(),
    ClsModule.forRoot({
      global: true,
      interceptor: {
        mount: true,
        setup: (store, context) => {
          const req = context
            .switchToHttp()
            .getRequest<Request<ResolvedPayloadDto>>();

          store.set('user', req.user);
          store.set('token', req.headers.authorization?.split(' ')[1]);
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, environment.clientPath),
    }),
    AuthModule,
    UserModule,
    ArticleModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure(environment.production ? 'combined' : 'dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
