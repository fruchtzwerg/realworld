import { Injectable, type Provider } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { Context } from '@realworld/core';
import type { Store, User } from '@realworld/dto';

@Injectable()
export class AppContext extends Context {
  constructor(private readonly store: ClsService<Store>) {
    super();
  }

  getToken(): string | undefined {
    return this.store.get('token');
  }

  getUsername(): User['username'] | undefined {
    return this.store.get('user.username');
  }
}

export const AppContextProvider: Provider = { provide: Context, useClass: AppContext };
