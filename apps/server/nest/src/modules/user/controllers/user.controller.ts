import { Controller, Delete, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';
import { ClsService } from 'nestjs-cls';

import type { HandlerContext } from '@realworld/api';
import { userHandlers } from '@realworld/api';
import type { Services } from '@realworld/core';
import { Store, User, contract } from '@realworld/dto';

import { SERVICES } from '../../auth/auth.module';
import { Payload } from '../../auth/decorators/payload.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@Controller()
export class UserController {
  constructor(
    @Inject(SERVICES) private readonly services: Services,
    private readonly store: ClsService<Store>
  ) {}

  @Implement(contract.user.getUser)
  async getUser(@Payload() user: User) {
    return implement(contract.user.getUser).handler(async () => {
      return userHandlers.getUser(this.handlerCtx(user));
    });
  }

  @Implement(contract.user.updateUser)
  async updateUser(@Payload() user: User) {
    return implement(contract.user.updateUser).handler(async ({ input }) => {
      return userHandlers.updateUser(this.handlerCtx(user), input.body);
    });
  }

  @Public()
  @Implement(contract.user.createUser)
  async createUser() {
    return implement(contract.user.createUser).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return userHandlers.createUser(ctx, input.body);
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Implement(contract.user.login)
  async login(@Payload() user: User) {
    return implement(contract.user.login).handler(async () => ({ user }));
  }

  @Public()
  @Delete('users/:username')
  async deleteUser(@Param('username') username: User['username']) {
    const user = await this.services.userService.deleteUser(username);
    return { user };
  }

  @Public()
  @Delete('users')
  deleteAllUsers() {
    return this.services.userService.deleteAllUsers();
  }

  @Public()
  @Get('users')
  getAllUsers() {
    return this.services.userService.getAllUsers();
  }

  private handlerCtx(user: User): HandlerContext {
    return {
      services: this.services,
      user: {
        username: user.username,
        email: user.email,
        token: this.store.get('token'),
      },
    };
  }
}
