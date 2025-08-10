import { CreateUserDto, RawUser, UpdateUserDto, User } from '@realworld/dto';

export abstract class UserService {
  /** Create a new user. */
  abstract createUser(userDto: CreateUserDto): Promise<User>;
  /** Get a user by username. */
  abstract getUserByUsername(username: User['username']): Promise<User | null>;
  /** Get a user by email. */
  abstract getUserByEmail(email: User['email']): Promise<User | null>;
  /** Get a user with password by email. */
  abstract getUserWithPasswordByEmail(email: User['email']): Promise<RawUser | null>;
  /** Update user by username. */
  abstract updateUser(username: User['username'], userDto: UpdateUserDto): Promise<User | null>;
  /** Delete a user. */
  abstract deleteUser(username: User['username']): Promise<Omit<User, 'token'> | null>;
  /** Delete all users. */
  abstract deleteAllUsers(): Promise<void>;
  /** Get all users. */
  abstract getAllUsers(): Promise<Omit<User, 'token'>[]>;
}
