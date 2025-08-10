import type { User } from '@realworld/dto';

export abstract class Context {
  abstract getToken(): string | undefined;
  abstract getUsername(): User['username'] | undefined;
}
