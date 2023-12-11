import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { ErrorInterceptor } from './app/interceptors/error.interceptor';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useStaticAssets(join(__dirname, 'assets'));
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(environment.port);
  Logger.log(`🚀 Application is running on: http://localhost:${environment.port}/${globalPrefix}`);
}

bootstrap();
