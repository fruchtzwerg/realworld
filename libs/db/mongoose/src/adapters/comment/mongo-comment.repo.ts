import { Model } from 'mongoose';

import { CommentRepository } from '@realworld/core';
import { Article, Comment, CreateComment, User } from '@realworld/dto';

import { ArticleModel } from '../article/mongo-article.model';
import { UserModel } from '../user/mongo-user.model';

import { CommentModel } from './mongo-comment.model';

const getFollowing = (username?: User['username']) => (comment: CommentModel) =>
  (comment.author.following = username
    ? comment.author.followers.some((follower) => follower.username === username)
    : false);

export class MongoCommentRepository extends CommentRepository {
  constructor(
    private readonly commentModel: Model<CommentModel>,
    private readonly articleModel: Model<ArticleModel>,
    private readonly userModel: Model<UserModel>
  ) {
    super();
  }

  override async findMany(slug: Article['slug'], username?: User['username']): Promise<Comment[]> {
    const article = await this.articleModel.findOne({ slug });
    if (!article) throw new Error('Article not found');

    return this.commentModel
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
  }

  override async create(
    slug: Article['slug'],
    username: User['username'],
    comment: CreateComment
  ): Promise<Comment> {
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

    return createdComment;
  }

  override async delete(
    slug: Article['slug'],
    username: User['username'],
    id: Comment['id']
  ): Promise<Comment> {
    const article = await this.articleModel.findOne({ slug });
    if (!article) throw new Error('Article not found');

    const deletedComment = await this.commentModel.findOneAndDelete({
      _id: id,
      article: article.id,
    });
    if (!deletedComment) throw new Error('Comment not found');

    deletedComment.author.following = getFollowing(username)(deletedComment);

    return deletedComment;
  }
}
