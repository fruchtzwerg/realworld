import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import mongoose, { HydratedDocument } from 'mongoose';

import { Comment } from '@realworld/dto';

import { ArticleModel } from './article.model';
import { UserModel } from './user.model';


@Schema()
export class CommentModel implements Omit<Comment, 'author' | 'id'> {
  @Prop()
  _id!: number;

  id!: number;

  @Prop({ default: new Date().toISOString() })
  createdAt!: string;

  @Prop({ default: new Date().toISOString() })
  updatedAt!: string;

  @Prop()
  body!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    autopopulate: true,
  })
  author!: UserModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleModel',
    autopopulate: true,
  })
  article!: ArticleModel;
}

export type CommentDocument = HydratedDocument<CommentModel>;
export const CommentModelSchema = SchemaFactory.createForClass(CommentModel);

export const CommentModelFactory = {
  name: CommentModel.name,
  useFactory: () => {
    const schema = CommentModelSchema;
    schema.plugin(AutoIncrementID);
    schema.virtual('id').get(function () {
      return this._id;
    });

    schema.pre('save', async function () {
      this.updatedAt = new Date().toISOString();
    });

    return schema;
  },
  collection: 'comments',
};
