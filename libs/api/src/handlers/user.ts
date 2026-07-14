import { assertFound, UnauthorizedError } from '@realworld/core';
import type { CreateUserDto, LoginUserDto, UpdateUserDto, User, UserDto } from '@realworld/dto';

import type { CurrentUser, HandlerContext } from '../context';

/** Resolve the authenticated user or throw UnauthorizedError. */
const requireUser = (ctx: HandlerContext): CurrentUser => {
  if (!ctx.user) throw new UnauthorizedError();
  return ctx.user;
};

/** Attach the request token to a user record. */
const withToken = (user: Omit<User, 'token'>, currentUser: CurrentUser): User => ({
  ...user,
  token: currentUser.token ?? '',
});

export const getUser = async (ctx: HandlerContext): Promise<UserDto> => {
  const current = requireUser(ctx);
  const user = await ctx.services.userService.getUserByUsername(current.username);
  const found = assertFound(user, 'user');
  return { user: withToken(found, current) };
};

export const updateUser = async (ctx: HandlerContext, body: UpdateUserDto): Promise<UserDto> => {
  const current = requireUser(ctx);
  const user = await ctx.services.userService.updateUser(current.username, body);
  const found = assertFound(user, 'user');
  return { user: withToken(found, current) };
};

export const createUser = async (ctx: HandlerContext, body: CreateUserDto): Promise<UserDto> => {
  const token = await ctx.services.authService.authorize(body.user);
  const user = await ctx.services.userService.createUser(body);
  return { user: { ...user, token } };
};

export const login = async (ctx: HandlerContext, body: LoginUserDto): Promise<UserDto> => {
  const user: User = await ctx.services.authService.authenticate(
    body.user.email,
    body.user.password
  );
  return { user };
};
