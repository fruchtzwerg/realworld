import { oc } from '@orpc/contract';
import z from 'zod';

import { ProfileDtoSchema, ProfileParamsSchema } from '../models/profile.dto';

export const profileContract = {
  getProfile: oc
    .route({
      method: 'GET',
      path: '/profiles/{username}',
      tags: ['Profiles'],
      inputStructure: 'detailed',
    })
    .input(z.object({ params: ProfileParamsSchema }))
    .output(ProfileDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  followUser: oc
    .route({
      method: 'POST',
      path: '/profiles/{username}/follow',
      tags: ['Profiles'],
      inputStructure: 'detailed',
      // pathParams: ProfileParamsSchema,
      // body: null,
      // responses: {
      //   200: ProfileDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ProfileParamsSchema }))
    .output(ProfileDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  unfollowUser: oc
    .route({
      method: 'DELETE',
      path: '/profiles/{username}/follow',
      tags: ['Profiles'],
      inputStructure: 'detailed',
      // pathParams: ProfileParamsSchema,
      // body: null,
      // responses: {
      //   200: ProfileDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ProfileParamsSchema }))
    .output(ProfileDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),
};
