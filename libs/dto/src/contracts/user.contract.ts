import { oc } from '@orpc/contract';
import z from 'zod';

import { ErrorSchema } from '../models/error.dto';
import {
  CreateUserDtoSchema,
  LoginUserDtoSchema,
  UpdateUserDtoSchema,
  UserDtoSchema,
} from '../models/user.dto';

export const userContract = {
  getUser: oc
    .route({ method: 'GET', path: '/user', tags: ['Users'], inputStructure: 'detailed' })
    .output(UserDtoSchema)
    .errors({ UNPROCESSABLE_CONTENT: { data: ErrorSchema }, UNAUTHORIZED: {} }),

  createUser: oc
    .route({
      method: 'POST',
      path: '/users',
      successStatus: 201,
      tags: ['Users'],
      inputStructure: 'detailed',
    })
    .input(z.object({ body: CreateUserDtoSchema }))
    .output(UserDtoSchema)
    .errors({ UNPROCESSABLE_CONTENT: { data: ErrorSchema } }),

  updateUser: oc
    .route({
      method: 'PUT',
      path: '/user',
      tags: ['Users'],
      inputStructure: 'detailed',
    })
    .input(z.object({ body: UpdateUserDtoSchema }))
    .output(UserDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: { data: ErrorSchema } }),

  login: oc
    .route({
      method: 'POST',
      path: '/users/login',
      tags: ['Auth'],
      inputStructure: 'detailed',
    })
    .input(z.object({ body: LoginUserDtoSchema }))
    .output(UserDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: { data: ErrorSchema } }),
};
