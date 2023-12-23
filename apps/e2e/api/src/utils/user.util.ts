import { APIRequestContext, APIResponse } from '@playwright/test';

export const createUser = async (
  request: APIRequestContext,
  username: string,
  email: string,
  password: string | null
): Promise<APIResponse> => {
  const response = await request.post('/api/users', {
    data: { user: { username, email, password } },
  });

  return response;
};

export const deleteUser = async (
  request: APIRequestContext,
  username: string
  // token: string
): Promise<APIResponse> => {
  return request.delete(`/api/users/${username}`, {
    // headers: { Authorization: `Token ${token}` },
  });
};

export const login = async (
  request: APIRequestContext,
  email: string,
  password: string
): Promise<APIResponse> => {
  return request.post('/api/users/login', {
    data: { user: { email, password } },
  });
};

export const deleteAllUsers = async (request: APIRequestContext): Promise<APIResponse> => {
  return request.delete('/api/users');
};
