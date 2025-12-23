import { Module, type DynamicModule } from '@nestjs/common';

import { ArticleModel, ArticleModelFactory, Nest as Mongo } from '@realworld/mongoose';
import { Nest as Prisma } from '@realworld/prisma';

import { environment } from '../../environment/environment';

import { AppContextProvider } from './app-context';
import { initClsModule } from './cls.store';
import { ServiceProviders } from './service.provider';

const initDatabaseAdapterForRoot = () => {
  switch (environment.database.adapter) {
    case 'prisma':
      return Prisma.PrismaModule.forRoot();
    case 'mongoose':
      return Mongo.MongoModule.forRoot(environment.database.uri);
  }
};

const initDatabaseAdapterForFeature = () => {
  switch (environment.database.adapter) {
    case 'prisma':
      return Prisma.PrismaModule.forFeature();
    case 'mongoose':
      return Mongo.MongoModule.forFeatureAsync();
  }
};

@Module({})
export class CoreModule {
  static forRoot(): DynamicModule {
    const DatabaseAdapterModule = initDatabaseAdapterForRoot();
    const ClsModule = initClsModule();

    return {
      global: true,
      module: CoreModule,
      providers: [AppContextProvider],
      imports: [DatabaseAdapterModule, ClsModule],
      exports: [AppContextProvider],
    };
  }

  static forFeature(): DynamicModule {
    const DatabaseAdapterModule = initDatabaseAdapterForFeature();

    return {
      module: CoreModule,
      providers: [...ServiceProviders],
      imports: [DatabaseAdapterModule],
      exports: [...ServiceProviders, DatabaseAdapterModule],
    };
  }
}
