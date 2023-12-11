import { initContract } from '@ts-rest/core';

import { ErrorSchema } from '../models/error.dto';
import { ProfileDtoSchema, ProfileParamsSchema } from '../models/profile.dto';

const c = initContract();

export const profileContract = c.router({
  getProfile: {
    method: 'GET',
    path: '/profiles/:username',
    pathParams: ProfileParamsSchema,
    responses: {
      200: ProfileDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  followUser: {
    method: 'POST',
    path: '/profiles/:username/follow',
    pathParams: ProfileParamsSchema,
    body: null,
    responses: {
      200: ProfileDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  unfollowUser: {
    method: 'DELETE',
    path: '/profiles/:username/follow',
    pathParams: ProfileParamsSchema,
    body: null,
    responses: {
      200: ProfileDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },
});
