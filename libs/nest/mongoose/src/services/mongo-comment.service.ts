import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';

import { CommentService } from '@realworld/common';
import {
  Article,
  Comment,
  CommentSchema,
  CreateComment,
  ResolvedPayloadDto,
  User,
} from '@realworld/dto';

import { ArticleModel } from '../models/article.model';
import { CommentModel } from '../models/comment.model';
import { UserModel } from '../models/user.model';

const getFollowing = (username?: User['username']) => (comment: CommentModel) =>
  (comment.author.following = username
    ? comment.author.followers.some((follower) => follower.username === username)
    : false);

@Injectable()
export class MongoCommentService extends CommentService {
  constructor(
    @InjectModel(CommentModel.name)
    private readonly commentModel: Model<CommentModel>,
    @InjectModel(ArticleModel.name)
    private readonly articleModel: Model<ArticleModel>,
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly store: ClsService<ResolvedPayloadDto>
  ) {
    super();
  }

  async getComments(slug: Article['slug'], username?: User['username']): Promise<Comment[]> {
    const article = await this.articleModel.findOne({ slug });
    if (!article) throw new Error('Article not found');

    const comments = await this.commentModel
      .find({ article: article.id })
      .sort({ updatedAt: -1 })
      .transform(async (comments) => {
        if (!username) {
          comments.forEach(getFollowing());
          return comments;
        }

        const user = await this.userModel.findOne({ username });
        if (!user) {
          comments.forEach(getFollowing());
          return comments;
        }

        comments.forEach(getFollowing(username));
        return comments;
      });

    return CommentSchema.array().parse(comments);
  }

  async createComment(slug: Article['slug'], comment: CreateComment): Promise<Comment> {
    const username = this.store.get('user.username');
    const article = await this.articleModel.findOne({ slug });
    if (!article) throw new Error('Article not found');

    const author = await this.userModel.findOne({ username });
    if (!author) throw new Error('Author not found');

    const createdComment = await this.commentModel.create({
      ...comment,
      article,
      author,
    });

    createdComment.author.following = false;

    return CommentSchema.parse(createdComment.toObject({ virtuals: true }));
  }

  async deleteComment(slug: Article['slug'], id: Comment['id']): Promise<Comment> {
    const username = this.store.get('user.username');
    const article = await this.articleModel.findOne({ slug });
    if (!article) throw new Error('Article not found');

    const deletedComment = (await this.commentModel.findOneAndDelete({
      _id: id,
      article: article.id,
    })) as unknown as
      | (Document<unknown, unknown, CommentModel> &
          CommentModel &
          Required<{
            _id: number;
          }>)
      | null;
    if (!deletedComment) throw new Error('Comment not found');

    deletedComment.author.following = getFollowing(username)(deletedComment);

    return CommentSchema.parse(deletedComment);
  }
}
