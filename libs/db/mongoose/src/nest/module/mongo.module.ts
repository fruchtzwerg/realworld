import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  AsyncModelFactory,
  getModelToken,
  ModelDefinition,
  MongooseModule,
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import {
  ArticleRepository,
  ArticleValidator,
  CommentRepository,
  CommentValidator,
  ProfileRepository,
  ProfileValidator,
  UserRepository,
  UserValidator,
} from '@realworld/core';

import {
  MongoArticleRepository,
  MongoArticleValidator,
  MongoCommentRepository,
  MongoProfileRepository,
  MongoUserRepository,
} from '../../adapters';
import {
  ArticleModel,
  ArticleModelFactory,
  ArticleModelProvider,
} from '../../adapters/article/mongo-article.model';
import {
  CommentModel,
  CommentModelFactory,
  CommentModelProvider,
} from '../../adapters/comment/mongo-comment.model';
import { MongoCommentValidator } from '../../adapters/comment/mongo-comment.validator';
import { MongoProfileValidator } from '../../adapters/profile/mongo-profile.validator';
import { MongoUserValidator } from '../../adapters/user/mongo-article.validator';
import {
  UserModel,
  UserModelFactory,
  UserModelProvider,
} from '../../adapters/user/mongo-user.model';

const getProviders = (providers: Provider[] = []): Provider[] => [
  ...providers,
  ...validators,
  {
    provide: ArticleRepository,
    useFactory: (...models: [Model<ArticleModel>, Model<UserModel>]) =>
      new MongoArticleRepository(...models),
    inject: [getModelToken(ArticleModel.name), getModelToken(UserModel.name)],
  },
  {
    provide: CommentRepository,
    useFactory: (...models: [Model<CommentModel>, Model<ArticleModel>, Model<UserModel>]) =>
      new MongoCommentRepository(...models),
    inject: [
      getModelToken(CommentModel.name),
      getModelToken(ArticleModel.name),
      getModelToken(UserModel.name),
    ],
  },
  {
    provide: ProfileRepository,
    useFactory: (...models: [Model<UserModel>]) => new MongoProfileRepository(...models),
    inject: [getModelToken(UserModel.name)],
  },
  {
    provide: UserRepository,
    useFactory: (...models: [Model<UserModel>, Model<ArticleModel>]) =>
      new MongoUserRepository(...models),
    inject: [getModelToken(UserModel.name), getModelToken(ArticleModel.name)],
  },
];

const validators = [
  { provide: ArticleValidator, useClass: MongoArticleValidator },
  { provide: CommentValidator, useClass: MongoCommentValidator },
  { provide: ProfileValidator, useClass: MongoProfileValidator },
  { provide: UserValidator, useClass: MongoUserValidator },
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
    const config = super.forFeature(
      [...models, ArticleModelProvider, UserModelProvider, CommentModelProvider],
      connectionName
    );
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
