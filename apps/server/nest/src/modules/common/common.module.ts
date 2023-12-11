import { DynamicModule, Module } from '@nestjs/common';

import { MongoModule } from '@realworld/mongoose';

import { environment } from '../../environment/environment';

const getDatabaseAdapterForRoot = () => {
  switch (environment.database.adapter) {
    case 'mongoose':
      return MongoModule.forRoot(environment.database.uri);
  }
};

const getDatabaseAdapterForFeature = () => {
  switch (environment.database.adapter) {
    case 'mongoose':
      return MongoModule.forFeatureAsync();
  }
};

@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    const databaseAdapterModule = getDatabaseAdapterForRoot();

    return {
      module: CommonModule,
      imports: [databaseAdapterModule],
      exports: [databaseAdapterModule],
    };
  }

  static forFeature(): DynamicModule {
    const databaseAdapterModule = getDatabaseAdapterForFeature();

    return {
      module: CommonModule,
      imports: [databaseAdapterModule],
      exports: [databaseAdapterModule],
    };
  }
}
