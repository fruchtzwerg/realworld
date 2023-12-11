import { initContract } from '@ts-rest/core';

import { ErrorSchema } from '../models/error.dto';
import { TagsDtoSchema } from '../models/tag.dto';

const c = initContract();

export const tagsContract = c.router({
  getTags: {
    method: 'GET',
    path: '/tags',
    responses: {
      200: TagsDtoSchema,
      422: ErrorSchema,
    },
  },
});
