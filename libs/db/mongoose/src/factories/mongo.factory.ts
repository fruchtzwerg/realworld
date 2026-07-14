import mongoose, { type Model, type Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { ArticleModel, ArticleModelFactory } from '../adapters/article/mongo-article.model';
import { CommentModel, CommentModelFactory } from '../adapters/comment/mongo-comment.model';
import { UserModel, UserModelFactory } from '../adapters/user/mongo-user.model';

export interface MongoModels {
  userModel: Model<UserModel>;
  articleModel: Model<ArticleModel>;
  commentModel: Model<CommentModel>;
}

let models: MongoModels | undefined;

/**
 * Standalone Mongoose model factory — the non-Nest counterpart of
 * `MongoModule.forFeatureAsync`. Reuses the same schema hook setup
 * (`UserModelFactory`, `CommentModelFactory`, `ArticleModelFactory`) that the
 * Nest module applies, so password hashing, slug generation, comment
 * auto-increment IDs, and cascade deletes behave identically.
 */
export const MongoClientFactory = async (uri: string): Promise<MongoModels> => {
  if (models) return models;

  const connection = mongoose.createConnection(uri);
  await connection.asPromise();

  connection.plugin(autopopulate);

  const userSchema = UserModelFactory.useFactory() as Schema;
  const commentSchema = CommentModelFactory.useFactory() as Schema;

  const userModel = connection.model(
    UserModel.name,
    userSchema,
    UserModelFactory.collection
  ) as unknown as Model<UserModel>;
  const commentModel = connection.model(
    CommentModel.name,
    commentSchema,
    CommentModelFactory.collection
  ) as unknown as Model<CommentModel>;

  const articleSchema = ArticleModelFactory.useFactory(commentModel) as Schema;
  const articleModel = connection.model(
    ArticleModel.name,
    articleSchema,
    ArticleModelFactory.collection
  ) as unknown as Model<ArticleModel>;

  models = { userModel, articleModel, commentModel };
  return models;
};
