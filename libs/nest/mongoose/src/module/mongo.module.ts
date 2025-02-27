import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  AsyncModelFactory,
  ModelDefinition,
  MongooseModule,
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import autopopulate from 'mongoose-autopopulate';

import { ArticleService, CommentService, ProfileService, UserService } from '@realworld/common';

import { ArticleModelFactory } from '../models/article.model';
import { CommentModelFactory } from '../models/comment.model';
import { UserModelFactory } from '../models/user.model';
import { MongoArticleService } from '../services/mongo-article.service';
import { MongoCommentService } from '../services/mongo-comment.service';
import { MongoProfileService } from '../services/mongo-profile.service';
import { MongoUserService } from '../services/mongo-user.service';

const getProviders = (providers: Provider[] = []) => [
  ...providers,
  { provide: ArticleService, useClass: MongoArticleService },
  { provide: CommentService, useClass: MongoCommentService },
  { provide: ProfileService, useClass: MongoProfileService },
  { provide: UserService, useClass: MongoUserService },
];

@Module({})
export class MongoModule extends MongooseModule {
  static override forRoot(uri: string, options?: MongooseModuleOptions): DynamicModule {
    const config = super.forRoot(uri, {
      ...options,
      autoIndex: true,
      connectionFactory: (connection) => {
        connection.plugin(autopopulate);
        return connection;
      },
    });

    const providers = getProviders(config.providers);

    return {
      ...config,
      module: MongoModule,
      providers,
      exports: providers,
    };
  }

  static override forRootAsync(options: MongooseModuleAsyncOptions): DynamicModule {
    const config = super.forRootAsync(options);
    const providers = getProviders(config.providers);

    return {
      ...config,
      module: MongoModule,
      providers,
      exports: providers,
    };
  }

  static override forFeature(
    models: ModelDefinition[] = [],
    connectionName?: string
  ): DynamicModule {
    const config = super.forFeature(models, connectionName);

    const providers = getProviders(config.providers);

    return {
      ...config,
      module: MongoModule,
      global: true,
      providers,
      exports: providers,
    };
  }

  static override forFeatureAsync(
    factories: AsyncModelFactory[] = [],
    connectionName?: string
  ): DynamicModule {
    const config = super.forFeatureAsync(
      [...factories, UserModelFactory, ArticleModelFactory, CommentModelFactory],
      connectionName
    );

    const providers = getProviders(config.providers);

    return {
      ...config,
      global: true,
      module: MongoModule,
      providers,
      exports: providers,
    };
  }
}
