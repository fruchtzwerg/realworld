import { CreateUser, LoginUser, User } from '../models/user.dto';

export interface IAuthService {
  /** Check user credentials and return user if authenticated. */
  authenticate(email: LoginUser['email'], password: LoginUser['password']): Promise<User>;

  /** Create a JWT for the user. */
  authorize(user: CreateUser): Promise<string>;
}
