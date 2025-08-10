import type { CreateUserDto, RawUser, UpdateUserDto, User } from '@realworld/dto';

import type { Context } from '../common/context';

import type { UserRepository } from './user.repo';
import type { UserValidator } from './user.validator';

export class UserService {
  constructor(
    private readonly ctx: Context,
    private readonly repository: UserRepository,
    private readonly validator: UserValidator
  ) {}

  /** Create a new user */
  async createUser(userDto: CreateUserDto): Promise<User> {
    const createdUser = await this.repository.create(userDto);

    const token = this.ctx.getToken();
    if (token) (createdUser as User).token = token;

    return this.validator.validate(createdUser);
  }

  /** Get a user by username */
  async getUserByUsername(username: User['username']): Promise<User | null> {
    const user = await this.repository.findByUsername(username);
    if (!user) return null;

    const token = this.ctx.getToken();
    if (token) (user as User).token = token;

    return this.validator.validate(user);
  }

  /** Get a user by email */
  async getUserByEmail(email: User['email']): Promise<User | null> {
    const user = await this.repository.findByEmail(email);
    if (!user) return null;

    return this.validator.validate(user);
  }

  /** Get a user with password by email */
  async getUserWithPasswordByEmail(email: User['email']): Promise<RawUser | null> {
    const user = await this.repository.findWithPasswordByEmail(email);
    if (!user) return null;

    return this.validator.validateWithPassword(user);
  }

  /** Update a user */
  async updateUser(username: User['username'], userDto: UpdateUserDto): Promise<User | null> {
    const user = await this.repository.update(username, userDto);
    if (!user) return null;

    const token = this.ctx.getToken();
    if (token) (user as User).token = token;

    return this.validator.validate(user);
  }

  /** Delete a user */
  async deleteUser(username: User['username']): Promise<Omit<User, 'token'> | null> {
    const user = await this.repository.delete(username);
    if (!user) return null;

    return this.validator.validate(user);
  }

  /** Delete all users */
  async deleteAllUsers(): Promise<void> {
    await this.repository.deleteAll();
  }

  /** Get all users */
  async getAllUsers(): Promise<Omit<User, 'token'>[]> {
    const users = await this.repository.findMany();
    return this.validator.validateMany(users);
  }
}
