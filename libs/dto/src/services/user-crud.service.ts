import { CreateUserDto, UpdateUserDto, User } from '../models/user.dto';

export interface UserCrudService {
  /** Create a new user. */
  createUser(userDto: CreateUserDto): Promise<User>;
  /** Get a user by username. */
  getUserByUsername(username: User['username']): Promise<User | null>;
  /** Get a user by email. */
  getUserByEmail(email: User['email']): Promise<User | null>;
  /** Update user by username. */
  updateUser(username: User['username'], userDto: UpdateUserDto): Promise<User | null>;
  /** Delete a user. */
  deleteUser(username: User['username']): Promise<Omit<User, 'token'> | null>;
  /** Delete all users. */
  deleteAllUsers(): Promise<void>;
  /** Get all users. */
  getAllUsers(): Promise<Omit<User, 'token'>[]>;
}
