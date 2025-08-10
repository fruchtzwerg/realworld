import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
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

  @TsRestHandler(contract.user.getUser)
  async getUser(@Payload('username') username: User['username']) {
    return tsRestHandler(contract.user.getUser, async () => {
      const user = await this.userService.getUserByUsername(username);

      if (!user)
        return {
          status: 422,
          body: { errors: { body: ['username is invalid'] } },
        };

      return { status: 200, body: { user } };
    });
  }

  @TsRestHandler(contract.user.updateUser)
  async updateUser(@Payload('username') username: User['username']) {
    return tsRestHandler(contract.user.updateUser, async ({ body }) => {
      const user = await this.userService.updateUser(username, body);

      if (!user)
        return {
          status: 422,
          body: { errors: { body: ['username is invalid'] } },
        };

      return { status: 200, body: { user } };
    });
  }

  @Public()
  @TsRestHandler(contract.user.createUser)
  async createUser() {
    return tsRestHandler(contract.user.createUser, async ({ body }) => {
      const token = await this.authService.authorize(body.user);
      this.store.set('token', token);

      const user = await this.userService.createUser(body);

      return { status: 201, body: { user } };
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @TsRestHandler(contract.user.login)
  async login(@Payload() user: User) {
    return tsRestHandler(contract.user.login, async () =>
      !user
        ? {
            status: 422,
            body: { errors: { body: ['username is invalid'] } },
          }
        : {
            status: 200,
            body: { user },
          }
    );
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
