import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';
import { ClsService } from 'nestjs-cls';

import { UserService } from '@realworld/core';
import { Store, User, contract } from '@realworld/dto';

import { Payload } from '../../auth/decorators/payload.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly store: ClsService<Store>
  ) {}

  @Implement(contract.user.getUser)
  async getUser(@Payload('username') username: User['username']) {
    return implement(contract.user.getUser).handler(async ({ errors }) => {
      const user = await this.userService.getUserByUsername(username);

      if (!user) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['username is invalid'] } } });
      }

      return { user };
    });
  }

  @Implement(contract.user.updateUser)
  async updateUser(@Payload('username') username: User['username']) {
    return implement(contract.user.updateUser).handler(async ({ input, errors }) => {
      const user = await this.userService.updateUser(username, input.body);

      if (!user) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['username is invalid'] } } });
      }

      return { user };
    });
  }

  @Public()
  @Implement(contract.user.createUser)
  async createUser() {
    return implement(contract.user.createUser).handler(async ({ input }) => {
      const token = await this.authService.authorize(input.body.user);
      this.store.set('token', token);

      const user = await this.userService.createUser(input.body);

      return { user };
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Implement(contract.user.login)
  async login(@Payload() user: User) {
    return implement(contract.user.login).handler(async ({ errors }) => {
      if (!user) {
        throw errors.UNPROCESSABLE_CONTENT({
          data: { errors: { body: ['username is invalid'] } },
        });
      }

      return { user };
    });
  }

  @Public()
  @Delete('users/:username')
  async deleteUser(@Param('username') username: User['username']) {
    const user = await this.userService.deleteUser(username);
    return { user };
  }

  @Public()
  @Delete('users')
  deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }

  @Public()
  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
