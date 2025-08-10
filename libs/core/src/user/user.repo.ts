import type { CreateUserDto, RawUser, UpdateUserDto, User } from '@realworld/dto';

export abstract class UserRepository {
  abstract create(userDto: CreateUserDto): Promise<unknown>;
  abstract findByUsername(username: User['username']): Promise<unknown | null>;
  abstract findByEmail(email: User['email']): Promise<unknown | null>;
  abstract findWithPasswordByEmail(email: User['email']): Promise<unknown | null>;
  abstract update(username: User['username'], userDto: UpdateUserDto): Promise<unknown | null>;
  abstract delete(username: User['username']): Promise<unknown>;
  abstract deleteAll(): Promise<unknown>;
  abstract findMany(): Promise<unknown[]>;
}
