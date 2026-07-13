import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './app/filters/all-exceptions.filter';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // https://orpc.dev/docs/openapi/integrations/implement-contract-in-nest#body-parser
    bodyParser: false,
  });

  // Re-enable only the JSON body parser so guards running before the oRPC handler
  // (e.g. LocalAuthGuard -> passport-local) can read `req.body`. oRPC will use
  // the Nest-parsed body when available. Only the `urlencoded` (bracket-notation)
  // and JSON-file-upload cases noted in the oRPC docs remain disabled.
  app.useBodyParser('json');

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useStaticAssets(join(__dirname, 'assets'));
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(environment.port);
  Logger.log(`🚀 Application is running on: http://localhost:${environment.port}/${globalPrefix}`);
}

bootstrap();
