import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
  getModelToken,
} from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

import { Article } from '@realworld/dto';

import { CommentModel } from './comment.model';
import { UserModel } from './user.model';

@Schema()
export class ArticleModel
  implements Omit<Article, 'author' | 'favorited' | 'favoritesCount'>
{
  @Prop({ unique: true }) slug!: string;
  @Prop({ trim: true }) title!: string;
  @Prop({ trim: true }) description!: string;
  @Prop({ trim: true }) body!: string;
  @Prop([String]) tagList!: string[];
  @Prop({ default: new Date().toISOString() }) createdAt!: string;
  @Prop({ default: new Date().toISOString() }) updatedAt!: string;
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        autopopulate: true,
      },
    ],
  })
  favoritedBy!: UserModel[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    autopopulate: true,
  })
  author!: UserModel;
}

export type ArticleDocument = HydratedDocument<ArticleModel>;
export const ArticleModelSchema = SchemaFactory.createForClass(ArticleModel);

export const ArticleModelFactory: AsyncModelFactory = {
  name: ArticleModel.name,
  inject: [getModelToken(CommentModel.name)],
  useFactory: (commentModel: Model<CommentModel>) => {
    const schema = ArticleModelSchema;

    schema.pre('save', function (next) {
      if (this.isModified('title'))
        this.slug = this.title.toLowerCase().replace(/\s/g, '-');
      this.updatedAt = new Date().toISOString();
      next();
    });

    schema.pre(
      ['deleteOne', 'deleteMany', 'findOneAndDelete'],
      async function (next) {
        await commentModel.deleteMany({ article: this.get('id') });
        next();
      }
    );

    return schema;
  },
  collection: 'articles',
};
