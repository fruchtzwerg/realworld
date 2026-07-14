import { articleContract } from './article.contract';
import { commentsContract } from './comments.contract';
import { favoritesContract } from './favorites.contract';
import { profileContract } from './profile.contract';
import { tagsContract } from './tags.contract';
import { userContract } from './user.contract';

export const contract = {
  user: userContract,
  article: articleContract,
  profile: profileContract,
  tags: tagsContract,
  favorites: favoritesContract,
  comments: commentsContract,
};
