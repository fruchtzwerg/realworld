import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { articleContract } from './article.contract';
import { commentsContract } from './comments.contract';
import { favoritesContract } from './favorites.contract';
import { profileContract } from './profile.contract';
import { tagsContract } from './tags.contract';
import { userContract } from './user.contract';


const c = initContract();

export const contract = c.router(
  {
    user: userContract,
    article: articleContract,
    profile: profileContract,
    tags: tagsContract,
    favorites: favoritesContract,
    comments: commentsContract,
  },
  {
    baseHeaders: z.object({
      authorization: z.string().optional(),
    }),
  }
);
