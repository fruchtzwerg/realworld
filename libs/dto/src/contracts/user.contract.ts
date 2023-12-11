import { initContract } from '@ts-rest/core';

import { ErrorSchema } from '../models/error.dto';
import {
  CreateUserDtoSchema,
  LoginUserDtoSchema,
  UpdateUserDtoSchema,
  UserDtoSchema,
} from '../models/user.dto';

const c = initContract();

export const userContract = c.router({
  getUser: {
    method: 'GET',
    path: '/user',
    responses: {
      200: UserDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  createUser: {
    method: 'POST',
    path: '/users',
    body: CreateUserDtoSchema,
    responses: {
      201: UserDtoSchema,
      422: ErrorSchema,
    },
  },

  updateUser: {
    method: 'PUT',
    path: '/user',
    body: UpdateUserDtoSchema,
    responses: {
      200: UserDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  login: {
    method: 'POST',
    path: '/users/login',
    body: LoginUserDtoSchema,
    responses: {
      200: UserDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },
});
